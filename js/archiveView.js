var archiveView = {};

archiveView.init = function() {
  $('#journal-archive-content')
    .empty()
    .show()
    .siblings().hide();
  Journal.allEntries.forEach(function(entry) {
    $('#journal-archive-content').append(archiveView.toHTML(entry));
  });
};

archiveView.toHTML = function(entry) {
  return archiveView.template(entry);
};
