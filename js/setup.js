'use strict';

(function () {
  var WIZARD_FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Ниого', 'Ирвинг'];
  var WIZARD_COAT = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARD_FIREBALL = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var WIZARDS_COUNT = 4;

  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');
  var setup = document.querySelector('.setup');
  var player = setup.querySelector('.setup-player');
  var coatInput = player.querySelector('input[name = coat-color]');
  var eyesInput = player.querySelector('input[name = eyes-color]');
  var fireballInput = player.querySelector('input[name = fireball-color]');

  function renderWizard(wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
    return wizardElement;
  }

  function customizeWizard(evt) {
    var i;
    if (evt.target.classList.contains('wizard-coat')) {
      i = window.utils.getRandomNumber(0, WIZARD_COAT.length);
      evt.target.style.fill = WIZARD_COAT[i];
      coatInput.value = WIZARD_COAT[i];
    } else if (evt.target.classList.contains('wizard-eyes')) {
      i = window.utils.getRandomNumber(0, WIZARD_EYES.length);
      evt.target.style.fill = WIZARD_EYES[i];
      eyesInput.value = WIZARD_EYES[i];
    } else if (evt.target.classList.contains('setup-fireball')) {
      i = window.utils.getRandomNumber(0, WIZARD_FIREBALL.length);
      evt.target.parentNode.style.background = WIZARD_FIREBALL[i];
      fireballInput.value = WIZARD_FIREBALL[i];
    }
  }

  window.setup = {
    createWizardsArray: function () {
      var wizards = [];
      for (var i = 0; i < WIZARDS_COUNT; i++) {
        wizards[i] = {
          name: WIZARD_FIRST_NAMES[window.utils.getRandomNumber(0, WIZARD_FIRST_NAMES.length)] + ' ' + WIZARD_SECOND_NAMES[window.utils.getRandomNumber(0, WIZARD_SECOND_NAMES.length)],
          coatColor: WIZARD_COAT[window.utils.getRandomNumber(0, WIZARD_COAT.length)],
          eyesColor: WIZARD_EYES[window.utils.getRandomNumber(0, WIZARD_EYES.length)]
        };
      }
      return wizards;
    },

    renderWizardsList: function (wizards) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < WIZARDS_COUNT; i++) {
        fragment.appendChild(renderWizard(wizards[i]));
      }
      similarListElement.appendChild(fragment);
    }
  };

  player.addEventListener('click', function (evt) {
    customizeWizard(evt);
  });
})();
