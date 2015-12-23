var Journal = function(props) {
  this.title = props.title;
  this.category = props.category;
  this.body = props.body;
  this.publishedOn = props.publishedOn;
};

Journal.allEntries = [];

Journal.getJSON = function(callback) {
  if (Journal.allEntries.length) {
    callback();
  } else {
    $.getJSON('/js/journalEntries.json', function(data) {
      var dataString = JSON.stringify(data);
      firebase.child('users').child(User.uid).child('journalsString').set(dataString);
      data.forEach(function(e) {
        // firebase.child('users').child(User.uid).child('journals').push(e);
        var journal = new Journal(e);
        Journal.allEntries.push(journal);
      });
      // callback();
    });
  }
};

Journal.retrieveJournals = function() {
  firebase.child('users').child(uid).child('journalsString').once('value', function(snapshot) {
    var snap = snapshot;
    User.allJournals = JSON.parse(snap);
  });
};

Journal.storeJournals = function() {
  journalsString = JSON.stringify(User.allJournals);
  firebase.child('users').child(uid).child('journalsString').set(journalsString);
};
