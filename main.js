//React dependencies:
var React = require('react');
var ReactDOM = require('react-dom');

//Main components from files:
var Banner = require('./components/banner.js');
var DataStore = require('./components/datastore.js');

//The whole app
var App = React.createClass({

  render: function() {

    return (
      <div className="app-container">
        <Banner />
        <DataStore />
      </div>
    )
  }
})

ReactDOM.render(<App />, document.getElementById('app'));

