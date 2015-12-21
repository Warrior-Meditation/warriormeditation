var requestProxy = require('express-request-proxy');
var express = require('express'),
  port = process.env.PORT || 3000,
  app = express();

var proxyFirebase = function(request, response) {
  console.log('Routing Firebase request for', request.params[0]);
  (requestProxy({
    url: 'https://warrior-meditation.firebaseio.com' + request.params[0],
    // headers: { Authorization: 'token ' + process.env.Firebase_TOKEN }
  }))(request, response);
};

app.get('/fb/*', proxyFirebase);

app.use(express.static('./'));

app.get('*', function(request, response) {
  response.sendFile('index.html', { root: '.' });
});

app.listen(port, function() {
  console.log('Server started on port ' + port + '!');
});
