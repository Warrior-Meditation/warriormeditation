var Meditation = function(opts) {
  this.title = opts.title;
  this.description = opts.description;
  this.soundUrl = opts.soundUrl;
};

Meditation.allMeditations = [];

Meditation.getJSON = function(callback) {
  $.getJSON('/js/data.json', function(data) {
    console.log(data);
    data.forEach(function(e) {
      var meditation = new Meditation(e);
      Meditation.allMeditations.push(meditation);
    });
    callback();
  });
};

//instantiate current meditation
//render current meditation

//Soundcloud functionality
