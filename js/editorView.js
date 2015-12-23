var editorView = {};

editorView.init = function() {
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
    Journal.allEntries.push(newEntry);
  });
};

editorView.create = function() {
  return new Journal({
    title: $('#edit-title').val(),
    category: 'NadaParty',   // Placeholder
    body: $('#edit-body').val(),
    publishedOn: new Date().toISOString().slice(0,10) // Gives you the first 10 characters from that string - date formatting
  });
};
