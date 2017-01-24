//Get React:
var React = require('react');

//FormBox SVGs:

var StarSVG = React.createClass({

  handleChange: function(index, number, enabled) {

    if (enabled == true) {

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
    
    }

  },


  render: function() {

    var number = this.props.number;
    var index = this.props.index;
    var performance = this.props.performance;
    var enabled = this.props.enabled;

    if (number <= performance) {
      var type = "selected"
    } else {
      var type = "not-selected"
    }

    return (
      <svg id={'work-' + index + '-' + number} className={type} onClick={this.handleChange.bind(this, index, number, enabled)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22">
        <polygon points="11.17 1.13 14.29 7.45 21.26 8.46 16.21 13.38 17.4 20.33 11.17 17.05 4.93 20.33 6.12 13.38 1.07 8.46 8.05 7.45 11.17 1.13"/>
      </svg>
    )
  }
})


//Reference Type Icons

var AcademicSVG = React.createClass ({
  render: function() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18.75 17.04">
        <path d="M10,1.9l9.37,4.2L10,10.3,0.63,6.1Z" transform="translate(-0.63 -1.9)"/>
        <path d="M5.41,9.77v2.77A6.28,6.28,0,0,0,10,14.25a6.77,6.77,0,0,0,4.72-1.71V9.77L10,11.88Z" transform="translate(-0.63 -1.9)"/>
        <circle cx="1.95" cy="15.55" r="1.5"/>
        <polygon points="2.58 16.14 2.58 7.12 1.32 6.58 1.32 16.14 2.58 16.14"/>
      </svg>
    )
  }
})

var ProfessionalSVG = React.createClass ({
  render: function() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22.47 27.81">
        <ellipse cx="10.88" cy="5.05" rx="5.09" ry="5.05"/>
        <path d="M15,11.19C3.74,11.19,3.77,28.91,3.77,28.91H26.23S26.23,11.19,15,11.19Zm0.1,16.47-3.36-4.07,2.39-11.15h1.28l2.85,11.31Z" transform="translate(-3.77 -1.09)"/>
      </svg>
    )
  }
})

var TenancySVG = React.createClass ({
  render: function() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17.17 18.67">
        <polygon points="8.58 4.36 2.52 10.61 2.52 10.61 2.52 19.35 7.03 19.35 7.03 15.43 10.14 15.43 10.14 19.35 14.65 19.35 14.65 10.61 14.65 10.61 8.58 4.36"/>
        <polygon points="13.6 4.98 13.6 1.09 11.51 1.09 11.51 2.9 8.61 0 8.58 0.03 8.55 0 0 8.55 1.22 9.77 8.58 2.41 15.95 9.77 17.17 8.55 13.6 4.98"/>
      </svg>
    )
  }
})




//Form Icons:
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
    academicSVG: AcademicSVG,
    professionalSVG: ProfessionalSVG,
    tenancySVG: TenancySVG,
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