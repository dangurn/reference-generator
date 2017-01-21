//PreviewBox

//There are two parts to the Preview Box component:
//The <PreviewPage /> renders all of the data as text
//The <PreviewToolbar /> houses some tools (copy, email buttons. etc)

//Get React:
var React = require('react');


//Now we'll get some resources:

//Get Buttons for the Preview Toolbar:
var EditButton = require('./resources.js').editButton;
var EmailButton = require('./resources.js').emailButton;
var CopyButton = require('./resources.js').copyButton;

//Get each part of the reference for the Preview Page:
var DateStamp = require('./header/header.js').dateStamp;
var Greeting = require('./header/header.js').greeting;
var SubjectHeading = require('./header/header.js').subjectheading;

var Paragraph1Compiler = require('./paragraph1/paragraph1.js');
var Paragraph2 = require('./paragraph2/paragraph2.js');
var Paragraph3 = require('./paragraph3/paragraph3.js');
var Paragraph4Compiler = require('./paragraph4/paragraph4.js');

var Signature = require('./footer/footer.js');


//Now let's compile everything in the Preview Container:

//Options to allow users to select how formal and concise they want the reference to be:
var PreviewOptions = React.createClass ({

  handleChange: function(e) {

    //Get Object from props:
    var initialObject = this.props.referenceOptions;
    var newObject = copy(initialObject);

    var attributeName = e.target.name;
    var newValue = e.target.value;

    newObject[attributeName] = newValue;

    var newState={}
    newState.referenceOptions = newObject
    this.props.changeValue(newState)

  },

  render: function() {
    return (
      <div className="pane-header">
        <span>Formal</span>
        <input name="formal" type="range" min="1" max="5" value={this.props.referenceOptions.formal} onChange={this.handleChange}/>
        <span>Length</span>
        <input name="length" type="range" min="1" max="5" value={this.props.referenceOptions.length} onChange={this.handleChange}/>
      </div>
    )
  }
})

//The Preview Page:
var PreviewPage = React.createClass ({
  render: function() {

    return (

      <div className="preview-page">

        <DateStamp 
          currentTime={this.props.currentTime}
          randomNos={this.props.randomNos}
          changeValue={this.props.changeValue}
        />
        <Greeting 
          referenceOptions={this.props.referenceOptions}
          addressee={this.props.addressee}
          randomNos={this.props.randomNos}
          changeValue={this.props.changeValue}
        />
        <SubjectHeading
          referenceOptions={this.props.referenceOptions}
          applicant={this.props.applicant}
          randomNos={this.props.randomNos}
          changeValue={this.props.changeValue}
        />
        <Paragraph1Compiler
          referenceType={this.props.referenceType}
          referenceOptions={this.props.referenceOptions}
          applicantPronouns={this.props.applicantPronouns}
          applicantName={this.props.applicantName}
          referee={this.props.referee}
          relationshipPlace={this.props.relationshipPlace}
          relationshipLength={this.props.relationshipLength}
          relationshipCapacity={this.props.relationshipCapacity}
          relationshipPosition={this.props.relationshipPosition}
          newInfo={this.props.newInfo}
          currentTime={this.props.currentTime}
          datePeriod={this.props.datePeriod}
          randomNos={this.props.randomNos}
          changeValue={this.props.changeValue}
        />
        <Paragraph2
          referenceOptions={this.props.referenceOptions}
          work={this.props.work}
          applicantPronouns={this.props.applicantPronouns}
          applicantName={this.props.applicantName}
          referee={this.props.referee}
          randomNos={this.props.randomNos}
          changeValue={this.props.changeValue}
        />
        <Paragraph3
          referenceOptions={this.props.referenceOptions}
          skillsCommunication={this.props.skillsCommunication}
          skillsAttitude={this.props.skillsAttitude}
          skillsOther={this.props.skillsOther}
          competencies={this.props.competencies}
          applicantName={this.props.applicantName}
          applicantPronouns={this.props.applicantPronouns}
          relationshipPlace={this.props.relationshipPlace}
          referee={this.props.referee}
          randomNos={this.props.randomNos}
          changeValue={this.props.changeValue}
        />
        <Paragraph4Compiler 
          referenceOptions={this.props.referenceOptions}
          applicantName={this.props.applicantName}
          applicantPronouns={this.props.applicantPronouns}
          relationshipPlace={this.props.relationshipPlace}
          newInfo={this.props.newInfo}
          skillsCommunication={this.props.skillsCommunication}
          skillsAttitude={this.props.skillsAttitude}
          skillsOther={this.props.skillsOther}
          work={this.props.work}
          randomNos={this.props.randomNos}
          changeValue={this.props.changeValue}
        />
        <Signature
          referenceOptions={this.props.referenceOptions}
          referee={this.props.referee}
          randomNos={this.props.randomNos}
          changeValue={this.props.changeValue}
        />
      </div>
    )
  }
});

//The Preview Toolbar:
var PreviewToolbar = React.createClass ({
  render: function() {
    return (
      <div className="pane-toolbar">
        <EditButton />
        <CopyButton />
        <EmailButton />
      </div>
    )
  }
})

//The Preview Box:
var PreviewBox = React.createClass ({
  render: function() {
    return (
      <div id="preview-container" className="pane-container">
        <PreviewOptions
          referenceOptions={this.props.referenceOptions}
          changeValue={this.props.changeValue}
        />
        <PreviewPage 
          referenceType={this.props.referenceType}
          referenceOptions={this.props.referenceOptions}
          currentTime={this.props.currentTime}
          applicant={this.props.applicant}
          applicantName={this.props.applicantName}
          applicantPronouns={this.props.applicantPronouns}
          datePeriod={this.props.datePeriod}
          referee={this.props.referee}
          relationshipLength={this.props.relationshipLength}
          relationshipCapacity={this.props.relationshipCapacity}
          relationshipPosition={this.props.relationshipPosition}
          relationshipPlace={this.props.relationshipPlace}
          work={this.props.work}
          skillsCommunication={this.props.skillsCommunication}
          skillsAttitude={this.props.skillsAttitude}
          skillsOther={this.props.skillsOther} 
          competencies={this.props.competencies}
          newInfo={this.props.newInfo}
          addressee={this.props.addressee}
          randomNos={this.props.randomNos}
          changeValue={this.props.changeValue}
        />
        <PreviewToolbar />
      </div>
    )
  }
})


module.exports = PreviewBox;

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