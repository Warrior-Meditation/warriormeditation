var indexView = {};

indexView.init = function () {
  $('#index-content')
    .show()
    .siblings().hide();
  $('.nav > li').removeClass('active');
  $('#home').addClass('active');
  if (User.uid) {
    $('#user-scoring').show();
  }
  indexView.displayStats();
};

indexView.displayStats = function() {
  $('#stats').on('click', function() {
    $('.popup').show();
  });
};
