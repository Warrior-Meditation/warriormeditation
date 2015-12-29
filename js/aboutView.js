var aboutView = {};

aboutView.init = function () {
  $('#about-content')
    .show()
    .siblings().hide();
  $('.nav > li').removeClass('active');
  $('#about').addClass('active');
};
