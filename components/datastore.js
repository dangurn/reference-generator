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

    //We need to get different information depending on what type of reference has been selected:
    var refTypeSelected = this.props.referenceType.selected

    //Now let's get the titles and placeholders for the Form:
    switch (refTypeSelected) {

      case "academic":

        var formHeadings = {
            aboutApplicant: "About the applicant",
            applicantBackground: "The applicant's background",
            aboutReferee: "About you",
            relationship: "Your relationship with the applicant",
            performance: "The applicant's performance",
            competencies: "The applicant's competencies",
            aboutAddressee: "About the addressee",
            aboutJob: "About the new job"
          }

        var placeholders = {
          person: "applicant",
          relationshipPosition: "Course studied (E.g. BSc (Hons) Psychology)",
          relationshipPlace: "Place studied (E.g. the University of...)",
          refereeWorkPlace: "Current place of work (If different from above)",
          refereePosition: "Job Title (E.g. Senior Lecturer)",
          newInfoPosition: "Position applied for (E.g. Research Assistant)",
          newInfoPlace: "Institution applied for (E.g. the University of...)",
        }

        var relationshipCapacityNames = ["tutor", "lecturer", "module leader", "year leader", "programme leader"]

        break;

      case "professional":

        var formHeadings = {
          aboutApplicant: "About the applicant",
          applicantBackground: "The applicant's background",
          aboutReferee: "About you",
          relationship: "Your relationship with the applicant",
          performance: "The applicant's performance",
          competencies: "The applicant's competencies",
          aboutAddressee: "About the addressee",
          aboutJob: "About the new job"
        }

        var placeholders = {
          person: "applicant",
          relationshipPosition: "Position held (E.g. Office Assistant)",
          relationshipPlace: "Place of work (E.g. Company name)",
          refereeWorkPlace: "Your current place of work (If different from above)",
          refereePosition: "Job Title (E.g. Business Consultant)",
          newInfoPosition: "Position applied for (E.g. Team leader)",
          newInfoPlace: "Institution applied for (E.g. Company name)",
        }

        var relationshipCapacityNames = ["manager", "supervisor", "team leader", "colleague"]

        break;

      case "tenancy":

        var formHeadings = {
          aboutApplicant: "About the tenant",
          applicantBackground: "The previous or current tenancy",
          aboutReferee: "About you",
          relationship: "Your relationship with the tenant",
          performance: "The applicant's performance",
          competencies: "The tenant's competencies",
          aboutAddressee: "About the addressee",
          aboutJob: "About the new tenency"
        }

        var placeholders = {
          person: "tenant",
          relationshipPosition: "---",
          relationshipPlace: "The property the tenant resides/resided (E.g. 123 Fake Street)",
          refereeWorkPlace: "---",
          refereePosition: "---",
          newInfoPosition: "---",
          newInfoPlace: "The property the tenant wishes to reside in (E.g. 123 Fake Street)",
        }

        var relationshipCapacityNames = ["property owner", "letting agent", "house mate"]

        break;
    }

    //Convert relationshipCapacityNames into an array of objects (using information from state):
    var relationshipCapacityFinal = [];

    for (var i = 0; i < relationshipCapacityNames.length; i++) {
      relationshipCapacityFinal.push({
        name: relationshipCapacityNames[i], 
        selected: this.props.relationshipCapacity[i].selected
      }) 
    }

    //Get the type of Work completed:
    switch(refTypeSelected) {
      case "academic":
        var workCompletedNames = ["essay", "lab report", "project", "presentation"]
        break;
      default:
        var workCompletedNames = ["report", "project", "presentation"]
    }

    //And convert them into an array of objects (using information from state):
    var workCompleted = [];

    for (var i = 0; i < workCompletedNames.length; i++) {
      workCompleted.push({
        name: workCompletedNames[i], 
        count: this.props.work[i].count, 
        topic: this.props.work[i].topic, 
        performance: this.props.work[i].performance, 
        selected: this.props.work[i].selected, 
      }) 
    }

    //Now some more general stuff:
    //Get the name (and possessive 's') for the applicant:
    var appName = this.props.applicant.firstName
    var appNameLastLetter = appName.charAt(appName.length - 1)

    if (appName == "") {
      
      if (refTypeSelected == "tenancy") {
        var applicantName = ["the tenant", "the tenant's", "The tenant"]
      } else {
        var applicantName = ["the candidate", "the candidate's", "The candidate"]
      }
      
    } else {

      if (appNameLastLetter == "s") {
        var applicantName = [appName, appName + "'", appName]
      } else {
        var applicantName = [appName, appName + "'s", appName]
      }

    }

    //Get the pronouns for the applicant:
    if (this.props.applicant.gender == "male") {
      var applicantPronouns = ["he", "his", "him", "he is", "he has", "he seems"]
    } else if (this.props.applicant.gender == "female") {
      var applicantPronouns = ["she", "her", "her", "she is", "she has", "she seems"]
    } else {
      var applicantPronouns = ["they", "their", "them", "they are", "they have", "they seem"]
    }


    return (
      <div className="main-container">
        <FormBox
          referenceType={this.props.referenceType}
          currentTime={currentTime}
          formHeadings={formHeadings}
          placeholders={placeholders}
          applicant={this.props.applicant}
          datePeriod={this.props.datePeriod}
          referee={this.props.referee}
          relationshipLength={this.props.relationshipLength}
          relationshipCapacity={this.props.relationshipCapacity}
          relationshipCapacityFinal={relationshipCapacityFinal}
          relationshipPosition={this.props.relationshipPosition}
          relationshipPlace={this.props.relationshipPlace}
          work={workCompleted}
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
          referenceType={this.props.referenceType}
          referenceOptions={this.props.referenceOptions}
          currentTime={currentTime}
          applicant={this.props.applicant}
          applicantName={applicantName}
          applicantPronouns={applicantPronouns}
          datePeriod={this.props.datePeriod}
          referee={this.props.referee}
          relationshipLength={this.props.relationshipLength}
          relationshipCapacity={relationshipCapacityFinal}
          relationshipPosition={this.props.relationshipPosition}
          relationshipPlace={this.props.relationshipPlace}
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

      referenceOptions: {
        formal: 3,
        length: 3,
      },

      referenceType: {
        type: ["academic", "professional", "tenancy"],
        selected: "academic"
      },

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
      relationshipPlace: "",
      relationshipCapacity: [
        {selected: false},
        {selected: false},
        {selected: false},
        {selected: false},
        {selected: false}
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
        referenceType={this.state.referenceType}
        referenceOptions={this.state.referenceOptions}
        randomNos={this.state.randomNos}
        applicant={this.state.applicant}
        datePeriod={this.state.datePeriod}
        referee={this.state.referee}
        relationshipLength={this.state.relationshipLength}
        relationshipCapacity={this.state.relationshipCapacity}
        relationshipPosition={this.state.relationshipPosition}
        relationshipPlace={this.state.relationshipPlace}
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