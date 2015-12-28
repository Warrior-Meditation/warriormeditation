var meditationView = {};

meditationView.init = function(meditation) {
  $('.nav > li').removeClass('active');
  meditationView.render(meditation);
  meditationView.handleFeedback();
  meditationView.player(meditation.soundUrl);
  User.currentMeditation = meditation.title;
  //$('#journal-link').attr('href', '/journal/new?category='+ meditation.title);
};

meditationView.render = function(meditation) {
  $('#meditation-content')
    .show()
    .siblings().hide();
  $('#feedback').hide();
  $('#current-meditation')
    .empty()
    .append([
      '<h1>' + meditation.title + '</h1>',
      '<p>' + meditation.description + '</p>',
      '<a href="" id="start">Start</a>',
      '<a href="" id="stop">Stop</a>'
    ]
  );
};

meditationView.player = function(url) {
  SC.initialize({
    client_id: '9586854c0f0c9138735b653b994f0fb5'
  });

  var url = '/tracks/238687124';
  var currentTrack = SC.get(url);

  var timeCounter;
  var mostRecentDay;
  var totalTime;

  SC.stream(url).then(function(player) {
    $('#start').on('click', function (e) {
      e.preventDefault();
      User.currTime = 0;
      console.log('start');
      console.log(player);
      player.play();
    });

    $('#stop').on('click', function (e) {
      e.preventDefault();
      console.log('stop');
      timeCounter = player.currentTime();  //milliseconds
      console.log(timeCounter);
      player.pause();
    });

    player.on('finish', function () {
      User.currTime = currentTrack._result.duration;
      console.log('Final time' + timeCounter);
      console.log('finish');
      $('#feedback').fadeIn(1000);
    });
  });
};

meditationView.handleFeedback = function() {
  $('#ok-button').on('click', function() {
    Meditation.logStats();
    $('#feedback').fadeOut(1000);
  });
  $('#journal-button').on('click', function() {
    Meditation.logStats();
    $('#feedback').fadeOut(1000);
    page('/journal/new');
  });
};
