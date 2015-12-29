var loginView = {};

loginView.init = function () {
  $('.nav > li').removeClass('active');
  
  $('section').hide();
  $('#login-content')
    .show()
    .siblings().hide();
  console.log('initing loginView');
};
