var firebase = new Firebase('https://warrior-meditation.firebaseio.com');

var User = {};
User.uid = '';
User.exists = false;
User.name = '';
User.email = '';
User.allJournals = [];
User.lastDay = '';
User.ttlTime = 0;
User.ttlDays = 0;
User.mostConsecDays = 0;
User.currConsecDays = 0;

User.alreadyAuthed = function() {
  var authData = firebase.getAuth();
  if (authData) {
    console.log('User already authenticated with uid:', authData.uid);
    User.uid = authData.uid;
    $('#auth-status').text('Logout').removeClass('login').addClass('logout');
    $('.logout').on('click', User.logout);
    User.recordExists();
  }
  else {
    $('#auth-status').text('Login').removeClass('logout').addClass('login');
    // $('.login').on('click', User.login);
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
      $('#auth-status').text('Logout').removeClass('login').addClass('logout');
      $('.logout').on('click', User.logout);
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
      User.allJournals = JSON.parse(User.journalsString);
    }
    else {
      User.createUserRecord();
    }
  });
};

User.createUserRecord = function() {
  console.log('creating record');
  firebase.child('users').child(uid).set({
    uid: User.uid,
    name:  User.name,
    email: User.email,
    lastDay: User.lastDay,
    ttlTime: User.ttlTime,
    mostConsecDays: User.mostConsecDays,
    currConsecDays: User.currConsecDays
  });
};

User.logout = function(event){
  event.preventDefault();
  console.log('Logging out user!');
  firebase.unauth();
  User.alreadyAuthed;
};

//router should call these
$('#createAccount').submit(User.createUser);
$('#loginAccount').submit(User.authUser);



$(function() {
  User.alreadyAuthed();  //Tests if user already authenticated
});
