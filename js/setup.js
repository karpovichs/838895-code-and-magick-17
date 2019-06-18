'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var WIZARD_FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Ниого', 'Ирвинг'];
var WIZARD_COAT = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_FIREBALL = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var WIZARDS_COUNT = 4;

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function onPopupEscPress(evt) {
  if (evt.keyCode === ESC_KEYCODE && evt.target !== nameInput) {
    setup.classList.add('hidden');
  }
}

function openPopup() {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);

  wizardCoat.addEventListener('click', function () {
    var i = getRandomNumber(0, WIZARD_COAT.length);
    wizardCoat.style.fill = WIZARD_COAT[i];
    coatInput.value = WIZARD_COAT[i];
  });

  wizardEyes.addEventListener('click', function () {
    var i = getRandomNumber(0, WIZARD_EYES.length);
    wizardEyes.style.fill = WIZARD_EYES[i];
    eyesInput.value = WIZARD_EYES[i];
  });

  wizardFireball.addEventListener('click', function () {
    var i = getRandomNumber(0, WIZARD_FIREBALL.length);
    wizardFireball.style.background = WIZARD_FIREBALL[i];
    fireballInput.value = WIZARD_FIREBALL[i];
  });
}

function closePopup() {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
}

function createWizardsArray() {
  var wizards = [];
  for (var i = 0; i < WIZARDS_COUNT; i++) {
    wizards[i] = {
      name: WIZARD_FIRST_NAMES[getRandomNumber(0, WIZARD_FIRST_NAMES.length)] + ' ' + WIZARD_SECOND_NAMES[getRandomNumber(0, WIZARD_SECOND_NAMES.length)],
      coatColor: WIZARD_COAT[getRandomNumber(0, WIZARD_COAT.length)],
      eyesColor: WIZARD_EYES[getRandomNumber(0, WIZARD_EYES.length)]
    };
  }
  return wizards;
}

function renderWizard(wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
}

var setupOpen = document.querySelector('.setup-open');
var setup = document.querySelector('.setup');
var setupClose = setup.querySelector('.setup-close');
var nameInput = setup.querySelector('.setup-user-name');
var player = setup.querySelector('.setup-player');
var wizardCoat = player.querySelector('.wizard-coat');
var wizardEyes = player.querySelector('.wizard-eyes');
var wizardFireball = player.querySelector('.setup-fireball-wrap');
var coatInput = player.querySelector('input[name = coat-color]');
var eyesInput = player.querySelector('input[name = eyes-color]');
var fireballInput = player.querySelector('input[name = fireball-color]');
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');
var similarWizards = createWizardsArray();
var fragment = document.createDocumentFragment();

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

for (var i = 0; i < WIZARDS_COUNT; i++) {
  fragment.appendChild(renderWizard(similarWizards[i]));
}

similarListElement.appendChild(fragment);

setup.querySelector('.setup-similar').classList.remove('hidden');
