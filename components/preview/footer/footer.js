//Get React:
var React = require('react');

//Get the PreviewTextTools
var PreviewTextTools = require('../resources.js').previewTextTools;


//Signature
var Signature = React.createClass ({
  render: function() {

    var referee = this.props.referee;

    function getName(title, firstName, lastName) {
      if (title !== "" && firstName == "" && lastName == "") {
        return "";
      } else if (title !== "" && firstName !== "" && lastName == "") {
        return firstName
      } else {
        return title + " " + firstName + " " + lastName;
      }
    }

    return (

      <div className="preview-block">
        <div className="preview-text">
          <span id="rendered-signature-phrase">Yours sincerely,</span>
          <br />
          <br />
          <br />
          <span id="rendered-signature-name">
            {getName(referee.title, referee.firstName, referee.lastName)}
          </span>
          <br />
          <span id="rendered-signature-title">
            {referee.jobTitle}
          </span>
          <br />
          <span id="rendered-signature-place">
            {referee.workPlace}
          </span>
        </div>
        <PreviewTextTools 
          randomNos={this.props.randomNos}
        />
      </div>
    )
  }
})

module.exports = Signature;


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