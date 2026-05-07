export const AUDIO_JS = `
/* ---- Web Audio API Synthesizer ---- */
var audioCtx = null;
var isSoundOn = localStorage.getItem('ki_sound') !== '0';

function initAudio() {
  if (!audioCtx) {
    try {
      var AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    } catch(e) {}
  }
}

function toggleSound() {
  isSoundOn = !isSoundOn;
  localStorage.setItem('ki_sound', isSoundOn ? '1' : '0');
  updateSoundBtn();
}

function updateSoundBtn() {
  var el = document.getElementById('btn-sound-toggle');
  if (el) el.textContent = 'SOUND: ' + (isSoundOn ? 'ON' : 'OFF');
}

function playTone(type, freqStart, freqEnd, duration, volStart) {
  if (!isSoundOn || !audioCtx) return;
  if (audioCtx.state === 'suspended') audioCtx.resume();
  var osc = audioCtx.createOscillator();
  var gain = audioCtx.createGain();
  osc.type = type;
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  
  var now = audioCtx.currentTime;
  osc.frequency.setValueAtTime(freqStart, now);
  if (freqEnd) osc.frequency.exponentialRampToValueAtTime(freqEnd, now + duration);
  
  gain.gain.setValueAtTime(volStart, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + duration);
  
  osc.start(now);
  osc.stop(now + duration);
}

function playClick() { playTone('sine', 600, 800, 0.05, 0.1); }
function playShoot() { playTone('square', 800, 200, 0.1, 0.05); }

/* Retro explosion uses noise */
function playNoise(duration, vol) {
  if (!isSoundOn || !audioCtx) return;
  if (audioCtx.state === 'suspended') audioCtx.resume();
  var bufferSize = audioCtx.sampleRate * duration;
  var buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  var data = buffer.getChannelData(0);
  for (var i = 0; i < bufferSize; i++) { data[i] = Math.random() * 2 - 1; }
  
  var noise = audioCtx.createBufferSource();
  noise.buffer = buffer;
  var gain = audioCtx.createGain();
  
  // Lowpass filter to make it sound like a boom
  var filter = audioCtx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 1000;

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(audioCtx.destination);
  
  var now = audioCtx.currentTime;
  gain.gain.setValueAtTime(vol, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + duration);
  
  noise.start(now);
}

function playHurt() { playNoise(0.1, 0.1); }
function playExplode() { playNoise(0.3, 0.2); }
`;
