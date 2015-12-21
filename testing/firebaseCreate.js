
var ref = new Firebase('https://warrior-meditation.firebaseio.com');
function User(props) {
  this.fullName = props.fullName;
  this.emailAddress = props.emailAddress;
  this.UUID = props.UUID;
};

User.createUser = function (event) {
  event.preventDefault();
  ref.createUser({
    email    : $('#formEmail').val(),
    password : $('#formPassword').val()
  }, function(error, userData) {
    if (error) {
      console.log('Error creating user:', error);
    } else {
      console.log('Successfully created user account with uid:', userData.uid);
      var fullName = $('#formName').val();
      var email = $('#formEmail').val();
      ref.child('users').child(userData.uid).set({
        name: fullName,
        email: email
      });

      ref.authWithPassword({
        email    : $('#formEmail').val(),
        password : $('#formPassword').val()
      }, function(error, authData) {
        if (error) {
          console.log('Login Failed!', error);
        } else {
          console.log('Authenticated successfully with payload:', authData);
          console.log(authData);
        }
      });
    }
  });
};

$('#createAccount').submit(User.createUser);
