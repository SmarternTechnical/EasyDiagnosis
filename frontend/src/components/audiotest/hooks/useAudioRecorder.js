import { useState, useRef } from 'react';

export function useAudioRecorder() {
  const [audioUrl, setAudioUrl] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const audioChunks = useRef([]);
  const recorderNode = useRef(null);
  const audioContext = useRef(null);

  const startRecording = async () => {
    try {
      // Clear previous audio chunks
      audioChunks.current = [];
      setAudioUrl(null);

      // Initialize AudioContext
      audioContext.current = new (window.AudioContext || window.webkitAudioContext)();

      // Ensure AudioWorklet is supported
      if (!audioContext.current.audioWorklet) {
        throw new Error('AudioWorklet is not supported in this browser.');
      }

      console.log('Attempting to load Audio Worklet module...');
      await audioContext.current.audioWorklet.addModule('/recorder-worklet.js');
      console.log('Audio Worklet module loaded successfully.');

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaStreamSource = audioContext.current.createMediaStreamSource(stream);

      // Initialize AudioWorkletNode
      recorderNode.current = new AudioWorkletNode(audioContext.current, 'recorder-worklet');

      // Capture audio chunks
      recorderNode.current.port.onmessage = (event) => {
        audioChunks.current.push(...event.data);
      };

      mediaStreamSource.connect(recorderNode.current);
      recorderNode.current.connect(audioContext.current.destination);

      setIsRecording(true);
    } catch (error) {
      console.error('Error initializing audio recording:', error.message);
    }
  };

  const stopRecording = () => {
    if (recorderNode.current && audioContext.current) {
      recorderNode.current.disconnect();
      audioContext.current.close();

      // Convert audio chunks to a WAV Blob
      const samples = Int16Array.from(audioChunks.current);
      const wavBlob = encodeWAV(samples, 16000);
      const audioUrl = URL.createObjectURL(wavBlob);

      setAudioUrl(audioUrl);
      setIsRecording(false);
    }
  };

  function encodeWAV(samples, sampleRate) {
    const buffer = new ArrayBuffer(44 + samples.length * 2);
    const view = new DataView(buffer);

    writeString(view, 0, 'RIFF'); // ChunkID
    view.setUint32(4, 36 + samples.length * 2, true); // ChunkSize
    writeString(view, 8, 'WAVE'); // Format
    writeString(view, 12, 'fmt '); // Subchunk1ID
    view.setUint32(16, 16, true); // Subchunk1Size
    view.setUint16(20, 1, true); // AudioFormat
    view.setUint16(22, 1, true); // NumChannels
    view.setUint32(24, sampleRate, true); // SampleRate
    view.setUint32(28, sampleRate * 2, true); // ByteRate
    view.setUint16(32, 2, true); // BlockAlign
    view.setUint16(34, 16, true); // BitsPerSample
    writeString(view, 36, 'data'); // Subchunk2ID
    view.setUint32(40, samples.length * 2, true); // Subchunk2Size

    let offset = 44;
    for (let i = 0; i < samples.length; i++, offset += 2) {
      view.setInt16(offset, samples[i], true);
    }

    return new Blob([view], { type: 'audio/wav' });
  }

  function writeString(view, offset, string) {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }

  return { startRecording, stopRecording, recordedAudioUrl: audioUrl, isRecording };
}
