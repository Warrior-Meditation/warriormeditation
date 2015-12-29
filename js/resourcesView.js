var resourcesView = {};

resourcesView.init = function() {
  $('#resources-content')
    .show()
    .siblings().hide();
  $('.nav > li').removeClass('active');
  $('#resources').addClass('active');
};
