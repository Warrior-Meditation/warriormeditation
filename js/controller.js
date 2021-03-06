var controller = {};

//INDEX PAGE METHODS

controller.indexInit = function() {
  indexView.init();
};

//MEDITATION PAGE METHODS

controller.fetchMeditations = function(ctx, next) {
  console.log('fetching meditation');
  Meditation.getJSON(next);
};

controller.meditationInit = function(ctx, next) {
  Meditation.match(ctx, meditationView.init);
};

//JOURNAL METHODS

controller.editorInit = function(ctx, next) {
  editorView.init(ctx);
};

controller.archiveInit = function() {
  archiveView.init();
};

controller.journalTemplate = function(ctx, next) {
  if (archiveView.template) {
    next();
  } else {
    $.get('/templates/journaltemplate.html', function(data, msg, xhr) {
      archiveView.template = Handlebars.compile(data);
      next();
    });
  }
};

//RESOURCES METHODS

controller.resourcesInit = function() {
  resourcesView.init();
};

//ABOUT METHODS

controller.aboutInit = function() {
  aboutView.init();
};

//LOGIN/REGISTRATION METHODS

controller.loginInit = function() {
  loginView.init();
};
