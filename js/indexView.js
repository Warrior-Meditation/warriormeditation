var indexView = {};

indexView.init = function () {
  $('#index-content')
    .show()
    .siblings().hide();
  $('.nav > li').removeClass('active');
  $('#home').addClass('active');
};

indexView.displayStats = function() {
  if (User.uid) {
    console.log('show');
    $('#user-scoring').show();
  }
  $('#total-days').text('Total days: ' + User.ttlDays);
  $('#total-hours').text('Total hours: ' + Math.floor(User.ttlTime/3600000));
  $('#current-consecutive-days').text('Current consecutive days: ' + User.currConsecDays);
  $('#highest-consecutive-days').text('Highest consecutive days: ' + User.mostConsecDays);
};
