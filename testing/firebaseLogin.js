
var ref = new Firebase('https://warrior-meditation.firebaseio.com');
User = {};
User.authUser = function (event) {
  event.preventDefault();
  console.log($('#loginEmail').val());
  console.log($('#loginPassword').val());
  ref.authWithPassword({
    email    : $('#loginEmail').val(),
    password : $('#loginPassword').val()
  }, function(error, authData) {
    if (error) {
      console.log('Login Failed!', error);
    } else {
      console.log('Authenticated successfully with payload:', authData);
      console.log(authData);

    }
  });
};

$('#loginAccount').submit(User.authUser);
