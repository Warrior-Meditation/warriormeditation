var meditationController = {};

meditationController.fetch = function(ctx, next) {
  Meditation.getJSON(next);
};

meditationController.init = function(ctx, next) {
  Meditation.match(ctx, meditationView.init);
};
