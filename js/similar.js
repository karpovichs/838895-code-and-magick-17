'use strict';

(function () {
  var coatColor = 'rgb(101, 137, 164)';
  var eyesColor = 'black';
  var wizards = [];
  var isGenerated = false;

  function getRank(wizard) {
    var rank = 0;
    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }
    return rank;
  }

  function namesComparator(left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  }

  window.wizard.onEyesChange = function (color) {
    eyesColor = color;
    window.debounce.setDebounce(window.similar.updateWizards);
  };

  window.wizard.onCoatChange = function (color) {
    coatColor = color;
    window.debounce.setDebounce(window.similar.updateWizards);
  };

  function onWizardsSuccess(data) {
    wizards = data;
    window.render.renderWizardsList(wizards);
    isGenerated = true;
  }

  function onWizardsError(errorText) {
    window.utils.showError(errorText);
    window.utils.isError = true;
    isGenerated = false;
  }

  window.backend.load(onWizardsSuccess, onWizardsError);

  window.similar = {
    updateWizards: function () {
      if (!isGenerated) {
        window.backend.load(onWizardsSuccess, onWizardsError);
      }
      window.render.renderWizardsList(wizards.slice().sort(function (left, right) {
        var rankDiff = getRank(right) - getRank(left);
        if (rankDiff === 0) {
          rankDiff = namesComparator(left.name, right.name);
        }
        return rankDiff;
      }));
    }
  };

})();
