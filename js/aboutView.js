var aboutView = {};

aboutView.init = function () {
  $('#about-content')
    .show()
    .siblings().hide();
  if (User.uid) {
    $('#user-scoring').show();
  }
};
