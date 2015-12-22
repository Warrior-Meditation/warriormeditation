var ref = new Firebase('https://warrior-meditation.firebaseio.com');

function User(props) {
  this.name = props.name;
  this.uid = props.uid;
  this.email = props.email;
  this.timeMeditated = props.timeMeditated;
  this.meditationData = props.meditationData;
  this.lastMeditated = props.lastMeditated;
  this.consecDays = props.consecDays;
};

User.exists = false;
User.fullname = '';
User.email = '';

User.existence = function (uid) {
  ref.once('value', function(snapshot) {
    var snap = snapshot.child('users').child(uid);
    User.exists = snap.exists();
    if (User.exists) {
      console.log('User record exists; don\'t create');
      return;
    }
    else {
      User.createUserRecord(uid);
    }
  });
};

User.createUser = function (event) {
  event.preventDefault();
  User.fullName = $('#formName').val();
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
      console.log(uid);
      User.existence(uid);
    }
  });
};

User.createUserRecord = function(uid) {
  console.log('creating record');
  ref.child('users').child(uid).set({
    name: User.fullName,
    email: User.email
  });
};

//router should call these
$('#createAccount').submit(User.createUser);
$('#loginAccount').submit(User.authUser);
