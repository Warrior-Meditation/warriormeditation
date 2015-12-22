SC.initialize({
  client_id: '9586854c0f0c9138735b653b994f0fb5'
});

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

//   // SC.stream(currentTrack, function(sound){
//     $('#start').click(function(e) {
//       e.preventDefault();
//       console.log('start');
//       sound.start();
//     });
//     $('#stop').click(function(e) {
//       e.preventDefault();
//       console.log('stop');
//       sound.stop();
//     });
//   });
// // });



// /tracks/181282422

// client_id: '9586854c0f0c9138735b653b994f0fb5'
