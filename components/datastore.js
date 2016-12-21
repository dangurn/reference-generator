//DataStore

//This is the component that manages all of the data
//All of the App's state lives in this component

//Get React
var React = require('react');

//Get both the Form and Preview components:
var FormBox = require('./form/form.js');
var PreviewBox = require('./preview/preview.js');


//Compile all of the data first of all:
var Compiler = React.createClass ({
  render: function() {

    //Get the dates
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth();
    var day = today.getDate();
    var dayWeek = today.getDay();

    var monthList = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ]

    var dayList = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ]

    var currentTime = {year: year, month: month, day: day, monthList: monthList, dayWeek: dayWeek, dayList: dayList}

    //Get the placeholders for the Form:
    var refType = this.props.refType;
    var refTypeSelected;

    for (var i = 0; i < refType.length; i++) {
      if (refType[i].selected == true) {
        var refTypeSelected = refType[i].name
      }
    }

    switch (refTypeSelected) {
      case "academic":
        var placeholders = {
          relationshipPosition: "Course studied (E.g. BSc (Hons) Psychology)",
          refereeWorkPlace: "Place of work (E.g. the University of...)",
          refereePosition: "Job Title (E.g. Senior Lecturer)",
          newInfoPosition: "Position applied for (E.g. Research Assistant)",
          newInfoPlace: "Institution applied for (E.g. the University of...)",
        }
        break;
      default:
        var placeholders = {
          relationshipPosition: "CodfgBSc (Hons) Psychology)",
          refereeWorkPlace: "Place dfgdfgUniversity of...)",
          refereePosition: "Job Tidfgdfgior Lecturer)",
          newInfoPosition: "Positiondfgdfgdfgsearch Assistant)",
          newInfoPlace: "Institudfgdfgdfg University of...)",
        }
    }
    

    //Get the name (and possessive 's') for the applicant:
    var appName = this.props.applicant.firstName
    var appNameLastLetter = appName.charAt(appName.length - 1)

    if (appName == "") {
      var applicantName = ["the candidate", "the candidate's", "The candidate"]
    } else {
      if (appNameLastLetter == "s") {
        var applicantName = [appName, appName + "'", appName]
      } else {
        var applicantName = [appName, appName + "'s", appName]
      }
    }

    //Get the pronouns for the applicant:
    if (this.props.applicant.gender == "male") {
      var applicantPronouns = ["he", "his", "him", "he is", "he has"]
    } else if (this.props.applicant.gender == "female") {
      var applicantPronouns = ["she", "her", "her", "she is", "she has"]
    } else {
      var applicantPronouns = ["they", "their", "them", "they are", "they have"]
    }


    return (
      <div className="main-container">
        <FormBox
          refType={this.props.refType}
          currentTime={currentTime}
          placeholders={placeholders}
          applicant={this.props.applicant}
          datePeriod={this.props.datePeriod}
          referee={this.props.referee}
          relationshipLength={this.props.relationshipLength}
          relationshipCapacity={this.props.relationshipCapacity}
          relationshipPosition={this.props.relationshipPosition}
          work={this.props.work}
          skillsCommunication={this.props.skillsCommunication}
          skillsAttitude={this.props.skillsAttitude}
          skillsOther={this.props.skillsOther}
          competencies={this.props.competencies}
          newInfo={this.props.newInfo}
          addressee={this.props.addressee}
          changeValue={this.props.changeValue}
        />

        <PreviewBox
          randomNos={this.props.randomNos}
          currentTime={currentTime}
          applicant={this.props.applicant}
          applicantName={applicantName}
          applicantPronouns={applicantPronouns}
          datePeriod={this.props.datePeriod}
          referee={this.props.referee}
          relationshipLength={this.props.relationshipLength}
          relationshipCapacity={this.props.relationshipCapacity}
          relationshipPosition={this.props.relationshipPosition}
          work={this.props.work}
          skillsCommunication={this.props.skillsCommunication}
          skillsAttitude={this.props.skillsAttitude}
          skillsOther={this.props.skillsOther} 
          competencies={this.props.competencies}
          newInfo={this.props.newInfo}
          addressee={this.props.addressee}
          changeValue={this.props.changeValue} 
        />
        
      </div>
    )
  }
})

//This is the component where all of our data (state) lives:
var DataStore = React.createClass ({

  generateRandomNo: function(max) {
    return Math.floor(Math.random() * max) + 1
  },

  getInitialState: function() {

    return {

      randomNos: {
        date: {current: this.generateRandomNo(3), max: 3},
        greeting: {current: this.generateRandomNo(3), max: 3},
        subject: {current: this.generateRandomNo(1), max: 1},
        paragraph1: {current: this.generateRandomNo(3), max: 3},
        paragraph2: {current: this.generateRandomNo(3), max: 3},
        paragraph3: {current: this.generateRandomNo(3), max: 3},
        paragraph4: {current: this.generateRandomNo(3), max: 3},
        signature: {current: this.generateRandomNo(3), max: 3},
      },

      refType: [
        {name: "academic", selected: true},
        {name: "professional", selected: false},
        {name: "personal", selected: false}
      ],

      anonymousName: false,
      anonymousGender: false,

      applicant: {
        firstName: "",
        lastName: "",
        gender: "",
        name: "",
        pronouns: []
      },

      datePeriod: {
        startYear: "",
        startMonth: "",
        endYear: "",
        endMonth: ""
      },

      referee: {
        titleList: ["Mr", "Mrs", "Ms", "Miss", "Dr", "Prof"],
        title: "",
        firstName: "",
        lastName: "",
        workPlace: "",
        jobTitle: ""
      },

      relationshipLength: 0,
      relationshipPosition: "",
      relationshipCapacity: [
        {name: "tutor", selected: false},
        {name: "lecturer", selected: false},
        {name: "module leader", selected: false},
        {name: "year leader", selected: false},
        {name: "programme leader", selected: false}
      ],

      skillsCommunication: [
        {name: "engages with others", selected: false},
        {name: "works independently", selected: false},
        {name: "works well in groups", selected: false}
      ],

      skillsAttitude: [
        {name: "enthusiastic", selected: false},
        {name: "uses initiative", selected: false},
        {name: "positive attitude", selected: false}
      ],

      skillsOther: [
        {name: "time management", selected: false},
        {name: "presentation skills", selected: false},
        {name: "academic writing", selected: false}
      ],
      
      competencies: [
        {name: "friendly", selected: false},
        {name: "hard-working", selected: false},
        {name: "diligent", selected: false}
      ],

      work: [
        {name: "essay", count: 1, topic: "", performance: 0, selected: false},
        {name: "lab report", count: 1, topic: "", performance: 0, selected: false},
        {name: "project", count: 1, topic: "", performance: 0, selected: false},
        {name: "presentation", count: 1, topic: "", performance: 0, selected: false},
      ],

      addressee: {
        titleList: ["Mr", "Mrs", "Ms", "Miss", "Dr", "Prof"],
        title: "",
        firstName: "",
        lastName: "",
      },

      newInfo: {
        position: "",
        place: "",
        suitable: false
      },
     
    }
  },

  //Change value states from Input changes:
  changeValue: function (newState) {
    this.setState (newState)
  },

  render: function() {

    return (
      <Compiler
        refType={this.state.refType}
        randomNos={this.state.randomNos}
        applicant={this.state.applicant}
        datePeriod={this.state.datePeriod}
        referee={this.state.referee}
        relationshipLength={this.state.relationshipLength}
        relationshipCapacity={this.state.relationshipCapacity}
        relationshipPosition={this.state.relationshipPosition}
        work={this.state.work}
        skillsCommunication={this.state.skillsCommunication}
        skillsAttitude={this.state.skillsAttitude}
        skillsOther={this.state.skillsOther}
        competencies={this.state.competencies}
        newInfo={this.state.newInfo}
        addressee={this.state.addressee}
        changeValue={this.changeValue}
      />
    )
  }
})

module.exports = DataStore;

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