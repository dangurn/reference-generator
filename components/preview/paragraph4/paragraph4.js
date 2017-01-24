//Get React:
var React = require('react');

//Get the PreviewTextTools
var PreviewTextTools = require('../resources.js').previewTextTools;


//Written Paragraph 4 - version 1:
var Paragraph4v1 = React.createClass({
  render: function() {

    var applicantName = this.props.applicantName;
    var applicantPronouns = this.props.applicantPronouns;
    var newInfo = this.props.newInfo;
    var positionText = this.props.positionText;
    var newPlaceText = this.props.newPlaceText;
    var academicPerformance = this.props.academicPerformance;
    var professionalPerformance = this.props.professionalPerformance;
    var randomNos= this.props.randomNos;
    var changeValue = this.props.changeValue;

    //We need to know what sort of endorsement to give them:
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

    //Write the sentences:

    function writeSentence1() {
      return "I hope this provides you with the information you require about " + applicantName[1]
        + " suitability " + positionText +  "at " + newPlaceText + ". "
    }

    function writeSentence2(suitable) {
      if (suitable == true) {
      return "In light of the points above, I believe " + applicantName[0] + " posseses " 
        + skillsPossessed(academicPerformance,professionalPerformance) + " " + positionText 
        + " and would therefore be suitable for this role. ";
      } else {
        return "";
      }
    }

    function writeSentence3() {
      return "If you have any further questions, please do feel free to contact me. "
    }

    var finalParagraph = writeSentence1() + writeSentence2(newInfo.suitable) + writeSentence3();

    return (
      <span>{finalParagraph}</span>
    )
  }
})


//Written Paragraph 4 - version 2:
var Paragraph4v2 = React.createClass({
  render: function() {

    var applicantName = this.props.applicantName;
    var applicantPronouns = this.props.applicantPronouns;
    var relationshipPlace = this.props.relationshipPlace;
    var newInfo = this.props.newInfo;
    var positionText = this.props.positionText;
    var newPlaceText = this.props.newPlaceText;
    var academicPerformance = this.props.academicPerformance;
    var professionalPerformance = this.props.professionalPerformance;
    var randomNos= this.props.randomNos;
    var changeValue = this.props.changeValue;

    //Get bits of information:

    function seekSuffixText(pronoun) {
      if (pronoun == "they") {
        return pronoun + " seek";
      } else {
        return pronoun + " seeks"
      }
    }

    function getPlace(place) {
      if (place == "") {
        return "my institution"
      } else {
        return place;
      }
    }

    function getQualities(academic, professional) {
      if (academic !== 0 && professional !== 0) {
        return " both academically and professionally";
      } else if (academic !== 0 && professional == 0) {
        return " academically";
      } else if (academic == 0 && professional !== 0) {
        return " professionally";
      } else {
        return "";
      }
    }

    //Write the sentences:

    function writeSentence1() {
      return "As " + applicantName[0] + " leaves " + getPlace(relationshipPlace) +  
      ", I hope you will be able to provide " + applicantPronouns[2] + " with the opportunity " 
      + positionText + seekSuffixText(applicantPronouns[0]) + ". ";
    }

    function writeSentence2(suitable) {
      if (suitable == true) {
        return "Due to the qualities " + applicantPronouns[4] + " exhibited" 
        + getQualities(academicPerformance, professionalPerformance) + ", I believe " + applicantName[0] 
        + " deserves consideration " + positionText + " at " + newPlaceText
        + " and I give " + applicantPronouns[2] + " my recommendation. "
      } else {
        return ""
      }
    }

    function writeSentence3() {
      return "If you have any further questions, please feel free to contact me. " +
      "Thank you for considering " + applicantName[0] + " for this role. ";
    }

    var finalParagraph = writeSentence1() + writeSentence2(newInfo.suitable) + writeSentence3();

    return (
      <span>{finalParagraph}</span>
    )
  }
})



//Written Paragraph 4 - version 3:
var Paragraph4v3 = React.createClass({
  render: function() {

    var applicantName = this.props.applicantName;
    var applicantPronouns = this.props.applicantPronouns;
    var newInfo = this.props.newInfo;
    var positionText = this.props.positionText;
    var newPlaceText = this.props.newPlaceText;
    var academicPerformance = this.props.academicPerformance;
    var professionalPerformance = this.props.professionalPerformance;
    var randomNos= this.props.randomNos;
    var changeValue = this.props.changeValue;

    //Get info:

    function getQualities(academic, professional) {
      if (academic !== 0 && professional !== 0) {
        return " both academically and professionally,";
      } else if (academic !== 0 && professional == 0) {
        return " academically,";
      } else if (academic == 0 && professional !== 0) {
        return " professionally,";
      } else {
        return "";
      }
    }

    //Write the sentences:

    function writeSentence1(suitable) {
      if (suitable == true) {
        return "Based on the observations I have made about " + applicantName[1] + " performance, I believe " 
        + applicantPronouns[4] + " the potential to excel in a " + newInfo.position + " position at " + newPlaceText 
          + getQualities(academicPerformance, professionalPerformance) + " and I would therefore like to recommend " 
          + applicantPronouns[2] + " for this role. ";
      } else {
        return "Based on the observations I have made about " + applicantName[1] 
        + " performance in this reference, I hope you have all the information you require to make a judgement about "
        + applicantPronouns[1] + " suitability " + positionText + " at " + newPlaceText + ". ";
      }
      
    }

    function writeSentence2() {
      return "If you have any further questions, please feel free to contact me. " +
      "Thank you for considering " + applicantName[1] + " application. ";
    }

    var finalParagraph = writeSentence1(newInfo.suitable) + writeSentence2();

    return (
      <span>{finalParagraph}</span>
    )
  }
})





//Paragraph 4 Compiler
//In this component, we take a load of information from state then
//put it in a format such that it can be rendered by the Paragraph 4 components:

var Paragraph4Compiler = React.createClass({
  render: function() {

    //Get Information:
    var applicantName = this.props.applicantName;
    var newInfo = this.props.newInfo;
    var work = this.props.work;
    var skillsCommunication = this.props.skillsCommunication;
    var skillsAttitude = this.props.skillsAttitude;
    var skillsOther = this.props.skillsOther;
    var profSkillsAll = skillsCommunication.concat(skillsAttitude,skillsOther);
    var randomNos = this.props.randomNos;

    //And then transform this so it can be passed down to the Writing Components:

    //Write the position sentence:
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

    var positionText = getPosition(newInfo.position);


    //Get the name of the new place:
    function getNewPlace(newPlace) {
      if (newPlace == "" ) {
        return "your institution";
      } else {
        return newPlace;
      }
    }

    var newPlaceText = getNewPlace(newInfo.place)


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

    //Now decide which paragraph will be written based on the random number selected:

    switch (randomNos.paragraph4.current) {
      case 1:
        var writtenParagraph = 
        <Paragraph4v1 
          applicantName={this.props.applicantName}
          applicantPronouns={this.props.applicantPronouns}
          relationshipPlace={this.props.relationshipPlace}
          newInfo={this.props.newInfo}
          positionText={positionText}
          newPlaceText={newPlaceText}
          academicPerformance={academicPerformance}
          professionalPerformance={professionalPerformance}
          randomNos={this.props.randomNos}
          changeValue={this.props.changeValue}
        />
        break;
      case 2:
        var writtenParagraph = 
        <Paragraph4v2 
          applicantName={this.props.applicantName}
          applicantPronouns={this.props.applicantPronouns}
          relationshipPlace={this.props.relationshipPlace}
          newInfo={this.props.newInfo}
          positionText={positionText}
          newPlaceText={newPlaceText}
          academicPerformance={academicPerformance}
          professionalPerformance={professionalPerformance}
          randomNos={this.props.randomNos}
          changeValue={this.props.changeValue}
        />
        break;
      case 3:
        var writtenParagraph = 
        <Paragraph4v3 
          applicantName={this.props.applicantName}
          applicantPronouns={this.props.applicantPronouns}
          relationshipPlace={this.props.relationshipPlace}
          newInfo={this.props.newInfo}
          positionText={positionText}
          newPlaceText={newPlaceText}
          academicPerformance={academicPerformance}
          professionalPerformance={professionalPerformance}
          randomNos={this.props.randomNos}
          changeValue={this.props.changeValue}/>
        break;
    }

    return (
      <div className="preview-block">
        <div className="preview-text copy-body email-body" id="paragraph4">
          {writtenParagraph}
        </div>
        <PreviewTextTools
          name="paragraph4"
          randomised="true"
          editable="true"
          randomNos={this.props.randomNos}
          changeValue={this.props.changeValue}
        />
      </div>
    )
  }

})


module.exports = Paragraph4Compiler;


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
