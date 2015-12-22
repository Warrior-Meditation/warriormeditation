var journal = {};
journal.entries = [];

journal.createTemplate = function() {
  $.get('journaltemplate.html', function(data, message, xhr) {
    Journal.prototype.template = Handlebars.compile(data);
  });
};
