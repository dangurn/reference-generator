//Get React:
var React = require('react');

//Get the PreviewTextTools
var PreviewTextTools = require('../resources.js').previewTextTools;


//Paragraph 1A (Introduction Overview)
var IntroductionOverview = React.createClass ({
  render: function() {

    var applicantName = this.props.applicantName;
    var referee = this.props.referee;
    var newInfo = this.props.newInfo;
    var newPlace = this.props.newPlace;

    if (this.props.relationshipPosition == "") {
      var relationshipPosition = "";
    } else {
      var relationshipPosition = " " + this.props.relationshipPosition;
    }

    //Name the referee's institution:
    if (this.props.referee.workPlace == "" ) {
      var refereeWorkPlace = "my institution"
    } else {
      var refereeWorkPlace = this.props.referee.workPlace
    }

    //Write the 'Capacity' sentence
    function capacitySentence(jobTitle) {
      if (jobTitle !== "") {
        return " in my capacity as a " + jobTitle;
      } else {
        return "";
      }
    }

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

    //Write the 'end' phrase:
    function getEndingWords(month, year) {
      if (year !== "" && month !== "") {
        if (year < currentTime.year) {
          return " and completed " + applicantPronouns[1] + " course in " + currentTime.monthList[month - 1] + " " + year;
        } else if (year == currentTime.year && month < currentTime.month) {
          return " and completed " + applicantPronouns[1] + " course in " + currentTime.monthList[month - 1] + " earlier this year";
        } else if (year == currentTime.year && month == currentTime.month) {
          return " and is due to complete " + applicantPronouns[1] + " course this month";
        } else if (year == currentTime.year && month > currentTime.month) {
          return " and is due to complete " + applicantPronouns[1] + " course in " + currentTime.monthList[month - 1] + " later this year";
        } else if (year > currentTime.year) {
          return " and is due to complete " + applicantPronouns[1] + " course in " + currentTime.monthList[month - 1] + " " + year;
        }
      } else if (year !== "" && month =="") {
        if (year < currentTime.year) {
          return " and completed " + applicantPronouns[1] + " course in " + year;
        } else if (year == currentTime.year) {
          return " and is due to complete " + applicantPronouns[1] + " course this year";
        } else if (year > currentTime.year) {
          return " and is due to complete " + applicantPronouns[1] + " course in " + year;
        }
      } else {
          return ""
      }
    }

    function writeSentence() {
      return "I am writing to you today" + capacitySentence(referee.jobTitle) + " to support " 
        + applicantName[1] + " application " + getPosition(newInfo.position) + "at " 
        + newPlace + ". " + applicantName[2] + " enrolled at " + refereeWorkPlace + " to study"
        + relationshipPosition + getStartingWords(datePeriod.startMonth, datePeriod.startYear)
        + getEndingWords(datePeriod.endMonth, datePeriod.endYear) + ". "
    }

    return (
      <span>
        {writeSentence()}
      </span>
    )
  }
})

//Paragraph 1B (Introduction Background)
var IntroductionBackground = React.createClass ({

  render: function() {

    var applicantName = this.props.applicantName;
    var applicantPronouns = this.props.applicantPronouns;
    var datePeriod = this.props.datePeriod;
    var relationshipLength = this.props.relationshipLength;
    var rolesArray = this.props.rolesArray;
   
    //Write 'During this time' phrase:
    if (datePeriod.startYear !== "" && datePeriod.endYear !== "") {
      var duringThisTime = "During this time, "
    } else {
      var duringThisTime = "";
    }

    //Write the 'Years' phrase:
    function yearsPhrase(numberYears) {
      
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

    //Write the 'Roles' sentence:
    function rolesPhrase(rolesArray) {

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
   
    function writeSentence() {
      return duringThisTime + "I have known " + applicantName[0] + yearsPhrase(relationshipLength)
      + rolesPhrase(rolesArray) + ". "
    }
    
    return (

      <span>
        {writeSentence()}  
      </span>
      
    )
  }
})

//Paragraph 1C (Introduction Relationship)
var IntroductionRelationship = React.createClass ({
  render: function() {

    var applicantName = this.props.applicantName;
    var applicantPronouns = this.props.applicantPronouns;
    var newInfo = this.props.newInfo;
    var newPlace = this.props.newPlace;
    var rolesArray = this.props.rolesArray;

    function rolesPrefix(numRoles) {
      if (numRoles == 1) {
        return "Across this role, "
      } else if (numRoles > 1) {
        return "Across these roles, "
      } else {
        return "";
      }
    }

    //Write the position phrase:
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

    function writeSentence() {
      return rolesPrefix(rolesArray.length) + "I believe I have had a good opportunity to assess " + applicantName[1] 
        + " performance and " + applicantPronouns[1] + " suitability " + getPosition(newInfo.position)
        + "at " + newPlace + ". "
    }
    
    return (
      <span>
        {writeSentence()}  
      </span>
    )
  }
})

//Paragraph 1D (Introduction Setup)
var IntroductionSetup = React.createClass ({
  render: function() {

    function writeSentence() {
      return "Please find this reference below."
    }
    
    return (
      <span>
        {writeSentence()}  
      </span>
    )
  }
})


//Paragraph 1 (Introduction)
var Paragraph1 = React.createClass({
  render: function() {

    //Name the new institution:
    if (this.props.newInfo.place == "" ) {
      var newPlace = "your institution"
    } else {
      var newPlace = this.props.newInfo.place
    }

    //Get an array of relationship capacities based on those selected:
    var rolesArray = [];
    for (var i = 0; i < this.props.relationshipCapacity.length; i++) {
      if (this.props.relationshipCapacity[i].selected == true)
        rolesArray.push(this.props.relationshipCapacity[i].name)
    } 
   
    return (

      <div className="preview-block">
        <div className="preview-text" id="rendered-paragraph1">
          <IntroductionOverview
          applicantName={this.props.applicantName}
          applicantPronouns={this.props.applicantPronouns}
          referee={this.props.referee}
          newInfo={this.props.newInfo}
          newPlace={newPlace}
          relationshipPosition={this.props.relationshipPosition}
          currentTime={this.props.currentTime}
          datePeriod={this.props.datePeriod}
          />
          <IntroductionBackground
            applicantName={this.props.applicantName}
            applicantPronouns={this.props.applicantPronouns}
            datePeriod={this.props.datePeriod}
            relationshipLength={this.props.relationshipLength}
            rolesArray={rolesArray}
          />
          <IntroductionRelationship 
            applicantName={this.props.applicantName}
            applicantPronouns={this.props.applicantPronouns}
            newInfo={this.props.newInfo}
            newPlace={newPlace}
            rolesArray={rolesArray}
          />
          <IntroductionSetup
          />
        </div>
        <PreviewTextTools 
          randomNos={this.props.randomNos}
        />
      </div>
    )
  }
})

module.exports = Paragraph1;