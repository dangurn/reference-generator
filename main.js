//React dependencies:
var React = require('react');
var ReactDOM = require('react-dom');

//Main components from files:
var DataStore = require('./components/datastore.js');

//The whole app
var App = React.createClass({

  render: function() {

    return (
      <DataStore />
    )
  }
})

ReactDOM.render(<App />, document.getElementById('app'));

