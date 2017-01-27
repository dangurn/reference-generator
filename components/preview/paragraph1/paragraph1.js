//Get React:
var React = require('react');

//Get the PreviewTextTools
var PreviewTextTools = require('../resources.js').previewTextTools;


//Paragraph1 version 1
var Paragraph1v1 = React.createClass ({
  render: function() {

    //Get the information:
    var referenceType = this.props.referenceType;
    var applicantPronouns=this.props.applicantPronouns;
    var datePeriod = this.props.datePeriod;
    var applicantName = this.props.applicantName;
    var oldPlace = this.props.oldPlace;
    var oldPosition = this.props.oldPosition;
    var newPosition = this.props.newPosition;
    var newPlace = this.props.newPlace;
    var startPhrase = this.props.startPhrase;
    var endPhrase = this.props.endPhrase;
    var yearsKnownPhrase = this.props.yearsKnownPhrase;
    var rolesPhrase = this.props.rolesPhrase;
    var capacityPhrase = this.props.capacityPhrase;
    var duringThisTime = this.props.duringThisTime;
    var acrossTheseRoles = this.props.acrossTheseRoles;

    //Get some key phrases
    switch (referenceType.selected) {
      case "academic":
        var workWord = " to study"
        var enrolledWord = " enrolled at "
        var performanceWord = " performance"
        break;
      case "professional":
        var workWord = " to work"
        var enrolledWord = " enrolled at "
        var performanceWord = " performance"
        break;
      case "tenancy":
        var workWord = ""
        var enrolledWord = " lived at "
        var performanceWord = " conduct"
        break;
    }

    //Write the sentences:
    function writeSentence1() {
      return "I am writing to you today " + capacityPhrase + "to support "
      + applicantName[1] + " application " + newPosition + "at " + newPlace + ". "
    }

    function writeSentence2() {
      if (oldPosition !== "" || startPhrase !== "" || endPhrase !== "") {
        return applicantName[2] + enrolledWord + oldPlace + workWord + oldPosition
      + startPhrase + endPhrase + ". ";
      } else {
        return "";
      } 
    }

    function writeSentence3(yearsKnownPhrase, rolesPhrase) {
      if (yearsKnownPhrase !== "" || rolesPhrase !== "") {
        return duringThisTime + "I have known " + applicantName[0] + yearsKnownPhrase + rolesPhrase + ". "
      } else {
        return "";
      }
    }

    function writeSentence4() {
      return acrossTheseRoles + "I believe I have had a good opportunity to assess " + applicantName[1]
      + performanceWord + " and " +applicantPronouns[1] + " suitability " + newPosition + "at " + newPlace + ". "
    }

    function writeSentence5() {
      return "Please find this reference below. "
    }

    var finalParagraph = 
      writeSentence1() + writeSentence2() + writeSentence3(yearsKnownPhrase, rolesPhrase)
      + writeSentence4() + writeSentence5()

    return (
      <span>{finalParagraph}</span>
    )
  }
})


//Paragraph1 version 2
var Paragraph1v2 = React.createClass ({
  render: function() {

    //Get the information:
    var referenceType = this.props.referenceType;
    var applicantPronouns=this.props.applicantPronouns;
    var datePeriod = this.props.datePeriod;
    var applicantName = this.props.applicantName;
    var oldPlace = this.props.oldPlace;
    var oldPosition = this.props.oldPosition;
    var newPosition = this.props.newPosition;
    var newPlace = this.props.newPlace;
    var startPhrase = this.props.startPhrase;
    var endPhrase = this.props.endPhrase;
    var yearsKnownPhrase = this.props.yearsKnownPhrase;
    var rolesPhrase = this.props.rolesPhrase;
    var capacityPhrase = this.props.capacityPhrase;
    var duringThisTime = this.props.duringThisTime;
    var acrossTheseRoles = this.props.acrossTheseRoles;
    var applicantStatus = this.props.applicantStatus;

    //Get key phrases:
    switch (referenceType.selected) {
      case "academic":
        var doingWord = "studying "
        var roleWord = "this role"
        break;
      case "professional":
        var doingWord = "working "
        var roleWord = "this role"
        break;
      case "tenancy":
        var doingWord = "living "
        var roleWord = "accomodation"
        break;
    }


    //Write the sentences:
    function writeSentence1() {
      return "This is a letter to support " + applicantName[1] + " application " + newPosition 
      + "at " + newPlace + ". "
    }

    function writeSentence2() {
      return "I have known " + applicantName[0] + yearsKnownPhrase + " while " + applicantPronouns[0] 
      + applicantStatus[0] + oldPosition + " at " + oldPlace + startPhrase + ". "
    }

    function writeSentence3(yearsKnownPhrase, rolesPhrase) {
      if (yearsKnownPhrase !== "" || rolesPhrase !== "") {
        return duringThisTime + "I acted " + rolesPhrase + ". "
      } else {
        return "";
      }
    }

    function writeSentence4() {
      if (endPhrase !== "") {
        return applicantName[2] + " has been " + doingWord + "here since then " + endPhrase + ". ";
      } else {
        return "";
      }
      
    }

    function writeSentence5() {
      return "In light of this, I believe I am well positioned to offer a reference for " 
      + applicantName[1] + " application " + newPosition + " and inform you of " + applicantPronouns[1] 
      + " suitability for " + roleWord + ". This reference follows below. "
    }

    

    var finalParagraph = 
      writeSentence1() + writeSentence2() + writeSentence3(yearsKnownPhrase, rolesPhrase)
      + writeSentence4() + writeSentence5()

    return (
      <span>{finalParagraph}</span>
    )
  }
})


//Paragraph1 version 3
var Paragraph1v3 = React.createClass ({
  render: function() {
    //Get the information:
    var referenceType = this.props.referenceType;
    var applicantPronouns=this.props.applicantPronouns;
    var datePeriod = this.props.datePeriod;
    var applicantName = this.props.applicantName;
    var referee = this.props.referee;
    var oldPlace = this.props.oldPlace;
    var oldPosition = this.props.oldPosition;
    var newPosition = this.props.newPosition;
    var newPlace = this.props.newPlace;
    var startPhrase = this.props.startPhrase;
    var endPhrase = this.props.endPhrase;
    var yearsKnownPhrase = this.props.yearsKnownPhrase;
    var rolesPhrase = this.props.rolesPhrase;
    var capacityPhrase = this.props.capacityPhrase;
    var duringThisTime = this.props.duringThisTime;
    var acrossTheseRoles = this.props.acrossTheseRoles;
    var currentlyWorking = this.props.currentlyWorking;
    var applicantStatus = this.props.applicantStatus;

    //get member text
    function getMemberPhrase (jobTitle) {

      if (jobTitle !== "") {

        switch (jobTitle.charAt(0)) {
          case "A":
          case "E":
          case "I":
          case "O":
          case "U":
            return "an " + jobTitle + " at ";
          default:
            return "a " + jobTitle + " at ";
        }

      } else {

        if (referenceType.selected == "tenancy") {
          return "an affiliate of "
        } else {
          return "a member of "
        }
      }
    }

    //Get currently working text:
    function currentlyWorkingPhrase (currentlyWorking) {
      if (currentlyWorking == false) {
        return " was";
      } else {
        return " is currently";
      }
    }

    //Write the sentences:
    function writeSentence1() {
      return "As " + getMemberPhrase(referee.jobTitle) + oldPlace + ", I have known " + applicantName[0] 
      + yearsKnownPhrase + rolesPhrase + " since " + applicantPronouns[0] + applicantStatus[0] + " here" 
      + startPhrase + ". "
    }

    function writeSentence2() {
      if (oldPosition !== "" || endPhrase !== "") {
        return applicantName[2] + currentlyWorkingPhrase(currentlyWorking) + applicantStatus[1] 
        + oldPosition + endPhrase + ". "
      } else {
        return "";
      }
      
    }

    function writeSentence3() {
      return "I understand " + applicantName[0] + " is now applying " + newPosition
      + "at " + newPlace + " and has named me as a reference to support " + applicantPronouns[1] 
      + " application. "
    }

    function writeSentence4() {
      return "I am happy to do so and have provided this reference for you below. "
    }

    var finalParagraph = 
      writeSentence1() + writeSentence2() + writeSentence3() + writeSentence4()

    return (
      <span>{finalParagraph}</span>
    )
  }
})



//Paragraph 1 Compiler
//In this component, we take a load of information from state then
//put it in a format such that it can be rendered by the Paragraph 1 components:

var Paragraph1Compiler = React.createClass ({
  render: function() {

    //Get information:
    var referenceType=this.props.referenceType;
    var referenceOptions=this.props.referenceOptions
    var applicantPronouns=this.props.applicantPronouns
    var applicantName=this.props.applicantName
    var referee=this.props.referee
    var relationshipPlace=this.props.relationshipPlace
    var relationshipLength=this.props.relationshipLength
    var relationshipCapacity=this.props.relationshipCapacity
    var relationshipPosition=this.props.relationshipPosition
    var newInfo=this.props.newInfo
    var currentTime=this.props.currentTime
    var datePeriod=this.props.datePeriod
    var randomNos=this.props.randomNos
    var changeValue=this.props.changeValue

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

    //Name the old institution:
    if (this.props.relationshipPlace == "" ) {
      if (referenceType.selected == "tenancy") {
        var oldPlace = "the former premises"
      } else {
        var oldPlace = "my institution"
      }
    } else {
      var oldPlace = capitalise(this.props.relationshipPlace);
    }

    //Add space to Relationship Position ready for rendering:
    if (relationshipPosition !== "") {
      switch (referenceType.selected) {
        case "academic":
          var oldPosition = " " + capitalise(relationshipPosition);
          break;
        case "professional":
          var oldPosition = " as " + getPrefix(capitalise(relationshipPosition)) + capitalise(relationshipPosition);
          break;
        default:
          var oldPosition = "";

      }
    } else {
      var oldPosition = relationshipPosition;
    }

    //Name the new place:
    if (this.props.newInfo.place == "" ) {

      if (referenceType.selected == "tenancy") {
        var newPlace = "your premises"
      } else {
        var newPlace = "your institution"
      }
      
    } else {
      var newPlace = capitalise(this.props.newInfo.place);
    }


    //Write the position sentence
    function getNewPosition(position) {

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

    if (referenceType.selected == "tenancy") {
      var newPosition = "for residency "
    } else {
      var newPosition = getNewPosition(newInfo.position)
    }
    

    //Write the 'Capacity' sentence
    function getCapacityPhrase(jobTitle) {

      if (referenceType.selected !== "tenancy") {

        if (jobTitle !== "") {
          return "in my capacity as a " + capitalise(jobTitle) + " ";
        } else {
          return "";
        }

      } else {
        return "";
      }
        
    }

    var capacityPhrase = getCapacityPhrase(referee.jobTitle)

    //Write workNature
    function getWorkType() {
      switch (referenceType.selected) {
        case "academic":
          return " course"
        case "professional":
          return " employment"
        case "tenancy":
          return " tenancy"
      }
    }


    //Write the 'start' phrase
    var currentTime = this.props.currentTime;
    var datePeriod = this.props.datePeriod;
    var applicantPronouns = this.props.applicantPronouns;

    function getStartingWords(month, year) {
      if (year !== "" && month !== "") {
        if (year < currentTime.year) {
          return " in " + currentTime.monthList[month - 1] + " " + year;
        } else if (year == currentTime.year && month < currentTime.month) {
          return " in " + currentTime.monthList[month - 1] + " earlier this year";
        } else if (year == currentTime.year && month == currentTime.month) {
          return " this month";
        }
      }   
      else if (year !== "" && month == "") {
          if (year < currentTime.year) {
            return " in " + year;
          } else if (year == currentTime.year) {
            return " this year"
          }
      } else {
        return "";
      }
    }

    var startPhrase = getStartingWords(datePeriod.startMonth, datePeriod.startYear)


    //Write the 'end' phrase:
    function getEndingWords(month, year) {
      if (year !== "" && month !== "") {
        if (year < currentTime.year) {
          return " and completed " + applicantPronouns[1] + getWorkType() + " in " + currentTime.monthList[month - 1] + " " + year;
        } else if (year == currentTime.year && month < currentTime.month) {
          return " and completed " + applicantPronouns[1] + getWorkType() + " in " + currentTime.monthList[month - 1] + " earlier this year";
        } else if (year == currentTime.year && month == currentTime.month) {
          return " and is due to complete " + applicantPronouns[1] + getWorkType() + " this month";
        } else if (year == currentTime.year && month > currentTime.month) {
          return " and is due to complete " + applicantPronouns[1] + getWorkType() + " in " + currentTime.monthList[month - 1] + " later this year";
        } else if (year > currentTime.year) {
          return " and is due to complete " + applicantPronouns[1] + getWorkType() + " in " + currentTime.monthList[month - 1] + " " + year;
        }
      } else if (year !== "" && month =="") {
        if (year < currentTime.year) {
          return " and completed " + applicantPronouns[1] + getWorkType() + " in " + year;
        } else if (year == currentTime.year) {
          return " and is due to complete " + applicantPronouns[1] + getWorkType() + " this year";
        } else if (year > currentTime.year) {
          return " and is due to complete " + applicantPronouns[1] + getWorkType() + " in " + year;
        }
      } else {
          return ""
      }
    }

    var endPhrase = getEndingWords(datePeriod.endMonth, datePeriod.endYear)


    //Find out if they are currently working or not:
    function currentlyWorking (endMonth, endYear) {
      if (endYear !== "" && endYear < currentTime.year) {
        return false;
      } else if (endYear == currentTime.year) {
        if (endMonth < currentTime.month) {
          return false
        } else {
          return true
        }
      } else {
        return true;
      }
      
    }

    var currentlyWorking = currentlyWorking(datePeriod.endMonth, datePeriod.endYear)


    //Write the 'Years known' phrase:
    function getYearsKnown(numberYears) {
      
      var numberArray = ["","","two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];

      if (numberYears == 0) {
        return "";
      } else if (numberYears == 1) {
        return " for the last year";
      } else if (numberYears < 13) {
        return " for " + numberArray[numberYears] + " years";
      } else {
        return " for " + numberYears + " years";
      }
    }

    var yearsKnownPhrase = getYearsKnown(relationshipLength)


    //Write the 'Roles' sentence:
    //Get an array of relationship capacities based on those selected:
    var rolesArray = [];
    for (var i = 0; i < relationshipCapacity.length; i++) {
      if (relationshipCapacity[i].selected == true)
        rolesArray.push(relationshipCapacity[i].name)
    }

    function getRolesPhrase(rolesArray) {

      if (rolesArray.length == 0) {
        var prefix = "";
      } else if (rolesArray.length == 2) {
        var prefix = " as both " + applicantPronouns[1] + " ";
      } else {
        var prefix = " as " + applicantPronouns[1] + " ";
      }

      var roles = "";

      if (rolesArray.length !== 0) {
        for (var i = 0; i < rolesArray.length; i++) {
          if (i + 1 == rolesArray.length) {
            roles += rolesArray[i]
          } else if (i + 1 == rolesArray.length - 1) {
            roles += rolesArray[i] + " and "
          } else {
            roles += rolesArray[i] + ", "
          }
        }
      }

      return prefix + roles;

    }

    var rolesPhrase = getRolesPhrase(rolesArray)

    //Write 'During this time' phrase:
    if (datePeriod.startYear !== "" && datePeriod.endYear !== "") {
      var duringThisTime = "During this time, "
    } else {
      var duringThisTime = "During " + applicantPronouns[1] + " time here, ";
    }


    //Write 'Across this/these roles phrase:
    if (rolesArray.length == 1) {
      var acrossTheseRoles = "Across this role, "
    } else if (rolesArray.length > 1) {
      var acrossTheseRoles = "Across these roles, "
    } else {
      var acrossTheseRoles = "";
    }

    //Write the 'status' phrase:
    switch (referenceType.selected) {
      case "academic":
        var applicantStatus = [" enrolled to study", " enrolled to study"]
        break;
      case "tenancy":
        var applicantStatus = [" lived", " under contract to live at these premises"]
        break;
      default:
        var applicantStatus = [" enrolled to work", " enrolled to work"]
    }


    //Now decide which paragraph will be written based on the random number selected:

    switch (randomNos.paragraph1.current) {
      case 1:
        var writtenParagraph = 
        <Paragraph1v1
            referenceType={this.props.referenceType}
            applicantName={this.props.applicantName}
            applicantPronouns={this.props.applicantPronouns}
            datePeriod={this.props.datePeriod}
            referee={this.props.referee}
            oldPosition={oldPosition}
            oldPlace={oldPlace}
            newPlace={newPlace}
            newPosition={newPosition}
            startPhrase={startPhrase}
            endPhrase={endPhrase}
            yearsKnownPhrase={yearsKnownPhrase}
            rolesPhrase={rolesPhrase}
            duringThisTime={duringThisTime}
            acrossTheseRoles={acrossTheseRoles}
            capacityPhrase={capacityPhrase}
            applicantStatus={applicantStatus}
          />
        break;
      case 2:
        var writtenParagraph = 
        <Paragraph1v2
            referenceType={this.props.referenceType}
            applicantName={this.props.applicantName}
            applicantPronouns={this.props.applicantPronouns}
            datePeriod={this.props.datePeriod}
            referee={this.props.referee}
            oldPosition={oldPosition}
            oldPlace={oldPlace}
            newPlace={newPlace}
            newPosition={newPosition}
            startPhrase={startPhrase}
            endPhrase={endPhrase}
            yearsKnownPhrase={yearsKnownPhrase}
            rolesPhrase={rolesPhrase}
            duringThisTime={duringThisTime}
            acrossTheseRoles={acrossTheseRoles}
            capacityPhrase={capacityPhrase}
            applicantStatus={applicantStatus}
          />
        break;
      case 3:
        var writtenParagraph = 
        <Paragraph1v3
            referenceType={this.props.referenceType}
            applicantName={this.props.applicantName}
            applicantPronouns={this.props.applicantPronouns}
            datePeriod={this.props.datePeriod}
            referee={this.props.referee}
            oldPosition={oldPosition}
            oldPlace={oldPlace}
            newPlace={newPlace}
            newPosition={newPosition}
            startPhrase={startPhrase}
            endPhrase={endPhrase}
            yearsKnownPhrase={yearsKnownPhrase}
            rolesPhrase={rolesPhrase}
            duringThisTime={duringThisTime}
            acrossTheseRoles={acrossTheseRoles}
            capacityPhrase={capacityPhrase}
            applicantStatus={applicantStatus}
            currentlyWorking={currentlyWorking}
          />
        break;
    }


    return (
      <div className="preview-block">
        <div className="preview-text copy-body email-body" id="paragraph1">
          {writtenParagraph}
        </div>
        <PreviewTextTools
          name="paragraph1"
          randomised="true"
          editable="true"
          randomNos={this.props.randomNos}
          changeValue={this.props.changeValue}
        />
      </div>      
    )
  }
})



module.exports = Paragraph1Compiler;