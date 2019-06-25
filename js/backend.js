'use strict';

(function () {
  var URL_POST = 'https://js.dump.academy/code-and-magick';
  var URL_GET = 'https://js.dump.academy/code-and-magick/data';
  var TIMEOUT = '3000';

  function xhrSetup(onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;

    return xhr;
  }

  window.backend = {
    save: function (data, onSuccess, onError) {
      var xhr = xhrSetup(onSuccess, onError);
      xhr.open('POST', URL_POST);
      xhr.send(data);
    },
    load: function (onSuccess, onError) {
      var xhr = xhrSetup(onSuccess, onError);
      xhr.open('GET', URL_GET);
      xhr.send();
    }
  };
})();
