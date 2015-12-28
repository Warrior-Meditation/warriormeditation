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
  var meditation;
  Meditation.allMeditations.forEach(function(e) {
    if (e.title == ctx.params.meditation) {
      meditation = e;
    }
  });
  callback(meditation);
};

Meditation.logStats = function() {
  User.newConsecDays();
  User.ttlMeditations += 1;
  User.ttlTime += User.currTime;
  if (User.uid) {
    User.updateUserRecord();
  }
};
