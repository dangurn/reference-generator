//PreviewBox

//There are two parts to the PreviewBpx:
//The first is the <PreviewPage /> which renders all of the data as text
//The second is the <PreviewToolbar /> which houses some tools (copy, email. etc)

//Get React:
var React = require('react');

//Get all the SVG files we need:
var EditSVG = require('../resources/svg.js').editSVG;
var CopySVG = require('../resources/svg.js').copySVG;
var EmailSVG = require('../resources/svg.js').emailSVG;
var RefreshSVG = require('../resources/svg.js').refreshSVG;


//Email Button:
var EmailButton = React.createClass ({

  buildEmailLink() {

    //Let's pull all the text we need from the elements in the Preview:
    var subject = document.getElementById('rendered-subject').textContent;
    var greeting = document.getElementById('rendered-greeting').textContent;
    var paragraph1 = document.getElementById('rendered-paragraph1').textContent;
    var paragraph2 = document.getElementById('rendered-paragraph2').textContent;
    var paragraph3 = document.getElementById('rendered-paragraph3').textContent;
    var paragraph4 = document.getElementById('rendered-paragraph4').textContent;
    var signaturePhrase = document.getElementById('rendered-signature-phrase').textContent;
    var signatureName = document.getElementById('rendered-signature-name').textContent;
    var signatureTitle = document.getElementById('rendered-signature-title').textContent;
    var signaturePlace = document.getElementById('rendered-signature-place').textContent;

    //And parse them into email (URI) format:
    var parsedSubject = encodeURIComponent(subject);
    var parsedGreeting = encodeURIComponent(greeting);
    var parsedParagraph1 = encodeURIComponent(paragraph1);
    var parsedParagraph2 = encodeURIComponent(paragraph2);
    var parsedParagraph3 = encodeURIComponent(paragraph3);
    var parsedParagraph4 = encodeURIComponent(paragraph4);
    var parsedSignaturePhrase = encodeURIComponent(signaturePhrase);
    var parsedSignatureName = encodeURIComponent(signatureName);
    var parsedSignatureTitle = encodeURIComponent(signatureTitle);
    var parsedSignaturePlace = encodeURIComponent(signaturePlace);

    //Now we'll find the email button link:
    var emailButton = document.getElementById('email-button');

    //And attach an href attribute to it with this information:
    emailButton.href = "mailto:someone@example.com"
      + "?Subject=" + parsedSubject
      + "&body=" + parsedGreeting + "%0D%0A" + "%0D%0A" 
        + parsedParagraph1 + "%0D%0A" + "%0D%0A"
        + parsedParagraph2 + "%0D%0A" + "%0D%0A"
        + parsedParagraph3 + "%0D%0A" + "%0D%0A"
        + parsedParagraph4 + "%0D%0A" + "%0D%0A"
        + parsedSignaturePhrase + "%0D%0A" + "%0D%0A"
        + parsedSignatureName + "%0D%0A"
        + parsedSignatureTitle + "%0D%0A" 
        + parsedSignaturePlace + "%0D%0A" 

  },

  //We want this to fire when the component first loads:
  componentDidMount() {
    this.buildEmailLink()
  },

  //And every time it's updated:
  componentDidUpdate() {
    this.buildEmailLink();
  },
  
  render: function() {
    return (
      <a id="email-button">
        <div className="toolbar-button">
          <EmailSVG />
          Email
        </div>
      </a>
    )
  }
})

//The Copy Button:
var CopyButton = React.createClass ({


  copyToClipboard() {

    //Let's pull all the text we need from the elements in the Preview:
    var subject = document.getElementById('rendered-subject').textContent;
    var greeting = document.getElementById('rendered-greeting').textContent;
    var paragraph1 = document.getElementById('rendered-paragraph1').textContent;
    var paragraph2 = document.getElementById('rendered-paragraph2').textContent;
    var paragraph3 = document.getElementById('rendered-paragraph3').textContent;
    var paragraph4 = document.getElementById('rendered-paragraph4').textContent;
    var signaturePhrase = document.getElementById('rendered-signature-phrase').textContent;
    var signatureName = document.getElementById('rendered-signature-name').textContent;
    var signatureTitle = document.getElementById('rendered-signature-title').textContent;
    var signaturePlace = document.getElementById('rendered-signature-place').textContent;

    var signatureCombined = [signatureName, signatureTitle, signaturePlace].join("\n");

    var finalText = [subject, greeting, paragraph1, paragraph2, paragraph3, paragraph4, signaturePhrase, signatureCombined].join("\n\n");

    copyTextToClipboard(finalText);

  },

  render: function() {

    return (
      <div className="toolbar-button" onClick={this.copyToClipboard}>
        <CopySVG />
        Copy
      </div>
    )
  }
})



//First we need a generic toolbar to appear against every paragraph
var PreviewTextTools = React.createClass ({
  render: function() {
    return (
      <div className="preview-tools">
        <RefreshSVG />
      </div>
    )
  }
})


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

    function writeSentence() {
      return currentTime.day + dateSuffix(currentTime.day) + " " 
      + currentTime.monthList[currentTime.month] + " " + currentTime.year
    }

    return (

      <div className="preview-block">
        <div className="preview-text">
          {writeSentence()}
        </div>
        <PreviewTextTools />
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
        <div className="preview-text" id="rendered-greeting">
          {writeSentence()}
        </div>
        <PreviewTextTools />
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
        <div className="preview-text" id="rendered-subject">
          <b>{writeSentence()}</b>
        </div>
        <PreviewTextTools />
      </div>
    )
  }
})

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
        <PreviewTextTools />
      </div>
    )
  }
})


//Paragraph 2A (Work Overview)
var WorkOverview = React.createClass ({
  render: function() {

    var workArray=this.props.workArray;
    var applicantName=this.props.applicantName;
    var applicantPronouns=this.props.applicantPronouns;

    //Generate words for the sentence
    switch (workArray.length) {
      case 0:
        var completedWorkText = "some work";
        var listWorkText = "";
        break;
      case 1:
        var completedWorkText = workArray[0].prefix + " " + workArray[0].name;
        var listWorkText = "";
        break;
      default:
        var completedWorkText = "a series of work";
        var listWorkText = ", including ";

          for (var i = 0; i < workArray.length; i++) {
            if (i + 1 == workArray.length) {
              listWorkText += workArray[i].prefix + " " + workArray[i].name
            } else if (i + 1 == workArray.length - 1) {
              listWorkText += workArray[i].prefix + " " + workArray[i].name + " and "
            } else {
              listWorkText += workArray[i].prefix + " " + workArray[i].name + ", "
            }
          } 
    }

    function writeSentence() {
      return "Throughout " + applicantPronouns[1] + " time here, " + applicantName[0] + " has completed "
        + completedWorkText + " for me" + listWorkText + ". "
    }

    return (
      <span>
        {writeSentence()}
      </span>
    )
  }
})

//Paragraph 2B (Work Descriptions)
var WorkDescribe = React.createClass ({
  render: function () {

    var applicantName = this.props.applicantName;
    var applicantPronouns = this.props.applicantPronouns;

    //First up, we need to sort the work completed by how well they've done:
    var work = copy(this.props.work);

    work.sort(function(obj1, obj2) {
      return obj2.performance - obj1.performance;
      }
    )

    var workSorted = [];
    
    for (var i = 0; i < work.length; i++) {
      if (work[i].selected == true) {
        workSorted.push(work[i])
      }
    }     

    //We will return one sentence for each piece of work they have completed
    //Let's start by creating an array to store all of our sentences:
    var sentenceArray = [];
    
    //And now we're going to push sentences to this array, one by one:
    //However, the type of sentence we push depends on how similar their performance was across work:

    for (var i = 0; i < workSorted.length; i++) {

      if (i == 0) {
        sentenceArray.push(getFirstSentence(
          i + 1, 
          workSorted.length,
          workSorted[i].name,
          workSorted[i].count,
          workSorted[i].topic,
          workSorted[i].performance,
          ));

      } else if (workSorted.length > 2 && (i + 1) == workSorted.length) {
        sentenceArray.push(getLastSentence(
          i + 1, 
          workSorted.length,
          workSorted[i].name,
          workSorted[i].count,
          workSorted[i].topic,
          workSorted[i].performance,
          ));

      } else if (work[i].performance == work[i-1].performance) {
        sentenceArray.push(getSimilarSentence(
          i + 1, 
          workSorted.length, 
          workSorted[i].name,
          workSorted[i].count,
          workSorted[i].topic,
          workSorted[i].performance,
          ));

      } else {
        sentenceArray.push(getNormalSentence(
          i + 1, 
          workSorted.length, 
          workSorted[i].name,
          workSorted[i].count,
          workSorted[i].topic,
          workSorted[i].performance,
          ));
      }
    }

    //Here's the first sentence:

    function getFirstSentence(i, total, name, count, topic, performance) {

      if (total > 1) {
        var firstly = "Firstly, the ";
      } else {
        var firstly = "The ";
      }

      if (count > 1) {
        var thisWord = " these"
        var wasWord = " were"
      } else {
        var thisWord = " this"
        var wasWord = " was"
      }

      var prefixWords = ["", "one ", "two ", "three ", "four ", "five ", "six ", "seven ", "eight ", "nine "];

      return firstly + getName(name, count) + " " + applicantName[0] + " produced"  
       + getTopic(topic) + wasWord + getPerformance(performance) + ". "

    }

    //Here's the normal sentence:

    function getNormalSentence(i, total, name, count, topic, performance) {

      if (count > 1) {
        var thisWord = " these"
        var wasWord = " were"
      } else {
        var thisWord = " this"
        var wasWord = " was"
      }

      var prefixWords = ["", "a ", "two ", "three ", "four ", "five ", "six ", "seven ", "eight ", "nine "];

      switch (getRandomNumber(3)) {
        case 1:
          return "The " + getName(name, count) + " " + applicantName[0] 
            + " completed for me " + getTopic(topic) + wasWord + getPerformance(performance) + ". ";
        case 2:
          return "Having seen " + applicantPronouns[1] + getName(name, count) + getTopic(topic)
          + " too, I can confirm that " + thisWord + wasWord + getPerformance(performance)
          + ". ";
        case 3:
          return getCapital(applicantPronouns[1]) + " " + getName(name, count) + " "
          + getTopic(topic) + wasWord + getPerformance(performance) + ". ";
       }
      
    }

    //Here's the 'similar' sentence:

    function getSimilarSentence(i, total, name, count, topic, performance) {

      if (count > 1) {
        var thisWord = " these"
        var wasWord = " were"
      } else {
        var thisWord = " this"
        var wasWord = " was"
      }

      var prefixWords = ["", "a ", "two ", "three ", "four ", "five ", "six ", "seven ", "eight ", "nine "];

      switch (getRandomNumber(4)) {
        case 1:
          return applicantName[2] + " maintained this standard in " + applicantPronouns[1] + " "
            + getName(name, count) + getTopic(topic) + " which" + wasWord + " also" 
            + getPerformance(performance) + ". "
        case 2:
          return applicantName[2] + " also produced " + prefixWords[count] + getName(name, count) 
            + " for me" + getTopic(topic) + " and" + thisWord + ", similarly," + wasWord  
            + getPerformance(performance) + ". "
        case 3:
          return "This level of quality was also evident in " + applicantPronouns[1] + " " 
            + getName(name, count) + getTopic(topic) + " which, again, " + wasWord 
            + getPerformance(performance) + ". "
        case 4:
          return "Similarly, I believe " + applicantPronouns[1] + getName(name, count) + getTopic(topic) 
            + " matched this quality. ";
      }
    }

    //Here's the final sentence:

    function getLastSentence(i, total, name, count, topic, performance) {

      if (count > 1) {
        var thisWord = " these"
        var wasWord = " were"
      } else {
        var thisWord = " this"
        var wasWord = " was"
      }

      var prefixWords = ["", "one ", "two ", "three ", "four ", "five ", "six ", "seven ", "eight ", "nine "];

      return "Lastly, I can confirm that " + applicantPronouns[1] + " " + topic + " " 
        + getName(name, count) + wasWord + getPerformance(performance) + ". "

    }

    //All of these sentences depend on a few little details
    //We can get these from the functions below:

    function getRandomNumber(maxNo) {
      return Math.floor(Math.random() * maxNo) + 1  
    }

    function getName(name, count) {

      if (count > 1) {
        return name + "s";
      } else {
        return name;
      }
    }

    function getTopic(topic) {

      if (topic !== "") {
        switch (getRandomNumber(3)) {
          case 1:
            return " on the topic of " + topic;
          case 2:
            return " in the area of " + topic;
          case 3:
            return " on " + topic;

        }        
      } else {
        return "";
      }

    }

    function getPerformance(performance) {

      var randomNo = getRandomNumber(3) - 1;

      var performanceWord = [
          ["completed as required", "completed as required", "completed as required"],
          ["completed", "completed as expected", "completed"],
          ["acceptable", "satisfactory", "completed to a satisfactory standard"],
          ["good", "completed well", "of a high standard", "completed to a high standard"],
          ["excellent", "extremely good", "completed extremely well", "of a very high standard"]
      ];

      var array = performanceWord[performance];
      
      return " " + array[randomNo];

    }

    function getCapital(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
      <span>
        {sentenceArray}
      </span>
    )
  }
})

//Paragraph 2C (Work Summary)
var WorkSummary = React.createClass ({
  render: function() {

    var applicantName = this.props.applicantName;
    var applicantPronouns = this.props.applicantPronouns;
    var work = this.props.work;
    var workArray = this.props.workArray;

    //We want out more about the candidate's range of scores:
    //Let's put the scores in an array

    var overallPerformance = [];

    for (var i = 0; i < work.length; i++) {
      if (work[i].performance !== 0 && work[i].selected == true) {
        overallPerformance.push(parseInt(work[i].performance))
      }
    }

    //Get an average value:
    var total = 0;
    for (var i = 0; i < overallPerformance.length; i++) {
      total += overallPerformance[i]
    }

    if (total !== 0) {
      var meanPerformance = total / overallPerformance.length;
    } else {
      var meanPerformance = 0;
    }

    //Get the highest, lowest grade, and a range.
    if (overallPerformance.length !== 0) {
      var performanceHighest = Math.max.apply(Math, overallPerformance);
      var performanceLowest = Math.min.apply(Math, overallPerformance);
      var performanceRange = performanceHighest - performanceLowest;
    } else {
      var performanceHighest = 0;
      var performanceLowest = 0;
      var performanceRange = 0;
    }   

    //Use the word 'overall' if there's more than one piece of work.
    if (workArray.length > 1) {
      var overallPrefix = "Overall,";
    } else {
      var overallPrefix = "";
    }

    //Now let's generate some words and sentences:
    function getHighest(performanceHighest) {
      var workHighest = [
        " as expected",
        " as expected",
        " to an acceptable standard",
        " to a good standard",
        " to an excellent standard"
      ];
      return workHighest[performanceHighest];
    }

    function getConsistency(performanceRange) {
      if (workArray.length > 1) {
        if (performanceRange <= 1 && performanceLowest > 1) {
          return " and maintain this standard with high consistency";
        } else if (performanceRange <=2 && performanceLowest > 1) {
          return " and maintain this standard with some consistency";
        } else {
          return "";
        }
      } else {
        return "";
      }
    };

    function getOverallStandard(meanPerformance) {
      var workStandard = [
        " completed as expected", 
        " completed as expected",
        " satisfactory", 
        " very good",
        " outstanding"
      ];
      return workStandard[meanPerformance]
    }


    function writeSentence() {
      return "In general, it is clear that " + applicantName[0] + " is capable of producing work"
        + getHighest(performanceHighest) + getConsistency(performanceRange, performanceLowest) + ". "
        + overallPrefix + " I have found that the work " + applicantName[0] + " has produced has been"
        + getOverallStandard(Math.floor(meanPerformance)) + ". "
    }

    return (
      <span>
        {writeSentence()}
      </span>
    )
  }
})

//Paragraph 2 (Work completed)
var Paragraph2 = React.createClass ({
  render: function() {

    var work = this.props.work;

    //Now let's put the work done in a simple array:
    function getPhrase(name, count) {
      if (count == 1) {
        switch (name.charAt(0)) {
          case "a":
          case "e":
          case "i":
          case "o":
          case "u":
            return {prefix: "an", name: name}
          default:
            return {prefix: "a", name: name}
        }
      } else {
        var number = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
        return {prefix: number[count], name: name + "s"};
      }
    }

    //Now we can create the array:
    var workArray = [];

    for (var i = 0; i < work.length; i++) {
      if (work[i].selected == true) {
        workArray.push (getPhrase(work[i].name, work[i].count))
      }
    }

    return ( 
      <div className="preview-block">
        <div className="preview-text" id="rendered-paragraph2">
          <WorkOverview 
          applicantName={this.props.applicantName}
          applicantPronouns={this.props.applicantPronouns}
          workArray={workArray}
          /> 
          <WorkDescribe
            applicantName={this.props.applicantName}
            applicantPronouns={this.props.applicantPronouns}
            work={this.props.work}
          />
          <WorkSummary 
            applicantName={this.props.applicantName}
            applicantPronouns={this.props.applicantPronouns}
            work={this.props.work}
            workArray={workArray}
          />
        </div>
        <PreviewTextTools />
      </div>
    )
  }
})


//Paragraph 3A (Skills - intro)
var SkillsIntroduction = React.createClass ({
  render: function() {

    var applicantName = this.props.applicantName;
    var applicantPronouns = this.props.applicantPronouns;
    var referee = this.props.referee;
    var skillsCount = this.props.skillsCount;

    function getrefereeWorkPlace(workplace) {
      if (workplace == "" ) {
        return "my institution"
      } else {
        return referee.workPlace;
      }
    }

    function getSkills(skillsCount) {
      if (skillsCount == 0) {
        return "";
      } else {
        return ", and I have noticed that " + applicantPronouns[4] + " exhibited a " + skillsDescribe(skillsCount)
          + " of these during " + applicantPronouns[1] + " time here."
      }

      function skillsDescribe(skillsCount) {
        if (skillsCount < 3) {
          return "few"
        } else if (skillsCount < 5) {
          return "range"
        } else if (skillsCount < 9) {
          return "large range"
        }
      }
    }

    function writeSentence() {
      return "Studying at " + getrefereeWorkPlace(referee.workPlace) + " has required " + applicantName[0] 
        + " to exercise a variety of skills" + getSkills(skillsCount)
    }

    return (
      <span>
        {writeSentence()}
      </span>
    )
  }
})

//Paragraph 3B (Skills - communication)
var SkillsCommunication = React.createClass ({
  render: function() {

    var applicantName = this.props.applicantName;
    var applicantPronouns = this.props.applicantPronouns;
    var skillsCommunication = this.props.skillsCommunication;

    //Write communication skills sentence:
    //0 = engages with others, 1 = works independently, 2 = works well in groups.
    function writeSkillsCommunication1(skills) {
      if (skills[0].selected == true) {
        if (skills[1].selected == true || skills[2].selected == true) {
          return " engages well with others and";
        } else {
          return " engages well with others"
        }
      } else {
        return "";
      }
    }

    function writeSkillsCommunication2(skills) {
      if (skills[1].selected == true && skills[2].selected == true) {
        return " is capable of working independently as well as in groups";
      } else if (skills[1].selected == true && skills[2].selected == false) {
        return " is strongest when working independently";
      } else if (skills[1].selected == false && skills[2].selected == true) {
        return " is strongest when working in a group";
      } else {
        return "";
      }
    }

    function writeSentence(skillsCommunication) {
      if (
      skillsCommunication[0].selected == true || 
      skillsCommunication[1].selected == true || 
      skillsCommunication[2].selected == true) {
        return " In terms of communication skills, it is clear that " 
        + applicantName[0] 
        + writeSkillsCommunication1(skillsCommunication) 
        + writeSkillsCommunication2(skillsCommunication)
        + ".";
      } else {
        return "";
      }
    }
    
    return (
      <span>
        {writeSentence(skillsCommunication)}
      </span>
    )
  }
})

//Paragraph 3C (Skills - attitude)
var SkillsAttitude = React.createClass ({
  render: function() {

    var applicantName = this.props.applicantName;
    var applicantPronouns = this.props.applicantPronouns;
    var skillsAttitude = this.props.skillsAttitude;
    var skillsCommunication = this.props.skillsCommunication;

    //Get the word 'also' if needed!
    function getAlsoWord(commSkills) {

      var noCommSkills = 0;

      for (var i = 0; i < commSkills.length; i++) {
        if (commSkills[i].selected == true) {
          noCommSkills ++
        }
      }

      if (noCommSkills !== 0) {
        return " also";
      } else {
        return "";
      }
    }

    //Write Attitudes sentence:
    //0 = enthusiastic about work, 1 = shows initiative, 2 = positive attitude.
    function writeSentence(skillsAttitude) {

      var skillsAttitudeArray = [];

      if (skillsAttitude[0].selected == true) {
        skillsAttitudeArray.push("shown great enthusiasm in " + applicantPronouns[1] + " work")
      }

      if (skillsAttitude[1].selected == true) {
        skillsAttitudeArray.push("demonstrated that " + applicantPronouns[0] + " can use initiative to tackle problems")
      }

      if (skillsAttitude[2].selected == true) {
        skillsAttitudeArray.push("addressed " + applicantPronouns[1] + " work with a positive attitude")
      }

      switch (skillsAttitudeArray.length) {
        case 0:
          return "";
        default:
          var attitudeSentence = " Throughout " + applicantPronouns[1] + " studies, " + applicantPronouns[4] + getAlsoWord(skillsCommunication) + " ";

            for (var i = 0; i < skillsAttitudeArray.length; i++) {
              if (i + 1 == skillsAttitudeArray.length) {
                attitudeSentence += skillsAttitudeArray[i]
              } else if (i + 1 == skillsAttitudeArray.length - 1) {
                attitudeSentence += skillsAttitudeArray[i] + " and "
              } else {
                attitudeSentence += skillsAttitudeArray[i] + ", "
              }
            }
            
            return attitudeSentence + "." 
      }
    }    

    return (
      <span>
        {writeSentence(skillsAttitude)}
      </span>
    )
  }
})

//Paragraph 3D (Skills - other)
var SkillsOther = React.createClass ({
  render: function() {

    var applicantName = this.props.applicantName;
    var applicantPronouns = this.props.applicantPronouns;
    var skillsOther = this.props.skillsOther;
    
    //Write Other Skills sentence:
    //0 = time management, 1 = presentation, 2 = academic writing.
    //Let's put the sentences in an array first:
    function writeSentence(skillsOther) {

      var skillsOtherArray = [];

      if (skillsOther[0].selected == true) {
        skillsOtherArray.push(applicantPronouns[3] + " good at managing " + applicantPronouns[1] + " time")
      }

      if (skillsOther[1].selected == true) {
        skillsOtherArray.push(applicantPronouns[3] + " able to give clear presentations to others")
      }

      if (skillsOther[2].selected == true) {
        skillsOtherArray.push("that " + applicantPronouns[1] + " academic writing skills are excellent")
      }

      switch (skillsOtherArray.length) {
        case 0:
          return "";
        default:
          var otherSkillsSentence = " " + applicantName[2] + " has shown that ";

            for (var i = 0; i < skillsOtherArray.length; i++) {
              if (i + 1 == skillsOtherArray.length) {
                otherSkillsSentence += skillsOtherArray[i]
              } else if (i + 1 == skillsOtherArray.length - 1) {
                otherSkillsSentence += skillsOtherArray[i] + " and "
              } else {
                otherSkillsSentence += skillsOtherArray[i] + ", "
              }
            }

            return otherSkillsSentence + "." 
      }
    }    

    return (
      <span>
        {writeSentence(skillsOther)}
      </span>
    )
  }
})

//Paragraph 3E (Skills - competencies)
var SkillsCompetencies = React.createClass({
  render: function() {

    var applicantName = this.props.applicantName;
    var competencies = this.props.competencies;
    var skillsCount = this.props.skillsCount;

    //Get the 'in addition' phrase if needed:
    function inAddition(skilldCount) {
      if (skillsCount !== 0) {
        return " In addition, "
      } else {
        return "";
      }
    }

    //Get prefix:
    function getPrefix(name) {
      switch (name.charAt(0)) {
        case "a":
        case "e":
        case "i":
        case "0":
        case "u":
          return "an ";
        default:
          return "a ";
      }
    }

    //Get the main sentence
    function writeSentence(competencies) {

      var competenciesSelected = [];

      for (var i = 0; i < competencies.length; i++) {
        if (competencies[i].selected == true)
          competenciesSelected.push(competencies[i].name)
      }

      switch (competenciesSelected.length) {
        case 0:
          return "";
        default:
          var competenciesSentence = inAddition(skillsCount) + "I believe " + applicantName[0] 
            + " to be " + getPrefix(competenciesSelected[0]);

            for (var i = 0; i < competenciesSelected.length; i++) {
              if (i + 1 == competenciesSelected.length) {
                competenciesSentence += competenciesSelected[i]
              } else if (i + 1 == competenciesSelected.length - 1) {
                competenciesSentence += competenciesSelected[i] + " and "
              } else {
                competenciesSentence += competenciesSelected[i] + ", "
              }
            }
            
            return competenciesSentence + " individual."

      };
    }   

    return (
      <span>
        {writeSentence(competencies)}
      </span>
    )
  }
})

//Paragaraph 3 (Skills)
var Paragraph3 = React.createClass ({
  render: function() {

    var skillsCommunication = this.props.skillsCommunication;
    var skillsAttitude = this.props.skillsAttitude;
    var skillsOther = this.props.skillsOther;

    //Count how many skills they have in total:
    var allSkills = skillsCommunication.concat(skillsAttitude, skillsOther)
    var skillsCount = 0;
    for (var i = 0; i < allSkills.length; i++) {
      if (allSkills[i].selected == true) {
        skillsCount++
      }
    } 
    
    return (

      <div className="preview-block">
        <div className="preview-text" id="rendered-paragraph3">
          <SkillsIntroduction 
          applicantName={this.props.applicantName}
          applicantPronouns={this.props.applicantPronouns}
          referee={this.props.referee}
          skillsCount={skillsCount}
          />
          <SkillsCommunication
            applicantName={this.props.applicantName}
            applicantPronouns={this.props.applicantPronouns}
            skillsCommunication={this.props.skillsCommunication}
          />
          <SkillsAttitude 
            applicantName={this.props.applicantName}
            applicantPronouns={this.props.applicantPronouns}
            skillsCommunication={this.props.skillsCommunication}
            skillsAttitude={this.props.skillsAttitude}
          />
          <SkillsOther
            applicantName={this.props.applicantName}
            applicantPronouns={this.props.applicantPronouns}
            skillsOther={this.props.skillsOther}
          />
          <SkillsCompetencies
            applicantName={this.props.applicantName}
            competencies={this.props.competencies}
            skillsCount={this.props.skillsCount}
          />
        </div>
        <PreviewTextTools />
      </div>
    )
  }

})


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


//Signature
var Signature = React.createClass ({
  render: function() {

    var referee = this.props.referee;

    function getName(title, firstName, lastName) {
      if (title !== "" && firstName == "" && lastName == "") {
        return "";
      } else if (title !== "" && firstName !== "" && lastName == "") {
        return firstName
      } else {
        return title + " " + firstName + " " + lastName;
      }
    }

    return (

      <div className="preview-block">
        <div className="preview-text">
          <span id="rendered-signature-phrase">Yours sincerely,</span>
          <br />
          <br />
          <br />
          <span id="rendered-signature-name">
            {getName(referee.title, referee.firstName, referee.lastName)}
          </span>
          <br />
          <span id="rendered-signature-title">
            {referee.jobTitle}
          </span>
          <br />
          <span id="rendered-signature-place">
            {referee.workPlace}
          </span>
        </div>
        <PreviewTextTools />
      </div>
    )
  }
})


//Now let's compile everything in the Preview Container:

//The Preview Page:
var PreviewPage = React.createClass ({
  render: function() {

    return (

      <div className="preview-page">

        <DateStamp 
          currentTime={this.props.currentTime}
        />
        <Greeting 
          addressee={this.props.addressee}
        />
        <SubjectHeading
          applicant={this.props.applicant}
        />
        <Paragraph1 
          applicantPronouns={this.props.applicantPronouns}
          applicantName={this.props.applicantName}
          referee={this.props.referee}
          relationshipLength={this.props.relationshipLength}
          relationshipCapacity={this.props.relationshipCapacity}
          relationshipPosition={this.props.relationshipPosition}
          newInfo={this.props.newInfo}
          currentTime={this.props.currentTime}
          datePeriod={this.props.datePeriod}
        />
        <Paragraph2
          work={this.props.work}
          applicantPronouns={this.props.applicantPronouns}
          applicantName={this.props.applicantName}
          referee={this.props.referee}
        />
        <Paragraph3
          skillsCommunication={this.props.skillsCommunication}
          skillsAttitude={this.props.skillsAttitude}
          skillsOther={this.props.skillsOther}
          competencies={this.props.competencies}
          applicantName={this.props.applicantName}
          applicantPronouns={this.props.applicantPronouns}
          referee={this.props.referee}
        />
        <Paragraph4
          applicantName={this.props.applicantName}
          applicantPronouns={this.props.applicantPronouns}
          newInfo={this.props.newInfo}
          skillsCommunication={this.props.skillsCommunication}
          skillsAttitude={this.props.skillsAttitude}
          skillsOther={this.props.skillsOther}
          work={this.props.work}
        />
        <Signature
          referee={this.props.referee}
        />
      </div>
    )
  }
});

//The Preview Toolbar:
var PreviewToolbar = React.createClass ({
  changePane: function() {

    var formPane = document.getElementById('form-container')
    var previewPane = document.getElementById('preview-container')

    formPane.style.display = "flex";
    previewPane.style.display = "none";

  },

  render: function() {

    
    return (
      <div className="pane-toolbar">
        <div className="toolbar-button" onClick={this.changePane}>
          <EditSVG />
          Edit details
        </div>
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
        <PreviewPage 
          currentTime={this.props.currentTime}
          applicant={this.props.applicant}
          applicantName={this.props.applicantName}
          applicantPronouns={this.props.applicantPronouns}
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


//Copy to clipboard function:

function copyTextToClipboard(text) {
  var textArea = document.createElement("textarea");

  // Place in top-left corner of screen regardless of scroll position.
  textArea.style.position = 'fixed';
  textArea.style.top = 0;
  textArea.style.left = 0;

  // Ensure it has a small width and height. Setting to 1px / 1em
  // doesn't work as this gives a negative w/h on some browsers.
  textArea.style.width = '2em';
  textArea.style.height = '2em';

  // We don't need padding, reducing the size if it does flash render.
  textArea.style.padding = 0;

  // Clean up any borders.
  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';

  // Avoid flash of white box if rendered for any reason.
  textArea.style.background = 'transparent';


  textArea.value = text;

  document.body.appendChild(textArea);

  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
  } catch (err) {
    console.error('Oops, unable to copy');
  }

  document.body.removeChild(textArea);
}