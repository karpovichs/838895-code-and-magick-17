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
  var form = setup.querySelector('.setup-wizard-form');
  var formSubmit = form.querySelector('.setup-submit');
  var similarBlock = setup.querySelector('.setup-similar');
  var similarWizards = similarBlock.querySelector('.setup-similar-list');
  var isError = false;

  function onPopupEscPress(evt) {
    if (evt.target !== nameInput) {
      window.utils.isEscEvent(evt, closePopup);
    }
  }

  function onWizardsSuccess(wizards) {
    window.setup.renderWizardsList(wizards);
  }

  function onWizardsError(errorText) {
    window.utils.showError(errorText);
    isError = true;
  }

  function clearWizards() {
    similarBlock.classList.add('hidden');
    var last = similarWizards.lastChild;
    while (last) {
      similarWizards.removeChild(last);
      last = similarWizards.lastChild;
    }
  }

  function onSubmitError(errorText) {
    window.utils.showError(errorText);
    isError = true;
    formSubmit.disabled = false;
  }

  function openPopup() {
    if (setup.classList.contains('hidden')) {
      window.backend.load(onWizardsSuccess, onWizardsError);
      setup.classList.remove('hidden');
      similarBlock.classList.remove('hidden');
      document.addEventListener('keydown', onPopupEscPress);
    }
  }

  function closePopup() {
    if (isError) {
      window.utils.clearErrors();
      isError = false;
    }
    setup.classList.add('hidden');
    setup.style.left = setupInitPosition.left;
    setup.style.top = setupInitPosition.top;
    clearWizards();
    document.removeEventListener('keydown', onPopupEscPress);
  }

  function onFormSubmit(evt) {
    evt.preventDefault();
    if (isError) {
      window.utils.clearErrors();
      isError = false;
    }
    formSubmit.disabled = true;
    window.backend.save(new FormData(form), function () {
      closePopup();
      formSubmit.disabled = false;
    }, onSubmitError);
  }

  form.addEventListener('submit', onFormSubmit);

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
