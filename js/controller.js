var controller = {};

//INDEX PAGE METHODS

controller.indexInit = function() {
  indexView.init();
};

//MEDITATION PAGE METHODS

controller.fetchMeditations = function(ctx, next) {
  Meditation.getJSON(next);
};

controller.meditationInit = function(ctx, next) {
  Meditation.match(ctx, meditationView.init);
};

//JOURNAL METHODS

controller.initEditor = function() {
  editorView.init();
};

controller.getJournalEntries = function() {
  Journal.getJSON(archiveView.init);
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
