var indexView = {};

indexView.init = function () {
  $('#index-content')
    .show()
    .siblings().hide();
  if (User.uid) {
    $('#user-scoring').show();
  } 
};
