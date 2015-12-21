var meditationController = {};

meditationController.init = function() {
  console.log('bang');
  Meditation.getJSON(meditationView.init);
};

meditationController.template = function(ctx, next) {
  if (meditationView.template) {
    console.log('has template');
    next();
  } else {
    $.get('/templates/meditation.html', function (data, msg, xhr) {
      console.log('getting template');
      meditationView.template = Handlebars.compile(data);
      next();
    });
  }
};
