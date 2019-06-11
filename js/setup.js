'use strict';

var WIZARD_FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Ниого', 'Ирвинг'];
var WIZARD_COAT = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARDS_COUNT = 4;

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
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

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');
var similarWizards = createWizardsArray();
var fragment = document.createDocumentFragment();

for (var i = 0; i < WIZARDS_COUNT; i++) {
  fragment.appendChild(renderWizard(similarWizards[i]));
}

similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
