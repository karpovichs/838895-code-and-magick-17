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
    isEscEvent: function (evt, action) {
      if (evt.keyCode === KeyCodes.ESC) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === KeyCodes.ENTER) {
        action();
      }
    }
  };
})();
