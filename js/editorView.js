var editorView = {};

editorView.init = function(ctx) {
  $('#journal-editor-content')
  .show()
  .siblings().hide();
  editorView.capture();
};

editorView.capture = function() {
  $('#journal-form')
  .on('submit', function(event) {
    event.preventDefault();
    var newEntry = editorView.create();
    User.allJournals.push(newEntry);
    Journal.storeJournals();
  });
};

editorView.create = function() {
  return new Journal({
    title: $('#edit-title').val(),
    category: window.location.search.substring(1).split('=')[1],
    body: $('#edit-body').val(),
    publishedOn: new Date().toISOString().slice(0,10) // Gives you the first 10 characters from that string - date formatting
  });
};
