var meditationController = {};

meditationController.fetch = function(ctx, next) {
  Meditation.getJSON(next);
};

meditationController.init = function(ctx, next) {
  console.log('hello');
  Meditation.match(ctx, meditationView.init);
};
