//Get React:
var React = require('react');

//FormBox SVGs:

var StarSVG = React.createClass({

  handleChange: function(index, number) {

    var initialArray = this.props.work;
    var newObject = copy(initialArray);
    var targetItem = initialArray[index];

    newObject.splice(index, 1, {
      name: targetItem.name,
      count: targetItem.count,
      topic: targetItem.topic,
      performance: number,
      selected: true
    })

    var newState={}
    newState.work = newObject

    this.props.changeValue(newState)
  },

  render: function() {

    var number = this.props.number;
    var index = this.props.index;
    var performance = this.props.performance;

    if (number <= performance) {
      var type = "selected"
    } else {
      var type = "not-selected"
    }

    return (
      <svg id={'work-' + index + '-' + number} className={type} onClick={this.handleChange.bind(this, index, number)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22">
        <polygon points="11.17 1.13 14.29 7.45 21.26 8.46 16.21 13.38 17.4 20.33 11.17 17.05 4.93 20.33 6.12 13.38 1.07 8.46 8.05 7.45 11.17 1.13"/>
      </svg>
    )
  }
})

var GenerateSVG = React.createClass ({
  render: function() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
        <path d="M3.6,0.1v24.8h18V0.1H3.6z M9.6,22.9l1.7-9.6l-3-1.8l7.2-9.3l-1.6,9.6l3,1.8L9.6,22.9z"/>
      </svg>
    )
  }
})

var AddSVG = React.createClass({
  render: function() {
    return (
      <svg className="button-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.98 14.98">
        <polygon points="14.48 5.39 9.58 5.39 9.58 0.5 5.39 0.5 5.39 5.39 0.5 5.39 0.5 9.58 5.39 9.58 5.39 14.48 9.58 14.48 9.58 9.58 14.48 9.58 14.48 5.39"/>
      </svg>
    )
  }
})

var DeleteSVG = React.createClass ({
  render: function() {
    return (
      <svg className="button-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.26 14.26">
        <polygon points="13.55 10.59 10.09 7.13 13.55 3.67 10.59 0.71 7.13 4.17 3.67 0.71 0.71 3.67 4.17 7.13 0.71 10.59 3.67 13.55 7.13 10.09 10.59 13.55 13.55 10.59"/>
      </svg>
    )
  }
})

module.exports = {
    generateSVG: GenerateSVG,
    addSVG: AddSVG,
    deleteSVG: DeleteSVG,
    starSVG: StarSVG,
};

//Utiliies

//Copy array function:

function copy(thing){

  if(typeof thing !== "object" || thing === null){
    return thing;
  }

  if(Array.isArray(thing)) {
    var out = [];
    for(var i = 0; i < thing.length; i++){
      out.push( copy(thing[i]) );
    }
    return out;
  }

  var out = {};
  for(var key in thing){
    out[key] = copy(thing[key]);
  }
  return out;

}