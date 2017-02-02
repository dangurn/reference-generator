//Get React:
var React = require('react');

//Get the PreviewTextTools
var PreviewTextTools = require('../resources.js').previewTextTools;


//Written Paragraph 4 - version 1:
var Paragraph4v1 = React.createClass({
  render: function() {

    var referenceType = this.props.referenceType;
    var applicantName = this.props.applicantName;
    var applicantPronouns = this.props.applicantPronouns;
    var newInfo = this.props.newInfo;
    var positionText = this.props.positionText;
    var newPlaceText = this.props.newPlaceText;
    var roleWord = this.props.roleWord;
    var academicPerformance = this.props.academicPerformance;
    var professionalPerformance = this.props.professionalPerformance;
    var randomNos= this.props.randomNos;
    var changeValue = this.props.changeValue;

    //We need to know what sort of endorsement to give them:
    function skillsPossessed(academic, professional) {

      if (referenceType.selected == "academic") {

        if (academic !== 0 && professional !== 0) {
          return "both the academic and professional skills required";
        } else if (academic !== 0 && professional == 0) {
          return "the academic skills required";
        } else if (academic == 0 && professional !== 0) {
          return "the professional skills required";
        } else {
          return "the skills required";
        }
      
      } else {
        return "the qualities desired"
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
        + " and would therefore be suitable for " + roleWord + ". ";
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

    var referenceType = this.props.referenceType;
    var applicantName = this.props.applicantName;
    var applicantPronouns = this.props.applicantPronouns;
    var relationshipPlace = this.props.relationshipPlace;
    var newInfo = this.props.newInfo;
    var positionText = this.props.positionText;
    var roleWord = this.props.roleWord;
    var oldPlaceText = this.props.oldPlaceText;
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
      return "As " + applicantName[0] + " leaves " + oldPlaceText +  
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
      "Thank you for considering " + applicantName[0] + " for " + roleWord + ". ";
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

    var referenceType = this.props.referenceType;
    var applicantName = this.props.applicantName;
    var applicantPronouns = this.props.applicantPronouns;
    var newInfo = this.props.newInfo;
    var positionText = this.props.positionText;
    var roleWord = this.props.roleWord;
    var newPlaceText = this.props.newPlaceText;
    var academicPerformance = this.props.academicPerformance;
    var professionalPerformance = this.props.professionalPerformance;
    var randomNos= this.props.randomNos;
    var changeValue = this.props.changeValue;

    //Get info:
    if (referenceType.selected == "tenancy") {
      var performanceWord = " conduct"
    } else {
      var performanceWord = " performance"
    }

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

    function getEndorsement() {
      if (referenceType.selected == "tenancy") {
        return applicantPronouns[1] + " would be a very respectful occupant of "
      } else {
        return applicantPronouns[4] + " the potential to excel in a " + newInfo.position + " position at "
      }
    }

    function writeSentence1(suitable) {
      if (suitable == true) {
        return "Based on the observations I have made about " + applicantName[1] + performanceWord + ", I believe " 
        + getEndorsement() + newPlaceText 
          + getQualities(academicPerformance, professionalPerformance) + " and I would therefore like to recommend " 
          + applicantPronouns[2] + " for " + roleWord + ". ";
      } else {
        return "Based on the observations I have made about " + applicantName[1] 
        + performanceWord + " in this reference, I hope you have all the information you require to make a judgement about "
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
    var referenceType = this.props.referenceType;
    var applicantName = this.props.applicantName;
    var relationshipPlace = this.props.relationshipPlace;
    var newInfo = this.props.newInfo;
    var work = this.props.work;
    var skillsCommunication = this.props.skillsCommunication;
    var skillsAttitude = this.props.skillsAttitude;
    var skillsOther = this.props.skillsOther;
    var profSkillsAll = skillsCommunication.concat(skillsAttitude,skillsOther);
    var randomNos = this.props.randomNos;

    //And then transform this so it can be passed down to the Writing Components:

    //Capitalise function:
    function capitalise(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }

    //Get Prefix prefix:
    function getPrefix (word) {
      switch (word.charAt(0)) {
        case "A":
        case "E":
        case "I":
        case "O":
        case "U":
          return "an "
        default:
          return "a "
      }
    }

    //Get some key words:
    if (referenceType.selected == "tenancy") {
      var roleWord = "accomodation";
    } else {
      var roleWord = "this role"
    }


    //Write the position sentence:
    function getPosition(position) {

      if (position == "") {
        if (referenceType.selected == "tenancy") {
          return "for residency "
        } else {
          return "for a position ";
        }

      } else {

        var capitalisedPosition = position.charAt(0).toUpperCase() + position.slice(1)

        switch (capitalisedPosition.charAt(0)) {
          case "A":
          case "E":
          case "I":
          case "O":
          case "U":
            return "for an " + capitalise(capitalisedPosition) + " position ";
          default:
            return "for a " + capitalise(capitalisedPosition) + " position ";
        }
      }
    }

    var positionText = getPosition(newInfo.position);


    //Get the name of the old place:
    function getOldPlace(place) {

      if (place == "") {

        if (referenceType.selected == "tenancy") {
          return "the fomer premises"
        } else {
          return "my institution"
        }

      } else {
        return capitalise(place);
      }
    }

    var oldPlaceText = getOldPlace(relationshipPlace)


    //Get the name of the new place:
    function getNewPlace(newPlace) {

      if (newPlace == "" ) {

        if (referenceType.selected == "tenancy") {
          return "your premises"
        } else {
          return "your institution";
        }

      } else {
        return capitalise(newPlace);
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
          referenceType={this.props.referenceType}
          applicantName={this.props.applicantName}
          applicantPronouns={this.props.applicantPronouns}
          relationshipPlace={this.props.relationshipPlace}
          newInfo={this.props.newInfo}
          positionText={positionText}
          newPlaceText={newPlaceText}
          roleWord={roleWord}
          academicPerformance={academicPerformance}
          professionalPerformance={professionalPerformance}
          randomNos={this.props.randomNos}
          changeValue={this.props.changeValue}
        />
        break;
      case 2:
        var writtenParagraph = 
        <Paragraph4v2 
          referenceType={this.props.referenceType}
          applicantName={this.props.applicantName}
          applicantPronouns={this.props.applicantPronouns}
          relationshipPlace={this.props.relationshipPlace}
          newInfo={this.props.newInfo}
          positionText={positionText}
          oldPlaceText={oldPlaceText}
          newPlaceText={newPlaceText}
          roleWord={roleWord}
          academicPerformance={academicPerformance}
          professionalPerformance={professionalPerformance}
          randomNos={this.props.randomNos}
          changeValue={this.props.changeValue}
        />
        break;
      case 3:
        var writtenParagraph = 
        <Paragraph4v3 
          referenceType={this.props.referenceType}
          applicantName={this.props.applicantName}
          applicantPronouns={this.props.applicantPronouns}
          relationshipPlace={this.props.relationshipPlace}
          newInfo={this.props.newInfo}
          positionText={positionText}
          newPlaceText={newPlaceText}
          roleWord={roleWord}
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
