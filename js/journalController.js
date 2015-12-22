var journalController = {};

journalController.initEditor = function() {

};

journalController.getEntries = function() {
  Journal.getJSON(archiveView.init);
};

journalController.template = function(ctx, next) {
  if (archiveView.template) {
    next();
  } else {
    $.get('/templates/journaltemplate.html', function(data, msg, xhr) {
      archiveView.template = Handlebars.compile(data);
      next();
    });
  }
};
