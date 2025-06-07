// partyHorn.js
let partyHorn = false;
const jsConfetti = new JSConfetti();

window.addEventListener('DOMContentLoaded', init);

function init() {
  bindListeners();

  const themeBtn = document.getElementById('toggle-theme');
  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('black');
  });
  const hornSelect = document.getElementById('horn-select');
  enablePartialMatchSelect(hornSelect);
}

function bindListeners() {
  const hornPicker = document.querySelector('#horn-select')
  const volume = document.querySelector('#volume');
  const playSoundBtn = document.querySelector('#expose > button');
  hornPicker.addEventListener('input', selectHorn);
  volume.addEventListener('input', updateVolume);
  playSoundBtn.addEventListener('click', playSound);
}

function selectHorn() {
  const value = document.getElementById('horn-select').value;
  const imgElem = document.querySelector('#expose > img');
  const audioElem = document.querySelector('#expose > audio');
  imgElem.setAttribute('src', `assets/images/${value}.svg`);
  audioElem.setAttribute('src', `assets/audio/${value}.mp3`);
  partyHorn = value === 'party-horn';
}

function updateVolume() {
  const volume = Number(this.value);
  const volumeImg = document.querySelector('#volume-controls > img');
  const audioElem = document.querySelector('#expose > audio');
  let volumeLevel = 3;
  switch (true) {
    case (volume == 0):
      volumeLevel = 0;
      break;
    case (volume < 33):
      volumeLevel = 1;
      break;
    case (volume < 67):
      volumeLevel = 2;
      break;
  }
  volumeImg.setAttribute('src', `assets/icons/volume-level-${volumeLevel}.svg`);
  audioElem.volume = volume / 100;
}

function playSound() {
  const audioElem = document.querySelector('#expose > audio');
  if (audioElem.getAttribute('src') == '') return;
  if (partyHorn) setTimeout(() => jsConfetti.addConfetti(), 350);
  audioElem.play();
}
function enablePartialMatchSelect(selectElem) {
  let buffer = '';
  let lastKeyTime = Date.now();

  selectElem.addEventListener('keydown', (e) => {
    const now = Date.now();

    // Reset buffer if user waits more than 500ms
    if (now - lastKeyTime > 500) buffer = '';

    buffer += e.key.toLowerCase();
    lastKeyTime = now;

    for (let i = 0; i < selectElem.options.length; i++) {
      const option = selectElem.options[i];
      if (option.text.toLowerCase().startsWith(buffer)) {
        selectElem.selectedIndex = i;
        break;
      }
    }
  });
}