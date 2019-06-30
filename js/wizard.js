'use strict';

(function () {
  var WIZARD_COAT = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARD_FIREBALL = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var setup = document.querySelector('.setup');
  var player = setup.querySelector('.setup-player');
  var coatInput = player.querySelector('input[name = coat-color]');
  var eyesInput = player.querySelector('input[name = eyes-color]');
  var fireballInput = player.querySelector('input[name = fireball-color]');

  var wizard = {
    onEyesChange: function (color) {
      return color;
    },
    onCoatChange: function (color) {
      return color;
    }
  };

  player.addEventListener('click', function (evt) {
    var newColor;
    if (evt.target.classList.contains('wizard-coat')) {
      newColor = window.utils.getRandomElement(WIZARD_COAT);
      evt.target.style.fill = newColor;
      coatInput.value = newColor;
      wizard.onCoatChange(newColor);
    } else if (evt.target.classList.contains('wizard-eyes')) {
      newColor = window.utils.getRandomElement(WIZARD_EYES);
      evt.target.style.fill = newColor;
      eyesInput.value = newColor;
      wizard.onEyesChange(newColor);
    } else if (evt.target.classList.contains('setup-fireball')) {
      newColor = window.utils.getRandomElement(WIZARD_FIREBALL);
      evt.target.parentNode.style.background = newColor;
      fireballInput.value = newColor;
    }
  });

  window.wizard = wizard;
})();
