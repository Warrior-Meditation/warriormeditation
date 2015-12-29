var resourcesView = {};

resourcesView.init = function() {
  $('#resources-content')
    .show()
    .siblings().hide();
  if (User.uid) {
    $('#user-scoring').show();
  }
  $('.nav > li').removeClass('active');
  $('#resources').addClass('active');
};
