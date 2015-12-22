var meditationView = {};

meditationView.init = function() {
  $('#meditation-content')
    .show()
    .append(meditationView.renderTemplate(Meditation.allMeditations[0]))
    .siblings().hide();
};

meditationView.renderTemplate = function(meditation) {
  return meditationView.template(meditation);
};

var currentTrack = SC.get('/tracks/238687124');

SC.stream('/tracks/238687124').then(function(player) {
  $('#start').on('click', function () {
    console.log('start');
    console.log(player);
    player.play();
  });

  $('#stop').on('click', function () {
    console.log('stop');
    timeCounter = player.currentTime();
    console.log(timeCounter);
    player.pause();
  });

  player.on('finish', function () {
    timeCounter = currentTrack._result.duration;
    console.log(timeCounter);
    console.log('finish');
  });
});
