'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 50;
var BAR_WIDTH = 40;
var BAR_MAX_HEIGHT = 150;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(CLOUD_WIDTH / 2 + x, 10 + y);
  ctx.lineTo(CLOUD_WIDTH + x, y);
  ctx.lineTo(CLOUD_WIDTH - 10 + x, CLOUD_HEIGHT / 2 + y);
  ctx.lineTo(CLOUD_WIDTH + x, CLOUD_HEIGHT + y);
  ctx.lineTo(CLOUD_WIDTH / 2 + x, CLOUD_HEIGHT - 10 + y);
  ctx.lineTo(x, CLOUD_HEIGHT + y);
  ctx.lineTo(10 + x, CLOUD_HEIGHT / 2 + y);
  ctx.closePath();
  ctx.fill();
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + 10, CLOUD_Y + 10, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + 30, CLOUD_Y + 20);
  ctx.fillText('Список результатов:', CLOUD_X + 30, CLOUD_Y + 38);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    // Написание имени игрока
    ctx.fillStyle = '#000';
    ctx.fillText(players[i], CLOUD_X + GAP + (GAP + BAR_WIDTH) * i, CLOUD_Y + 240);

    // Написание полученных очков
    var barHeight = BAR_MAX_HEIGHT * times[i] / maxTime;
    ctx.fillText(Math.round(times[i]), CLOUD_X + GAP + (GAP + BAR_WIDTH) * i, CLOUD_Y + 60 + BAR_MAX_HEIGHT - barHeight);

    // Определение цвета столбца
    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      // Определение насыщенности. Если насыщенность меньше 0.1 стобец будет плохо видно
      var opacity = Math.random();
      while (opacity <= 0.1) {
        opacity = Math.random();
      }
      ctx.fillStyle = 'rgba(0, 0, 255,' + opacity + ')';
    }

    // Рисование столбца
    ctx.fillRect(CLOUD_X + GAP + (GAP + BAR_WIDTH) * i, CLOUD_Y + 80 + BAR_MAX_HEIGHT - barHeight, BAR_WIDTH, barHeight);
  }
};
