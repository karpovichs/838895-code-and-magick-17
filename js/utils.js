'use strict';

(function () {
  var KeyCodes = {
    ESC: 27,
    ENTER: 13
  };

  window.utils = {
    getRandomNumber: function (min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
    getRandomElement: function (array) {
      var randomElementIndex = Math.floor(Math.random() * array.length);
      return array[randomElementIndex];
    },
    shuffleArray: function (array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var shift = array[j];
        array[j] = array[i];
        array[i] = shift;
      }
      return array;
    },
    isEscEvent: function (evt, action) {
      if (evt.keyCode === KeyCodes.ESC) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === KeyCodes.ENTER) {
        action();
      }
    },
    isError: false,
    showError: function (errorText) {
      var node = document.createElement('div');
      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '30px';
      node.textContent = errorText;
      node.classList.add('error');
      document.body.insertAdjacentElement('afterbegin', node);
    },
    clearErrors: function () {
      var errors = document.querySelectorAll('.error');
      errors.forEach(function (error) {
        error.remove();
      });
    }
  };
})();
