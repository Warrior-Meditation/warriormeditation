var firebase = new Firebase('https://warrior-meditation.firebaseio.com');

var User = {};
User.uid = '';
User.exists = false;
User.name = '';
User.email = '';
User.allJournals = [];
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
    User.setLogout();
    User.recordExists();
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
      User.setLogout();
      User.recordExists();
    }
  });
};

User.recordExists = function () {
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
};

User.setLogout = function(){
  $('#auth-status').text('Logout').removeClass('login').addClass('logout');
  $('.logout').on('click', User.logout);
};

User.login = function(event){
  event.preventDefault();
  console.log('Take the user to login screen');
  // User.setLogin();
  // controller.loginInit();
  page('/login');
};

User.logout = function(event){
  event.preventDefault();
  console.log('Logging out user!');
  firebase.unauth();
  User.setLogin();
  page('/login');
};

//router should call these
$('#createAccount').submit(User.createUser);
$('#loginAccount').submit(User.authUser);



$(function() {
  User.alreadyAuthed();
});
