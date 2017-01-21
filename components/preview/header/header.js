//Get React:
var React = require('react');

//Get the PreviewTextTools
var PreviewTextTools = require('../resources.js').previewTextTools;


//Date Stamp
var DateStamp = React.createClass({

  render: function () {

    var currentTime = this.props.currentTime;

    function dateSuffix(day) {
        switch (day) {
            case 1:
            case 21:
            case 31:
                return "st"
            case 2:
            case 22:
                return "nd"
            case 3:
            case 23:
                return "rd"
            default:
                return "th"
        };
    };

    function writeSentence(randomNo) {
      switch (randomNo) {
        case 1:
          return currentTime.day + dateSuffix(currentTime.day) + " " 
            + currentTime.monthList[currentTime.month] + " " + currentTime.year;
        case 2:
          return currentTime.dayList[currentTime.dayWeek] + " " + currentTime.day + dateSuffix(currentTime.day) + " " 
            + currentTime.monthList[currentTime.month] + " " + currentTime.year;
        case 3:
          return currentTime.monthList[currentTime.month] + " " + currentTime.day + dateSuffix(currentTime.day) + " " + currentTime.year;
      }  
    }

    return (

      <div className="preview-block">
        <div className="preview-text copy-body" id="date">
          {writeSentence(this.props.randomNos.date.current)}
        </div>
        <PreviewTextTools 
          randomNos={this.props.randomNos}
          name="date"
          randomised="true"
          editable="false"
          changeValue={this.props.changeValue}
        />
      </div>
    )
  }
});

//Greeting
var Greeting = React.createClass ({
  render: function() {

    var addressee = this.props.addressee;

    function getName(title, firstName, lastName) {

      if (firstName !== "" && title !== "" && lastName !== "") {
        return title + " " + firstName + " " + lastName
      } else if (firstName == "" && title !== "" && lastName !== "") {
        return title + " " + lastName
      } else if (firstName !== "" && title == "") {
        return firstName + " " + lastName
      } else if (firstName !== "" && title !== "") {
        return firstName
      } else {
        return "Whom it may concern"
      }
    }

    function writeSentence() {
      return "Dear " + getName(addressee.title, addressee.firstName, addressee.lastName) + ","
    }

    return (
      <div className="preview-block">
        <div className="preview-text copy-body email-body" id="greeting">
          {writeSentence()}
        </div>
        <PreviewTextTools 
          randomNos={this.props.randomNos}
          name="greeting"
          randomised="false"
          editable="false"
          changeValue={this.props.changeValue}
        />
      </div>
    )
  }
});

//Subject Heading
var SubjectHeading = React.createClass ({

  render: function() {

    var applicantName = getName(this.props.applicant)

    function getName(nameObj) {
      if (nameObj.firstName == "") {
        return "Applicant"
      } else {
        return nameObj.firstName + " " + nameObj.lastName
      } 
    }

    function writeSentence() {
      return "Re: Reference for " + applicantName
    }

    return (
      <div className="preview-block">
        <div className="preview-text copy-body" id="subject">
          <b>{writeSentence()}</b>
        </div>
        <PreviewTextTools 
          randomNos={this.props.randomNos}
          name="subject"
          randomised="false"
          editable="false"
          changeValue={this.props.changeValue}
        />
      </div>
    )
  }
})



module.exports = {
    dateStamp: DateStamp,
    greeting: Greeting,
    subjectheading: SubjectHeading
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