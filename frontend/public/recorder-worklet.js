// recorder-worklet.js
class RecorderWorkletProcessor extends AudioWorkletProcessor {
  constructor() {
      super();
      this.buffer = [];
  }

  process(inputs) {
      const input = inputs[0];
      if (input && input[0]) {
          const samples = input[0].map(sample => Math.max(-1, Math.min(1, sample)) * 32767 | 0);
          this.port.postMessage(samples);
      }
      return true;
  }
}

registerProcessor('recorder-worklet', RecorderWorkletProcessor);
