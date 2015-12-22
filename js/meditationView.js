var meditationView = {};

meditationView.init = function(meditation) {
  $('#meditation-content')
    .empty()
    .show()
    .append([
      '<h1>' + meditation.title + '</h1>',
      '<p>' + meditation.description + '</p>',
      '<a href="" id="start">Start</a>',
      '<a href="" id="stop">Stop</a>'
    ])
    .siblings().hide();
  meditationView.player(meditation.soundUrl);
};

meditationView.player = function(url) {
  SC.initialize({
    client_id: '9586854c0f0c9138735b653b994f0fb5'
  });

  var currentTrack = SC.get(url);

  SC.stream(url).then(function(player) {
    $('#start').on('click', function (e) {
      e.preventDefault();
      console.log('start');
      console.log(player);
      player.play();
    });

    $('#stop').on('click', function (e) {
      e.preventDefault();
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
};
