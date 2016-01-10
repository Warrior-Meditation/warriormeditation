var Journal = function(props) {
  this.title = props.title;
  this.category = props.category;
  this.body = props.body;
  this.publishedOn = props.publishedOn;
};

// Journal.retrieveJournals = function() {
//   firebase.child('users').child(User.uid).child('journalsString').once('value', function(snapshot) {
//     var snap = snapshot;
//     User.allJournals = JSON.parse(snap);
//   });
//   Journal.sortJournals();
// };

Journal.sortJournals = function() {
  User.allJournals.sort(function(a, b){
    var dateA = a.publishedOn;
    var dateB = b.publishedOn;
    if (dateA > dateB) return -1;
    if (dateA < dateB) return 1;
    return 0;
  });
};

Journal.storeJournals = function() {
  journalsString = JSON.stringify(User.allJournals);
  firebase.child('users').child(User.uid).child('journalsString').set(journalsString);
};
