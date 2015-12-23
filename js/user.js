var ref = new Firebase('https://warrior-meditation.firebaseio.com');

var User = {};
User.uid = '';
User.exists = false;
User.name = '';
User.email = '';
User.lastMeditated = '';
User.ttlTimeMeditated = 0;
User.mostConsecDays = 0;
User.currConsecDays = 0;


User.existence = function (uid) {
  ref.once('value', function(snapshot) {
    var snap = snapshot.child('users').child(uid);
    User.exists = snap.exists();
    if (User.exists) {
      console.log('User record exists; don\'t create');
      console.log(snap.val());
      snapObj = snap.val();
      var keys = Object.keys(snapObj);
      keys.forEach(function(el){
        User[el] = snapObj[el];
      });
      console.log(User);

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
  ref.createUser({
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
  ref.authWithPassword({
    email    : User.email,
    password : userPassword
  }, function(error, authData) {
    if (error) {
      console.log('Login Failed!', error);
    } else {
      console.log('Authenticated successfully with payload:', authData);
      var uid = authData.uid;
      User.uid = uid;
      console.log(uid);
      User.existence(uid);
    }
  });
};

User.createUserRecord = function(uid) {
  console.log('creating record');
  User.uid = uid;
  userString = JSON.stringify(User);
  console.log(User);
  console.log(userString);
  ref.child('users').child(uid).set({
    uid: User.uid,
    name:  User.name,
    email: User.email,
    lastMeditated: User.lastMeditated,
    ttlTimeMeditated: User.ttlTimeMeditated,
    mostConsecDays: User.mostConsecDays,
    currConsecDays: User.currConsecDays
  });
};

//router should call these
$('#createAccount').submit(User.createUser);
$('#loginAccount').submit(User.authUser);
