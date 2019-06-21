'use strict';
(function () {
  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupInitPosition = {
    left: setup.style.left,
    top: setup.style.top
  };
  var setupClose = setup.querySelector('.setup-close');
  var nameInput = setup.querySelector('.setup-user-name');
  var dialogHandler = setup.querySelector('.upload');

  function onPopupEscPress(evt) {
    if (evt.target !== nameInput) {
      window.utils.isEscEvent(evt, closePopup);
    }
  }

  function openPopup() {
    var similarWizards = window.setup.createWizardsArray();
    window.setup.renderWizardsList(similarWizards);
    setup.classList.remove('hidden');
    setup.querySelector('.setup-similar').classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  }

  function closePopup() {
    setup.classList.add('hidden');
    setup.style.left = setupInitPosition.left;
    setup.style.top = setupInitPosition.top;
    document.removeEventListener('keydown', onPopupEscPress);
  }

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    window.utils.isEnterEvent(evt, openPopup);
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    window.utils.isEnterEvent(evt, closePopup);
  });

  dialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setup.style.top = (setup.offsetTop - shift.y) + 'px';
      setup.style.left = (setup.offsetLeft - shift.x) + 'px';
    }

    function onClickPreventDefault(clickEvt) {
      clickEvt.preventDefault();
      dialogHandler.removeEventListener('click', onClickPreventDefault);
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
