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

User.existence = function (uid) {
  firebase.child('users').child(uid).once('value', function(snapshot) {
    var snap = snapshot;
    User.exists = snap.exists();
    if (User.exists) {
      console.log('User record exists; don\'t create');
      console.log(snap.val());
      snapObj = snap.val();
      var keys = Object.keys(snapObj);
      keys.forEach(function(el){
        User[el] = snapObj[el];
        console.log(User[el] + ' = ' + snapObj[el]);
      });
      User.allJournals = JSON.parse(User.journalsString);
      return;
    }
    else {
      User.createUserRecord(uid);
    }
  });
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
      var uid = authData.uid;
      User.uid = uid;
      User.existence(uid);
    }
  });
};

User.createUserRecord = function(uid) {
  console.log('creating record');
  User.uid = uid;
  console.log(User);
  console.log(userString);
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

//router should call these
$('#createAccount').submit(User.createUser);
$('#loginAccount').submit(User.authUser);
