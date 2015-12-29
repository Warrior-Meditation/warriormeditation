var firebase = new Firebase('https://warrior-meditation.firebaseio.com');

var User = {};
User.uid = '';
User.exists = false;
User.name = '';
User.email = '';
User.allJournals = [];
User.journalsString = '';
User.lastDay = '';
User.currTime = 0;
User.ttlTime = 0;
User.ttlDays = 0;
User.ttlMeditations = 0;
User.mostConsecDays = 0;
User.currConsecDays = 0;
User.currentMeditation = '';

User.alreadyAuthed = function() {
  var authData = firebase.getAuth();
  if (authData) {
    console.log('User already authenticated with uid:', authData.uid);
    User.uid = authData.uid;
    User.recordExists(User.setLogout);
  }
  else {
    User.setLogin();
  }
};

User.createUser = function (event) {
  event.preventDefault();
  User.name = $('#formName').val();
  User.email = $('#formEmail').val();
  var userPassword = $('#formPassword').val();
  firebase.createUser({
    email    : User.email,
    password : userPassword
  }, function(error, userData) {
    if (error) {
      alert(error);
      console.log('Error creating user:', error);
    } else {
      console.log('Successfully created user account with uid:', userData.uid);
      User.authenticate(userPassword);
    }
  });
};

User.authUser = function (event) {
  event.preventDefault();
  User.email = $('#loginEmail').val();
  var userPassword = $('#loginPassword').val();
  User.authenticate(userPassword);
};

User.authenticate = function (userPassword) {
  firebase.authWithPassword({
    email    : User.email,
    password : userPassword
  }, function(error, authData) {
    if (error) {
      console.log('Login Failed!', error);
    } else {
      console.log('Authenticated successfully with payload:', authData);
      User.uid = authData.uid;
      User.recordExists(User.setLogout);
    }
  });
};

User.recordExists = function (callback) {
  callback = callback || function() {};
  firebase.child('users').child(User.uid).once('value', function(snapshot) {
    var snap = snapshot;
    User.exists = snap.exists();
    if (User.exists) {
      console.log('User record exists; don\'t create');
      snapObj = snap.val();
      var keys = Object.keys(snapObj);
      keys.forEach(function(el){
        User[el] = snapObj[el];
      });
      User.allJournals = JSON.parse(User.journalsString);
      callback();
    }
    else {
      User.updateUserRecord();
    }
  });
};

User.updateUserRecord = function() {
  console.log('updating Firebase record');
  firebase.child('users').child(User.uid).update({
    uid: User.uid,
    name:  User.name,
    email: User.email,
    lastDay: User.lastDay,
    currTime: User.currTime,
    ttlTime: User.ttlTime,
    ttlDays: User.ttlDays,
    ttlMeditations: User.ttlMeditations,
    mostConsecDays: User.mostConsecDays,
    currConsecDays: User.currConsecDays
  });
  Journal.storeJournals();
};

User.newConsecDays = function() {
  if (!User.lastDay) {
    User.lastDay = util.today();
  }
  var daysSinceLastMed = util.relativeDate(User.lastDay);
  console.log('daysSinceLastMed value ' + daysSinceLastMed);
  if (daysSinceLastMed === 1) {
    console.log('daysSinceLastMed = one');
    User.currConsecDays += 1;
    User.ttlDays += 1;
  }
  else if (daysSinceLastMed > 1) {
    console.log('daysSinceLastMed = zero');
    User.currConsecDays = 0;
    User.ttlDays += 1;
  }
  User.lastDay = util.today();
  if (User.currConsecDays > User.mostConsecDays) {
    User.mostConsecDays = User.currConsecDays;
  }
};

User.setLogin = function(){
  $('#auth-status').text('Login/Register').removeClass('logout').addClass('login');
  $('.login').on('click', User.login);
  $('#archive').hide();
  // indexView.displayStats();
};

User.setLogout = function(){
  $('#auth-status').text(User.name + ' (Logout)').removeClass('login').addClass('logout');
  $('.logout').on('click', User.logout);
  $('#archive').show();
  indexView.displayStats();
};

User.login = function(event){
  event.preventDefault();
  console.log('Take the user to login screen');
  page('/login');
};

User.logout = function(event){
  event.preventDefault();
  console.log('Logging out user!');
  firebase.unauth();
  User.setLogin();
  User.clear(indexView.displayStats);
  page('/login');
};

User.clear = function(callback) {
  User.uid = '';
  User.exists = false;
  User.name = '';
  User.email = '';
  User.allJournals = [];
  User.journalsString = '';
  User.lastDay = '';
  User.currTime = 0;
  User.ttlTime = 0;
  User.ttlDays = 0;
  User.ttlMeditations = 0;
  User.mostConsecDays = 0;
  User.currConsecDays = 0;
  User.currentMeditation = '';
  callback;
};

//router should call these
$('#createAccount').submit(User.createUser);
$('#loginAccount').submit(User.authUser);
