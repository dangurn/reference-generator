//Get React:
var React = require('react');

//Get the PreviewTextTools
var PreviewTextTools = require('../resources.js').previewTextTools;



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

    function writeSentence(randomNo) {
      switch (randomNo) {
        case 1:
          return "Throughout " + applicantPronouns[1] + " time here, " + applicantName[0] + " has completed "
          + completedWorkText + " for me" + listWorkText + ". "
        case 2:
          return applicantName[2] + " has completed " + completedWorkText + " for me during "
          + applicantPronouns[1] + " time here" + listWorkText + ". " 
        case 3:
          return "I have seen " + completedWorkText + " completed by " + applicantName[0] + " during "
          + applicantPronouns[1] + " time here" + listWorkText + ". "
      }
    }

    return (
      <span>
        {writeSentence(this.props.randomNos.paragraph2.current)}
      </span>
    )
  }
})

//Paragraph 2B (Work Descriptions)
var WorkDescribe = React.createClass ({
  render: function () {

    var applicantName = this.props.applicantName;
    var applicantPronouns = this.props.applicantPronouns;
    var randomNos = this.props.randomNos;

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
          return "Having seen " + applicantPronouns[1] + " " + getName(name, count) + getTopic(topic)
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
          return "Similarly, I believe " + applicantPronouns[1] + " " + getName(name, count) + getTopic(topic) 
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
    var randomNos = this.props.randomNos;

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

    function getCapital(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }


    function writeSentence() {
      switch(randomNos.paragraph2.current) {
        case 1:
          return "In general, it is clear that " + applicantName[0] + " is capable of producing work"
          + getHighest(performanceHighest) + getConsistency(performanceRange, performanceLowest) + ". "
          + overallPrefix + " I have found that the work " + applicantName[0] + " has produced has been"
          + getOverallStandard(Math.floor(meanPerformance)) + ". "
        case 2:
          return "Overall, I believe the work that " + applicantName[0] + " has produced has been" 
          + getOverallStandard(Math.floor(meanPerformance)) + ". "
          + getCapital(applicantPronouns[5]) + " to be able to produce work"
          + getHighest(performanceHighest) + getConsistency(performanceRange, performanceLowest) + ". " 
        case 3:
          return "It is clear to me that " + applicantName[0] + " can produce work"
          + getHighest(performanceHighest) + getConsistency(performanceRange, performanceLowest) + ". "
          + "Overall, I understand that " + applicantName[1] + " work has been "
          + getOverallStandard(Math.floor(meanPerformance)) + ". "
      } 
    }

    return (
      <span>
        {writeSentence()}
      </span>
    )
  }
})

//Paragraph 3 Compiler
//In this component, we take a load of information from state then
//put it in a format such that it can be rendered by the Paragraph 2 components:
var Paragraph2Compiler = React.createClass ({


  //We only want this component to update if the 'randomNos' or 'work' prop values change.
  //(Otherwise this paragraph would change every time something in state changes!)
  shouldComponentUpdate(nextProps) {
    if (this.props.randomNos.paragraph2.current !== nextProps.randomNos.paragraph2.current) {
      return true;
    }
    if (this.props.work !== nextProps.work) {
      return true;
    }
    return false;
  },


  render: function() {

    var work = this.props.work;

    //Now let's put the work done in a simple array:
    //This will be needed for the components below:
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

    var workArray = [];

    for (var i = 0; i < work.length; i++) {
      if (work[i].selected == true) {
        workArray.push (getPhrase(work[i].name, work[i].count))
      }
    }


    return (
      <div className="preview-block">
        <div className="preview-text copy-body email-body" id="paragraph2">
          <WorkOverview
            randomNos={this.props.randomNos}
            applicantName={this.props.applicantName}
            applicantPronouns={this.props.applicantPronouns}
            workArray={workArray}
          /> 
          <WorkDescribe
            randomNos={this.props.randomNos}
            applicantName={this.props.applicantName}
            applicantPronouns={this.props.applicantPronouns}
            work={this.props.work}
          />
          <WorkSummary
            randomNos={this.props.randomNos}
            applicantName={this.props.applicantName}
            applicantPronouns={this.props.applicantPronouns}
            work={this.props.work}
            workArray={workArray}
          />
        </div>
        <PreviewTextTools
          name="paragraph2"
          randomised="true"
          editable="true"
          randomNos={this.props.randomNos}
          changeValue={this.props.changeValue}
        />
      </div>
    )
  }
})

module.exports = Paragraph2Compiler;


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

