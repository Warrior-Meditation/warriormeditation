var indexView = {};

indexView.init = function () {
  $('#index-content')
    .show()
    .siblings().hide();
  $('.nav > li').removeClass('active');
  $('#home').addClass('active');
};
