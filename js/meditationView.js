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

SC.initialize({
  client_id: '9586854c0f0c9138735b653b994f0fb5'
});

var track_url = 'https://soundcloud.com/david-swaintek/dragons-versus-robots';

SC.oEmbed(
  track_url,
  { auto_play: false, element: $('player') })
.then(function(oEmbed) {
  console.log('oEmbed response: ', oEmbed);
});
