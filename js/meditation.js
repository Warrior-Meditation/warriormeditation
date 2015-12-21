SC.initialize({
  client_id: '9586854c0f0c9138735b653b994f0fb5'
});

var track_url = 'https://soundcloud.com/david-swaintek/dragons-versus-robots';

SC.oEmbed(track_url, { auto_play: false, element: document.getElementById('player') })
.then(function(oEmbed) {
  console.log('oEmbed response: ', oEmbed);
});
