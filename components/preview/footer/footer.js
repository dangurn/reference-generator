//Get React:
var React = require('react');

//Get the PreviewTextTools
var PreviewTextTools = require('../resources.js').previewTextTools;


//Sign-off
var SignOff = React.createClass ({
  render: function() {
    return (
      <div className="preview-block">
        <div className="preview-text copy-body email-body" id="signOff">
          <span id="signaturePhrase">Yours sincerely,</span>
        </div>
        <PreviewTextTools
          name="signOff"
          randomised="false"
          editable="true"
        />
      </div>
    )
  }
})



//Signature
var Signature = React.createClass ({
  render: function() {

    //Get info:
    var referee = this.props.referee;
    var relationshipPlace = this.props.relationshipPlace;

    function getName(title, firstName, lastName) {
      if (title !== "" && firstName == "" && lastName == "") {
        return "";
      } else if (title !== "" && firstName !== "" && lastName == "") {
        return firstName
      } else if (title == "" && firstName !== "" && lastName !== "") {
        return firstName + " " + lastName;
      } else {
        return title + " " + firstName + " " + lastName;
      }
    }

    //Get workplace text
    if (referee.workPlace == "") {
      var workPlace = relationshipPlace;
    } else {
      var workPlace = referee.workPlace;
    }

    var finalWorkPlace = workPlace.charAt(0).toUpperCase() + workPlace.slice(1);


    return (

      <div className="preview-block">
        <div className="preview-text">
          <span id="signatureName">
            {getName(referee.title, referee.firstName, referee.lastName)}
          </span>
          <br />
          <span id="signatureTitle">
            {referee.jobTitle}
          </span>
          <br />
          <span id="signaturePlace">
            {finalWorkPlace}
          </span>
        </div>
        <PreviewTextTools
          name="signature"
          randomised="false"
          editable="false"
          randomNos={this.props.randomNos}
          changeValue={this.props.changeValue}
        />
      </div>
    )
  }
})

module.exports = {
  signoff: SignOff,
  signature: Signature
}


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