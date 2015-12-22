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
      data.forEach(function(e) {
        var journal = new Journal(e);
        Journal.allEntries.push(journal);
      });
      callback();
    });
  }
};
