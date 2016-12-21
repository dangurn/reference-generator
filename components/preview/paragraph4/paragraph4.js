//Get React:
var React = require('react');

//Get the PreviewTextTools
var PreviewTextTools = require('../resources.js').previewTextTools;


//Paragraph 4A (Sign-off Introduction)
var SignOffIntroduction = React.createClass({
  render: function () {

    var applicantName = this.props.applicantName;
    var newInfo = this.props.newInfo;

    //Write the position sentence
    function getPosition(position) {

      if (position == "") {
        return "for a position ";

      } else {

        switch (position.charAt(0)) {
          case "a":
          case "e":
          case "i":
          case "o":
          case "u":
            return "for an " + position + " position ";
          default:
            return "for a " + position + " position ";
        }
      }
    }

    //Get the name of the new place:
    function getNewPlace(newPlace) {
      if (newPlace == "" ) {
        return "your institution";
      } else {
        return newPlace;
      }
    }

    function writeSentence() {
      return "I hope this provides you with the information you require about " + applicantName[1]
        + " suitability " + getPosition(newInfo.position) +  "at " + getNewPlace(newInfo.place) + ". "
    }

    return (
      <span>
        {writeSentence()}
      </span>
    )
  }
})

//Paragraph 4B (Sign-off Endorsement)
var SignOffEndorsement = React.createClass({
  render: function() {

    var applicantName = this.props.applicantName;
    var applicantPronouns = this.props.applicantPronouns;
    var newInfo = this.props.newInfo;
    var work = this.props.work;
    var profSkillsAll = this.props.profSkillsAll;

    //Check if they any academic skills:
    var academicPerformance = 0;

    for (var i = 0; i < work.length; i++) {
      if (work[i].performance > 1) {
        academicPerformance++
      }
    }

    //Check if they have any professional skills:
    var professionalPerformance = 0;

    for (var i = 0; i < profSkillsAll.length; i++) {
      if (profSkillsAll[i].selected == true) {
        professionalPerformance++
      }
    }

    //Get the place:
    function newPlace(place) {
      if (place == "") {
        return "your institution";
      } else {
        return place;
      }
    }

    //Now decide what sort of endorsement we'll give them:
    function skillsPossessed(academic, professional) {
      if (academic !== 0 && professional !== 0) {
        return "both the academic and professional skills required";
      } else if (academic !== 0 && professional == 0) {
        return "the academic skills required";
      } else if (academic == 0 && professional !== 0) {
        return "the professional skills required";
      } else {
        return "the skills required";
      }
    }

    //Write the sentence
    function writeSentence(suitable) {
      if (suitable == true) {
      return "In light of the points above, I believe " + applicantName[0] + " posseses " 
        + skillsPossessed(academicPerformance,professionalPerformance) + " for a " 
        + newInfo.position + " position at " + newPlace(newInfo.place) 
        + " and would therefore be suitable for this role. ";
      } else {
        return "";
      }
    }

    return (
      <span>
        {writeSentence(newInfo.suitable)}
      </span>
    )
  }
})

//Paragraph 4C (Sign-off Questions)
var SignOffQuestions = React.createClass({
  render: function() {
    return (
      <span>
         If you have any further questions, please do feel free to contact me. 
      </span>
    )
  }
})

//Paragraph 4D (Sign-off Wishes)
var SignOffWishes = React.createClass({
  render: function() {

    var applicantPronouns = this.props.applicantPronouns;
    var newInfo = this.props.newInfo;

    function writeSentence(suitable) {
      if (suitable == true) {
        return " I wish " + applicantPronouns[2] + " the best with " 
        + applicantPronouns[1] + " application.";
      } else {
        return "";
      }
    }

    return (
      <span>
        {writeSentence(newInfo.suitable)}
      </span>
    )
  }
})

// Paragraph 4: (Sign-off)
var Paragraph4 = React.createClass ({
  render: function () {

    var applicantName = this.props.applicantName;
    var applicantPronouns = this.props.applicantPronouns;
    var newInfo = this.props.newInfo;

    var work = this.props.work;
    var skillsCommunication = this.props.skillsCommunication;
    var skillsAttitude = this.props.skillsAttitude;
    var skillsOther = this.props.skillsOther;
    var profSkillsAll = skillsCommunication.concat(skillsAttitude,skillsOther)

    return (

      <div className="preview-block">
        <div className="preview-text" id="rendered-paragraph4">
          <SignOffIntroduction 
          applicantName={this.props.applicantName}
          newInfo={this.props.newInfo}
          />
          <SignOffEndorsement
            applicantName={this.props.applicantName}
            applicantPronouns={this.props.applicantPronouns}
            newInfo={this.props.newInfo}
            work={this.props.work}
            profSkillsAll={profSkillsAll}
          />
          <SignOffQuestions />
          <SignOffWishes 
            applicantPronouns={this.props.applicantPronouns}
            newInfo={this.props.newInfo}
          />
        </div>
        <PreviewTextTools />
      </div>
    )
  }
})

module.exports = Paragraph4;


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
