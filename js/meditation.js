var Meditation = function(opts) {
  this.title = opts.title;
  this.description = opts.description;
  this.soundUrl = opts.soundUrl;
};

Meditation.allMeditations = [];

Meditation.getJSON = function(callback) {
  if (Meditation.allMeditations.length) {
    callback();
  } else {
    $.getJSON('/js/data.json', function(data) {
      data.forEach(function(e) {
        var meditation = new Meditation(e);
        Meditation.allMeditations.push(meditation);
      });
      callback();
    });
  }
};

Meditation.match = function(ctx, callback) {
  var data = ctx.params.meditation;
  var meditation;
  Meditation.allMeditations.forEach(function(e) {
    console.log(e.title);
    if (e.title == data) {
      meditation = e;
    }
  });
  callback(meditation);
};
