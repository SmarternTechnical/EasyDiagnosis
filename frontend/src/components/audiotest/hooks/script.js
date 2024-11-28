const startButton = document.getElementById("startRecord");
const stopButton = document.getElementById("stopRecord");
const recordingIndicator = document.getElementById("recordingIndicator");
const audioPlayback = document.getElementById("audioPlayback");

let audioContext;
let mediaStream;
let recorderNode;
let audioChunks = [];

// Initialize Audio Context and Worklet
async function setupAudioContext() {
    audioContext = new AudioContext({ sampleRate: 16000 });
    await audioContext.audioWorklet.addModule('recorder-worklet.js');

    const stream = await navigator.mediaDevices.getUserMedia({ audio: { channelCount: 1 } });
    mediaStream = audioContext.createMediaStreamSource(stream);

    recorderNode = new AudioWorkletNode(audioContext, 'recorder-worklet');
    recorderNode.port.onmessage = (event) => {
        audioChunks.push(...event.data);  // Accumulate PCM samples
    };
    mediaStream.connect(recorderNode);
}

// Encode recorded audio into WAV format
function encodeWAV(samples, sampleRate) {
    const buffer = new ArrayBuffer(44 + samples.length * 2);
    const view = new DataView(buffer);

    writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + samples.length * 2, true);
    writeString(view, 8, 'WAVE');
    writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);  // Mono
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    writeString(view, 36, 'data');
    view.setUint32(40, samples.length * 2, true);

    let offset = 44;
    for (let i = 0; i < samples.length; i++, offset += 2) {
        view.setInt16(offset, samples[i], true);
    }

    return new Blob([view], { type: 'audio/wav' });
}

// Helper to write ASCII strings into DataView
function writeString(view, offset, string) {
    for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
    }
}

// Start recording
startButton.addEventListener("click", async () => {
    try {
        audioChunks = [];
        await setupAudioContext();

        recorderNode.connect(audioContext.destination);
        recordingIndicator.style.display = "block";
        startButton.disabled = true;
        stopButton.disabled = false;

        console.log("Recording started...");
    } catch (error) {
        console.error("Microphone access error:", error);
    }
});

// Stop recording
stopButton.addEventListener("click", () => {
    recorderNode.disconnect();
    audioContext.close();

    const samples = Int16Array.from(audioChunks);
    const wavBlob = encodeWAV(samples, 16000);
    const audioUrl = URL.createObjectURL(wavBlob);

    // Create audio element for playback
    const audioElement = document.createElement("audio");
    audioElement.controls = true;
    audioElement.src = audioUrl;
    audioPlayback.innerHTML = "";  // Clear previous audio
    audioPlayback.appendChild(audioElement);

    // Create download link
    const downloadLink = document.createElement("a");
    downloadLink.href = audioUrl;
    downloadLink.download = "recorded_audio.wav";
    downloadLink.textContent = "Download Recorded Audio";
    audioPlayback.appendChild(downloadLink);

    recordingIndicator.style.display = "none";
    startButton.disabled = false;
    stopButton.disabled = true;

    console.log("Recording stopped and saved.");
});
