var archiveView = {};

archiveView.init = function() {
  $('#journal-archive-content')
    .empty()
    .show()
    .siblings().hide();
  User.allJournals.forEach(function(entry) {
    $('#journal-archive-content').append(archiveView.toHTML(entry));
  });
  if (User.uid) {
    $('#user-scoring').show();
  }
};

archiveView.toHTML = function(entry) {
  return archiveView.template(entry);
};
