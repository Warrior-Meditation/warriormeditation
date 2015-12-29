var indexView = {};

indexView.init = function () {
  $('#index-content')
    .show()
    .siblings().hide();
  if (User.uid) {
    $('#user-scoring').show();
  }
  indexView.displayStats();
};

indexView.displayStats = function() {
  $('#stats').on('click', function() {
    console.log($(this))
    $('.popup').show();
    // .attr('display', 'flex');
  });
};
