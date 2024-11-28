console.log('Loading recorder-worklet.js module');

class RecorderWorklet extends AudioWorkletProcessor {
  constructor() {
    super();
    this.chunks = [];
    console.log('RecorderWorklet initialized');
  }

  process(inputs, outputs, parameters) {
    const input = inputs[0];
    if (input) {
      for (let i = 0; i < input.length; i++) {
        this.chunks.push(input[i]);
      }
    }

    // Post message with the audio chunk data to the main thread
    if (this.chunks.length) {
      this.port.postMessage(this.chunks);
      this.chunks = [];
    }

    return true; // Keep the processor alive
  }
}

registerProcessor('recorder-worklet', RecorderWorklet);
console.log('RecorderWorklet registered');
