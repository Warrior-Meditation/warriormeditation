// var meditationView = {};
var url = '/tracks/238687124';

// meditationView.init = function(meditation) {
//   $('#meditation-content')
//     .empty()
//     .show()
//     .append([
//       '<h1>' + meditation.title + '</h1>',
//       '<p>' + meditation.description + '</p>',
//       '<a href="" id="start">Start</a>',
//       '<a href="" id="stop">Stop</a>'
//     ])
//     .siblings().hide();
//   meditationView.player(meditation.soundUrl);
// };

// meditationView.player = function(url) {
SC.initialize({
  client_id: '9586854c0f0c9138735b653b994f0fb5'
});

var currentTrack = SC.get(url);

var timeCounter;
var mostRecentDay;
var totalTime;


SC.stream(url).then(function(player) {
  $('#start-test').on('click', function (e) {
    e.preventDefault();
    //Kick out date
    mostRecentDay = new Date().toISOString().slice(0,10);
    console.log(mostRecentDay);
    console.log('start');
    console.log(player);
    player.play();
  });

  $('#stop-test').on('click', function (e) {
    e.preventDefault();
    console.log('stop');
    timeCounter = player.currentTime();
    //kick out elapsed time
    console.log(timeCounter);
    player.pause();
  });

  player.on('finish', function () {
    timeCounter = currentTrack._result.duration;
    //kick out elapsed time
    console.log(timeCounter);
    console.log('finish');
  });
});

meditationScoring = function() {
  $('#total-days').text(User.ttlDays);
  $('#total-time').text(Math.floor(User.ttlTime/3600000));
  $('#current-consecutive-days').text(User.currConsecDays);
  $('#highest-consecutive-days').text(User.mostConsecDays);
};
// };
