var meditationController = {};

meditationController.init = function() {
  Meditation.getJSON(meditationView.init);
};

meditationController.template = function(ctx, next) {
  if (meditationView.template) {
    next();
  } else {
    $.get('/templates/meditation.html', function (data, msg, xhr) {
      meditationView.template = Handlebars.compile(data);
      next();
    });
  }
};
