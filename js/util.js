var util = {};

util.relativeDate = function(pastDate) {
  //Date stuff adapted from: http://stackoverflow.com/a/2627493 & http://stackoverflow.com/a/4929629
  oneDay = 86400000;
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1;
  var yyyy = today.getFullYear();
  var pastDateArray=pastDate.split('-');
  var todayDate = new Date(yyyy,mm,dd);
  var pastEpochDate = new Date(pastDateArray[0],pastDateArray[1],pastDateArray[2]);
  var diffDays = Math.round(Math.abs((todayDate.getTime() - pastEpochDate.getTime())/(oneDay)));
  return diffDays;
};

util.today = function() {
  return (new Date()).toISOString().slice(0,10);
};
