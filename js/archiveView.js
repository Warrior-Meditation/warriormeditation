var archiveView = {};

archiveView.init = function() {
  $('#journal-archive-content')
    .empty()
    .show()
    .siblings().hide();
  $('.nav > li').removeClass('active');
  $('#archive').addClass('active');
  User.allJournals.forEach(function(entry) {
    $('#journal-archive-content').append(archiveView.toHTML(entry));
  });
};

archiveView.toHTML = function(entry) {
  return archiveView.template(entry);
};
