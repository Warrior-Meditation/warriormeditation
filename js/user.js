function User(props) {
  this.name = props.name;
  this.uid = props.uid;
  this.email = props.email;
  this.timeMeditated = props.timeMeditated;
  this.meditationData = props.meditationData;
  this.lastMeditated = props.lastMeditated;
  this.consecDays = props.consecDays;
};

User.authenticate = function (userEmail, userPassword) {
  ref.authWithPassword({
    email    : userEmail,
    password : userPassword
  }, function(error, authData) {
    if (error) {
      console.log('Login Failed!', error);
    } else {
      console.log('Authenticated successfully with payload:', authData);
    }
  });
};

User.authUser = function (event) {
  event.preventDefault();
  var userEmail = $('#loginEmail').val();
  var userPassword = $('#loginPassword').val();
  User.authenticate(userEmail, userPassword);
};

User.createUser = function (event) {
  event.preventDefault();
  var fullName = $('#formName').val();
  var userEmail = $('#formEmail').val();
  var userPassword = $('#formPassword').val();
  ref.createUser({
    email    : userEmail,
    password : userPassword
  }, function(error, userData) {
    if (error) {
      console.log('Error creating user:', error);
    } else {
      console.log('Successfully created user account with uid:', userData.uid);
      ref.child('users').child(userData.uid).set({
        name: fullName,
        email: userEmail
      });
      User.authenticate(userEmail, userPassword);
    }
  });
};
