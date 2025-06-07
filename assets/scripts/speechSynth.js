// speechSynth.js

const synth = window.speechSynthesis;
let voices;

window.addEventListener('DOMContentLoaded', init);

function init() {
  setTimeout(() => populateVoices(), 50);
  bindListeners();
}

function populateVoices() {
  const voiceSelect = document.querySelector('#voice-select');
  voices = synth.getVoices();
  voices.forEach(voice => {
    const option = document.createElement('option');
    option.innerHTML = `${voice.name} (${voice.lang})`;
    option.setAttribute('value', `${voice.name} (${voice.lang})`);
    option.setAttribute('data-index', voiceSelect.children.length - 1)
    voiceSelect.appendChild(option);
  });
}

function bindListeners() {
  const talkBtn = document.querySelector('#explore > button');
  const textarea = document.querySelector('#explore > textarea');
  const clearBtn = document.querySelector('#clear-btn');
  const rateInput = document.querySelector('#rate');
  const rateValue = document.querySelector('#rate-value');
  talkBtn.addEventListener('click', () => {
    let textToSpeak = textarea.value;
    let utterThis = new SpeechSynthesisUtterance(textToSpeak);
    utterThis.voice = voices[getOptionIndex()];
    utterThis.rate = parseFloat(rateInput.value);
    synth.speak(utterThis);
    openMouth();
  })
  clearBtn.addEventListener('click', () => {
    textarea.value = '';
  });
  rateInput.addEventListener('input', () => {
    rateValue.textContent = rateInput.value;
  });
}

function getOptionIndex() {
  const voiceSelect = document.querySelector('#voice-select');
  const option = voiceSelect.options[voiceSelect.selectedIndex];
  return option.getAttribute('data-index');
}

function openMouth() {
  let face = document.querySelector('#explore > img');
  face.setAttribute('src', 'assets/images/smiling-open.png');
  setTimeout(() => {
    if (synth.speaking) {
      openMouth();
    } else {
      face.setAttribute('src', 'assets/images/smiling.png');
    }
  }, 100);
}
