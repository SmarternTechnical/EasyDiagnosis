import React, { useState, useEffect, useCallback } from 'react';

const Recorder = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [audioChunks, setAudioChunks] = useState([]);
    const [audioUrl, setAudioUrl] = useState(null);
    const [audioContext, setAudioContext] = useState(null);
    const [recorderNode, setRecorderNode] = useState(null);
    const [mediaStream, setMediaStream] = useState(null);
    const [predictionResult, setPredictionResult] = useState(null);  // Store the prediction result

    // Function to initialize the audio context and recorder
    const setupAudioContext = useCallback(async () => {
        try {
            // Step 1: Initialize Audio Context and Media Stream
            const context = new AudioContext({ sampleRate: 16000 });
            await context.audioWorklet.addModule('/recorder-worklet.js');
            
            const stream = await navigator.mediaDevices.getUserMedia({ audio: { channelCount: 1 } });
            const source = context.createMediaStreamSource(stream);

            const recorder = new AudioWorkletNode(context, 'recorder-worklet');
            recorder.port.onmessage = (event) => {
                if (event.data) {
                    console.log("Received audio data:", event.data);
                    setAudioChunks(prevChunks => [...prevChunks, ...event.data]);
                }
            };

            source.connect(recorder);
            setAudioContext(context);
            setMediaStream(stream);
            setRecorderNode(recorder);
        } catch (error) {
            console.error("Error setting up audio context: ", error);
            alert('Error accessing microphone. Please check your device settings.');
        }
    }, []);

    // Initialize audio context and recorder when the component mounts
    useEffect(() => {
        setupAudioContext();

        // Cleanup on component unmount
        return () => {
            if (mediaStream) {
                mediaStream.getTracks().forEach(track => track.stop());
            }
            if (audioContext) {
                audioContext.close();
            }
        };
    }, [setupAudioContext, mediaStream, audioContext]);

    // Start recording
    const handleStartRecording = async () => {
        // Clear previous recording if any
        setAudioChunks([]);
        setAudioUrl(null);

        if (audioContext && recorderNode) {
            recorderNode.connect(audioContext.destination); // Start recording
            console.log("Recording started...");
            setIsRecording(true);
        } else {
            alert('Audio context is not initialized. Please grant microphone permissions and try again.');
        }
    };

    // Stop recording
    const handleStopRecording = () => {
        if (audioContext && recorderNode) {
            recorderNode.disconnect();
            console.log("Recording stopped.");

            if (audioChunks.length > 0) { // Ensure audioChunks is not empty
                const samples = new Int16Array(audioChunks.flat());
                const wavBlob = encodeWAV(samples, 16000);
                const audioUrl = URL.createObjectURL(wavBlob);

                setAudioUrl(audioUrl);
                console.log("Audio data processed and URL generated.");
            } else {
                console.log("No audio data recorded.");
                alert('No audio data recorded.');
            }
            setIsRecording(false);
        }
    };

    // Encode audio into WAV format
    const encodeWAV = (samples, sampleRate) => {
        const buffer = new ArrayBuffer(44 + samples.length * 2);
        const view = new DataView(buffer);

        writeString(view, 0, 'RIFF');
        view.setUint32(4, 36 + samples.length * 2, true);
        writeString(view, 8, 'WAVE');
        writeString(view, 12, 'fmt ');
        view.setUint32(16, 16, true);
        view.setUint16(20, 1, true); // PCM
        view.setUint16(22, 1, true); // Mono
        view.setUint32(24, sampleRate, true);
        view.setUint32(28, sampleRate * 2, true); // 2 bytes per sample
        view.setUint16(32, 2, true); // 2 bytes per sample
        view.setUint16(34, 16, true); // 16-bit depth
        writeString(view, 36, 'data');
        view.setUint32(40, samples.length * 2, true);

        let offset = 44;
        for (let i = 0; i < samples.length; i++, offset += 2) {
            view.setInt16(offset, samples[i], true);
        }

        return new Blob([view], { type: 'audio/wav' });
    };

    // Helper to write ASCII strings into DataView
    const writeString = (view, offset, string) => {
        for (let i = 0; i < string.length; i++) {
            view.setUint8(offset + i, string.charCodeAt(i));
        }
    };

    // Submit the audio file
    const handleSubmit = async () => {
        if (audioUrl) {
            try {
                const formData = new FormData();
                const audioBlob = await fetch(audioUrl).then(res => res.blob());
                formData.append('audio', audioBlob, 'audio.wav');

                const response = await fetch('http://127.0.0.1:8000/predict-audio-dysarthria/', {
                    method: 'POST',
                    body: formData,
                });

                const data = await response.json();
                console.log("Prediction response:", data);
                setPredictionResult(data);  // Update the prediction result in the state

            } catch (error) {
                console.error('Error submitting audio:', error);
                alert('Error submitting audio.');
            }
        } else {
            alert('No audio to submit.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-xs p-4 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-semibold text-center mb-4">Audio Recording</h2>
                
                <button
                    onClick={isRecording ? handleStopRecording : handleStartRecording}
                    className={`px-6 py-3 rounded-lg shadow-lg w-full mb-4 ${isRecording ? 'bg-red-500' : 'bg-green-500'}`}
                >
                    {isRecording ? 'Stop Recording' : 'Start Recording'}
                </button>

                {isRecording && <p className="text-yellow-600 font-semibold text-center">Recording...</p>}

                {/* Display audio preview after recording */}
                {audioUrl && (
                    <div className="mt-4">
                        <h4 className="text-md text-[#19456B] mb-2">Recording Preview</h4>
                        <audio controls>
                            <source src={audioUrl} type="audio/wav" />
                            Your browser does not support the audio element.
                        </audio>

                        {/* Submit button */}
                        <button
                            onClick={handleSubmit}
                            className="mt-4 px-6 py-3 rounded-lg bg-blue-500 text-white w-full"
                        >
                            Submit Audio
                        </button>
                    </div>
                )}

                {/* Display Prediction Result */}
                {predictionResult && (
                    <div className="mt-6 bg-gray-200 p-4 rounded-lg">
                        <h4 className="text-lg font-semibold">Prediction Result:</h4>
                        <pre className="text-sm whitespace-pre-wrap">{JSON.stringify(predictionResult, null, 2)}</pre>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Recorder;
