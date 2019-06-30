'use strict';

(function () {
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');

  function renderWizard(wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').innerText = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  }

  var similarList = document.querySelector('.setup-similar-list');

  window.render = {
    renderWizardsList: function (data) {
      var takeNumber = data.length > 4 ? 4 : data.length;
      similarList.innerHTML = '';
      for (var i = 0; i < takeNumber; i++) {
        similarList.appendChild(renderWizard(data[i]));
      }
    }
  };
})();
