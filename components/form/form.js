var React = require('react');

//Reference Generator

//The Form component components:

//SVG Files:

var AcademicSVG = require('./resources.js').academicSVG;
var ProfessionalSVG = require('./resources.js').professionalSVG;
var TenancySVG = require('./resources.js').tenancySVG;
var GenerateSVG = require('./resources.js').generateSVG;
var AddSVG = require('./resources.js').addSVG;
var DeleteSVG = require('./resources.js').deleteSVG;
var StarSVG = require('./resources.js').starSVG;

var RatingStars = React.createClass({
  render: function() {

    function getClass(selected) {

      if (selected == true) {
        return "rating-star-container"
      } else {
        return "rating-star-container disabled"
      }
    }

    return (
      <div className={getClass(this.props.selected)}>
        <StarSVG number={4} index={this.props.index} performance={this.props.performance} work={this.props.work} changeValue={this.props.changeValue} />
        <StarSVG number={3} index={this.props.index} performance={this.props.performance} work={this.props.work} changeValue={this.props.changeValue} />
        <StarSVG number={2} index={this.props.index} performance={this.props.performance} work={this.props.work} changeValue={this.props.changeValue} />
        <StarSVG number={1} index={this.props.index} performance={this.props.performance} work={this.props.work} changeValue={this.props.changeValue} />
      </div>
    )
  }
})

//Form Header:
var FormHeader = React.createClass ({

  handleChange: function(e) {

    //Find which button has been selected:
    var newValue = e.target.value;

    //Copy the ReferenceType attribute:
    var initialObject = this.props.referenceType;
    var newObject = copy(initialObject);

    //Change the reference selected:
    newObject.selected = newValue;

    //Commit new value(s) to state:
    var newState={}
    newState.referenceType = newObject

    this.props.changeValue(newState)

  },

  render: function() {
    return (
      <div className="pane-header">

        <span>
          Reference Type:
        </span>

        <div className="type-button-container">

          <label>
            <input type="radio" name="referenceType" value="academic" onChange={this.handleChange} defaultChecked={true}/>
            <span>
              <AcademicSVG />
              academic
            </span>
          </label>

          <label>
            <input type="radio" name="referenceType" value="professional" onChange={this.handleChange}/>
            <span>
              <ProfessionalSVG />
              professional
            </span>
          </label>

          <label>
            <input type="radio" name="referenceType" value="tenancy" onChange={this.handleChange}/>
            <span>
              <TenancySVG />
              tenancy
            </span>
          </label>

        </div>

      </div>
    )
  }
})


//Applicant Componenet:
var Applicant = React.createClass ({

  handleChange: function(e) {

    var newValue = e.target.value;
    var attribute = e.target.name;

    var newObject = copy(this.props.applicant);
    newObject[attribute] = newValue;

    var newState={};
    newState['applicant'] = newObject;
    this.props.changeValue(newState)

  },

  render: function() {
    return (
      <div className="form-block">

        <div className="form-row">
          <input name="firstName" type="text" placeholder="First Name (E.g. John)" onBlur={this.handleChange}/>
          <input name="lastName" type="text" placeholder="Last Name (E.g. Smith)" onBlur={this.handleChange}/>
        </div>
        
        <div className="form-row">
          <div className="radio-container">
            <label>
              <input type="radio" name="gender" value="male" onChange={this.handleChange}/>
              <span>Male</span>
            </label>
            <label>
              <input type="radio" name="gender" value="female" onChange={this.handleChange}/>
              <span>Female</span>
            </label>
          </div>
          <div className="radio-container">
          </div>
        </div>
      </div>
    )
  }
})

//DatePeriod Component:
var DatePeriod = React.createClass ({

  handleDateChange: function(name) {

    //Get new value
    var newValue = document.getElementById(name).value;

    if (newValue == "0") {
      var newAttribute = "";
    } else {
      var newAttribute = newValue;
    }

    //Put this into a new object
    var newObject = copy(this.props.datePeriod);
    newObject[name] = newAttribute;

    //Send to App as new state
    var newState={};
    newState['datePeriod'] = newObject;
    this.props.changeValue(newState);

  },

  render: function() {

    var currentTime = this.props.currentTime;
    var datePeriod = this.props.datePeriod;

    var currentMonth = this.props.currentTime.month + 1;

    var startYearArray = []
    for (var i = currentTime.year - 8; i < currentTime.year + 1; i++) {
      startYearArray.push(i)
    }

    if (datePeriod.startYear == "") {
      var startYear = currentTime.year;
    } else {
      var startYear = datePeriod.startYear;
    }

    var endYearArray = []
    for (var i = parseInt(startYear); i < currentTime.year + 6; i++) {
      endYearArray.push(i)
    }

    //Create an array that ensures users cannot select a starting month that proceeds the ending month:
    //What comes sooner? The month of the current year or the end month stated in the start year?
    var endMonthFinal = currentMonth;
    if (datePeriod.endMonth !== "" && datePeriod.endYear == currentTime.year && datePeriod.endMonth < currentMonth) {
      var endMonthFinal = datePeriod.endMonth
    }

    var startMonthArray = []
      if (datePeriod.startYear == currentTime.year && datePeriod.endYear == currentTime.year && datePeriod.endMonth !== "") {
        for (var i = 1; i < parseInt(endMonthFinal) + 1; i++) {
          startMonthArray.push(i)
        }
      } else if (datePeriod.startYear == currentTime.year) {
        for (var i = 1; i < currentMonth + 1; i++) {
          startMonthArray.push(i)
        }
      } else {
        startMonthArray.push(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12)
      }

    //Create an array that ensures users cannot select an ending month that precedes the starting month:
    var endMonthArray = []
    if (datePeriod.startYear == currentTime.year && datePeriod.endYear == currentTime.year && datePeriod.startMonth !== "") {
      for (var i = parseInt(datePeriod.startMonth); i < 13; i++) {
        endMonthArray.push(i)
      }
    } else {
      endMonthArray.push(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12)
    }

    //Render sentence:
    return (
      <div className="form-row">

        <div className="list-container">

          <div className="select-menu">
            <select id="startMonth" value={datePeriod.startMonth} onChange={this.handleDateChange.bind(this, "startMonth")}>
              <option value="0">Start Month</option>
              {startMonthArray.map((item, index) => (
                <option value={item}>{currentTime.monthList[item - 1]}</option>
              ))}
            </select>
            <div className="down-arrow"></div>
          </div>

          <div className="select-menu">
            <select id="startYear" value={datePeriod.startYear} onChange={this.handleDateChange.bind(this, "startYear")}>
              <option value="0">Start Year</option>
              {startYearArray.map((item, index) => (
                <option value={startYearArray[index]}>{startYearArray[index]}</option>
              ))}
            </select>
            <div className="down-arrow"></div>
          </div>

          <div className="select-menu">
            <select id="endMonth" value={datePeriod.endMonth} onChange={this.handleDateChange.bind(this, "endMonth")}>
              <option value="0">End Month</option>
              {endMonthArray.map((item, index) => (
                <option value={item}>{currentTime.monthList[item - 1]}</option>
              ))}
            </select>
            <div className="down-arrow"></div>
          </div>

          <div className="select-menu">
            <select id="endYear" value={datePeriod.endYear} onChange={this.handleDateChange.bind(this, "endYear")}>
              <option value="0">End Year</option>
              {endYearArray.map((item, index) => (
                <option value={endYearArray[index]}>{endYearArray[index]}</option>
              ))}
            </select>
            <div className="down-arrow"></div>
          </div>

        </div>
      </div>
    )
  }

});

//Referee Component:
var Referee = React.createClass ({

  handleChange: function(e) {

    var newValue = e.target.value;
    var attribute = e.target.name;

    var newObject = copy(this.props.referee);
    newObject[attribute] = newValue;

    var newState={};
    newState['referee'] = newObject;
    this.props.changeValue(newState)

  },
  
  handleTitleChange: function (item) {

    var newObject = copy(this.props.referee);

    newObject.title = item

    var newState={}
    newState["referee"] = newObject
    this.props.changeValue(newState)

  },

  render: function() {

    return (
      <div className="form-block">
        <div className="form-row">
          <div className="radio-container">
            {this.props.referee.titleList.map((item, index) => (
              <label key={index} className="radio-option">
                <input name="title" type="radio" value={item} onChange={this.handleTitleChange.bind(this, item, index)}/>
                <span>{item}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="form-row"> 
          <input name="firstName" type="text" placeholder="First Name (E.g. John)" onBlur={this.handleChange}/>
          <input name="lastName" type="text" placeholder="Last Name (E.g. Smith)" onBlur={this.handleChange}/>
        </div>

        {this.props.referenceType.selected !== "tenancy" &&
          <div className="form-row">
            <input name="workPlace" type="text" placeholder={this.props.placeholders.refereeWorkPlace} onBlur={this.handleChange}/>
          </div>
        }

        {this.props.referenceType.selected !== "tenancy" &&
          <div className="form-row">
            <input name="jobTitle" type="text" placeholder={this.props.placeholders.refereePosition} onBlur={this.handleChange}/>
          </div>
        }

      </div>
    )
  }
})

//RelationshipLength Component:
var RelationshipLength = React.createClass ({

  handleChange: function(e) {

    var attributeName = e.target.name
    var newValue = e.target.value

    var newState={}
    newState[attributeName] = newValue
    this.props.changeValue(newState)

  },

  render: function() {

    var relationshipLength = this.props.relationshipLength;

    if (relationshipLength == 0) {
      var label = "I have known the " + this.props.placeholders.person + " for (drag to select)";
    } else if (relationshipLength == 1) {
      var label = relationshipLength + " year";
    } else {
      var label = relationshipLength + " years";
    }

    return (
      <div className="form-row">
        <input name="relationshipLength" type="range" value={relationshipLength} min="0" max="15" onChange={this.handleChange} />
        <div className="years-length-box">{label}</div>
      </div>
  )
  }
})

//RelationshipCapacity Componenet:
var RelationshipCapacity = React.createClass ({

  modifyRelationship: function(name, value, key) {

    //Put the relevant information into a new array


    var initialArray = this.props[name]
    var newArray = copy(initialArray)
    var targetItem = initialArray[key]

    newArray.splice(key, 1, {
      selected: !value.selected
    })


    //Commit new value(s) to state
    var newState={}
    newState[name] = newArray

    this.props.changeValue(newState)

  },

  render: function() {

    return (
      <div className="form-row">
        <div className="element-container">
          {this.props.relationshipCapacity.map((item, index) => (
            <label key={index}>
              <input type="checkbox" value={item.name} onChange={this.modifyRelationship.bind(this, "relationshipCapacity", item, index)} checked={item.selected}/>
              <span>{item.name}</span>
            </label>
          ))}
        </div>
      </div>
    )
  }
})

//relationshipPosition Component:
var RelationshipPosition = React.createClass ({

  handleChange: function(e) {

    var newValue = e.target.value

    var newState={}
    newState.relationshipPosition = newValue
    this.props.changeValue(newState)

  },

  render: function() {
    return (
      
      <div className="form-row">
        <input type="text" placeholder={this.props.placeholders.relationshipPosition} onBlur={this.handleChange} />
      </div>
    )
  }
})

//relationshipPlace Component:
var RelationshipPlace = React.createClass ({

  handleChange: function(e) {

    var newValue = e.target.value

    var newState={}
    newState.relationshipPlace = newValue
    this.props.changeValue(newState)

  },

  render: function() {
    return (
      <div className="form-row">
        <input type="text" placeholder={this.props.placeholders.relationshipPlace} onBlur={this.handleChange} />
      </div>
  )
  }
})

//Work Component:
var Work = React.createClass ({

  modifyWorkStuff: function(index) {

    var name = document.getElementById('work-name-' + index).value;
    var topic = document.getElementById('work-topic-' + index).value;

    var initialArray = this.props.work
    var newArray = copy(initialArray)
    var targetItem = initialArray[index]

    newArray.splice(index, 1, {
      name: name,
      count: targetItem.count,
      topic: topic,
      performance: targetItem.performance,
      selected: true
    })

    var newState={}
    newState.work = newArray

    this.props.changeValue(newState)

  },

  modifyWorkName: function(item, index) {

    var button = document.getElementById('work-button-' + index);
    var name = document.getElementById('work-name-' + index);
    var addCount = document.getElementById('add-count-' + index);
    var showCount = document.getElementById('show-count-' + index);
    var subtractCount = document.getElementById('subtract-count-' + index);
    var topic = document.getElementById('work-topic-' + index);

    var initialArray = this.props.work
    var newArray = copy(initialArray)
    var targetItem = newArray[index]

    targetItem.selected = !targetItem.selected;

    //Disable the boxes
    if (item.selected == true) {
      topic.disabled = true;
      addCount.disabled = true
      showCount.disabled = true
      subtractCount.disabled = true
    } else {
      topic.disabled = false;
      addCount.disabled = false;
      showCount.disabled = false;
      subtractCount.disabled = false;
    }

    var newState={}
    newState.work = newArray

    this.props.changeValue(newState)

  },

  addCount: function(index) {

    var initialArray = this.props.work
    var newArray = copy(initialArray)
    var targetItem = newArray[index]

    if (targetItem.count < 9) {
      targetItem.count = targetItem.count + 1;
    } else {
      targetItem.count = targetItem.count;
    }  

    var newState={}
    newState.work = newArray

    this.props.changeValue(newState)

  },

  subtractCount: function(index) {

    var initialArray = this.props.work
    var newArray = copy(initialArray)
    var targetItem = newArray[index]

    if (targetItem.count > 1) {
      targetItem.count = targetItem.count + -1;
    } else {
      targetItem.count = targetItem.count;
    }  

    var newState={}
    newState.work = newArray

    this.props.changeValue(newState)

  },

  render: function() {

    var performanceWords = ["Not defined", "Poor", "Average", "Good", "Excellent"];

    return (
      <div className="form-block">
        {this.props.work.map((item, index) => (
          <div key={index} className="form-row">
            <div className="radio-container">
              <label id={'work-button-' + index}>
                <input type="checkbox" id={'work-name-' + index} value={item.name} onChange={this.modifyWorkName.bind(this, item, index)}/>
                <span>{item.name}</span>
              </label>
            </div>
            <div className="count-container">
              <button id={'subtract-count-' + index} className="count-button" disabled={!item.selected} onClick={this.subtractCount.bind(this, index)}>-</button>
              <input id={'show-count-' + index} className="count-display" disabled={!item.selected} type="text" value={item.count} readyonly />
              <button id={'add-count-' + index} className="count-button" disabled={!item.selected} onClick={this.addCount.bind(this, index)}>+</button>
            </div>
              <input type="text" id={'work-topic-' + index} placeholder="Topic (Optional)" value={this.topic} disabled={!item.selected} onBlur={this.modifyWorkStuff.bind(this, index)}/>
              <RatingStars 
                index={index} 
                performance={item.performance}
                selected={item.selected}
                work={this.props.work} 
                changeValue={this.props.changeValue} />
          </div>
        ))}
      </div>
    )
  }
})

//Skills Component:
var Skills = React.createClass ({

  handleChange: function (name, item, index) {

    //Put the relevant information into a new array
    var initialArray = this.props[name]
    var newArray = copy(initialArray)
    var targetItem = initialArray[index]

    newArray.splice(index, 1, {
      name: item.name, 
      selected: !item.selected,
    })
    
    //Commit new value(s) to state
    var newState={}
    newState[name] = newArray
    this.props.changeValue(newState)

  },

  render: function() {

    return (
      <div className="form-block">
        
        <div className="form-row">
          <div className="radio-container">
          {this.props.skillsCommunication.map((item, index) => (
            <label key={index}>
              <input type="checkbox" value={item.name} onChange={this.handleChange.bind(this, "skillsCommunication", item, index)} className={item.selected}/>
              <span>{item.name}</span>
            </label>
          ))}
          </div>
        </div>

        <div className="form-row">
          <div className="radio-container">
          {this.props.skillsAttitude.map((item, index) => (
            <label key={index}>
              <input type="checkbox" value={item.name} onChange={this.handleChange.bind(this, "skillsAttitude", item, index)} className={item.selected}/>
              <span>{item.name}</span>
            </label>
          ))}
          </div>
        </div>

        <div className="form-row">
          <div className="radio-container">
          {this.props.skillsOther.map((item, index) => (
            <label key={index}>
              <input type="checkbox" value={item.name} onChange={this.handleChange.bind(this, "skillsOther", item, index)} className={item.selected}/>
              <span>{item.name}</span>
            </label>
          ))}
          </div>
        </div>
      </div>
    )
  }
})

//Competencies Component:
var Competencies = React.createClass ({

  modifyCompetency: function(name, value, key) {

    var initialArray = this.props[name]
    var newArray = copy(initialArray)
    var targetItem = initialArray[key]

    newArray.splice(key, 1, {
      name: value.name, 
      selected: !value.selected
    });

    var newState={}
    newState[name] = newArray

    this.props.changeValue(newState)

  },

  deleteCompetency: function(item, index, e) {

    var initialArray = this.props.competencies
    var newArray = copy(initialArray)

    newArray.splice(index, 1)

    var newState={}
    newState["competencies"] = newArray

    this.props.changeValue(newState)

    this.disableBoxes(newArray);

    //Stop the onClick above from triggering:
    e.stopPropagation();
    e.preventDefault();

  },

  addCompetency: function() {

    var initialArray = this.props.competencies;
    var newArray = copy(initialArray);
    var newValue = document.getElementById("new-competency").value;

    newArray.push({name: newValue.toLowerCase(), selected: true});

    //Reset the value of the "Add another" text box:
    document.getElementById("new-competency").value = "";

    var newState={};
    newState["competencies"] = newArray;
    
    this.props.changeValue(newState);

    this.disableBoxes(newArray);

  },

  disableBoxes: function(array) {

    if (array.length > 4) {
      document.getElementById("add-competency").disabled = true;
      document.getElementById("new-competency").disabled = true;
    } else {
      document.getElementById("add-competency").disabled = false;
      document.getElementById("new-competency").disabled = false;
    }

  },

  componentDidMount() {

    var addButton = document.getElementById("new-competency");
    addButton.addEventListener("keydown", this.enterSubmitButton);

  },

  enterSubmitButton(e) {
    if (e.keyCode === 13) {
        this.addCompetency();
    }
  },

  render: function() {

    return (
      <div className="form-block">
        <div className="form-row">
          <div className="element-container">
            {this.props.competencies.map((item, index) => (
              <label key={index}>
                <input type="checkbox" value={item.name} onChange={this.modifyCompetency.bind(this, "competencies", item, index)} checked={item.selected}/>
                <span>
                  {item.name}
                  <div className="delete-button" onClick={this.deleteCompetency.bind(this, item, index)}>
                    <DeleteSVG />
                  </div>
                </span>
              </label>
            ))}
            <label>
              <input type="text" id="new-competency" placeholder="Add another..." />
              <button type="button" id="add-competency" onClick={this.addCompetency}>
                <AddSVG />
              </button>
            </label>
          </div>
        </div>
      </div>
    )
  }
})

//Addresse:
var Addressee = React.createClass ({

  handleChange: function(e) {

    var newValue = e.target.value;
    var attribute = e.target.name;

    var newObject = copy(this.props.addressee);
    newObject[attribute] = newValue;

    var newState={};
    newState['addressee'] = newObject;
    this.props.changeValue(newState)

  },
  
  handleTitleChange: function (item) {

    var newObject = copy(this.props.addressee);

    newObject.title = item

    //Commit new value(s) to state
    var newState={}
    newState["addressee"] = newObject
    this.props.changeValue(newState)

  },

  render: function() {

    return (
      <div className="form-block">

        <div className="form-row">
          <div className="radio-container">
            {this.props.addressee.titleList.map((item, index) => (
              <label key={index} className="radio-option">
                <input name="title" type="radio" value={item} onChange={this.handleTitleChange.bind(this, item, index)}/>
                <span>{item}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="form-row"> 
          <input name="firstName" type="text" placeholder="First Name (E.g. John)" onBlur={this.handleChange}/>
          <input name="lastName" type="text" placeholder="Last Name (E.g. Smith)" onBlur={this.handleChange}/>
        </div>

      </div>
    )
  }
})

//NewInfo Component:
var NewInfo = React.createClass ({

  handleChange: function(e) {

    var newValue = e.target.value;
    var attribute = e.target.name;

    var newObject = copy(this.props.newInfo);
    newObject[attribute] = newValue;

    var newState={};
    newState['newInfo'] = newObject;
    this.props.changeValue(newState);

  },

  handleCheckboxChange: function() {
    
    var newObject = copy(this.props.newInfo);
    newObject["suitable"] = !newObject.suitable;
    
    var newState={};
    newState["newInfo"] = newObject;
    this.props.changeValue(newState);

  },

  render: function() {

    return (
      <div>
        <div className="form-block">

          {this.props.referenceType.selected !== "tenancy" &&
            <div className="form-row">
              <input type="text" name="position" placeholder={this.props.placeholders.newInfoPosition} onBlur={this.handleChange} />
            </div>
          }

          <div className="form-row">
            <input type="text" name="place" placeholder={this.props.placeholders.newInfoPlace} onBlur={this.handleChange} />
          </div>
          <div className="form-row">
            <div className="radio-container">
              Is the candidate suitable for this role?
              <label>
                <input type="checkbox" onChange={this.handleCheckboxChange}/>
                <span>Yes</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    )
  }
})


//The Form content:
var FormContent = React.createClass ({

  render: function() {

    return (

      <div className="preview-page">

        <h2>{this.props.formHeadings.aboutApplicant}</h2>
        <Applicant
          applicant={this.props.applicant}
          changeValue={this.props.changeValue}
        />       

        <h2>{this.props.formHeadings.applicantBackground}</h2>
        <div className="form-block">
          
          {this.props.referenceType.selected !== "tenancy" &&
            <RelationshipPosition
            changeValue={this.props.changeValue}
            placeholders={this.props.placeholders}
            />
          }
          
          <RelationshipPlace
            changeValue={this.props.changeValue}
            placeholders={this.props.placeholders}
          />
          <DatePeriod
            currentTime={this.props.currentTime}
            datePeriod={this.props.datePeriod}
            changeValue={this.props.changeValue}
          />
        </div>

        <h2>{this.props.formHeadings.aboutReferee}</h2>
        <Referee
          referenceType={this.props.referenceType}
          referee={this.props.referee}
          changeValue={this.props.changeValue}
          placeholders={this.props.placeholders}
        />

        <h2>{this.props.formHeadings.relationship}</h2>
        <div className="form-block">
          <RelationshipLength 
            relationshipLength={this.props.relationshipLength}
            placeholders={this.props.placeholders}
            changeValue={this.props.changeValue}
          />
          <RelationshipCapacity 
            relationshipCapacity={this.props.relationshipCapacity}
            changeValue={this.props.changeValue}
          />
        </div>

        {this.props.referenceType.selected == "academic" &&
          <h2>{this.props.formHeadings.performance}</h2>
        }
        {this.props.referenceType.selected == "academic" &&
          <Work 
            work={this.props.work}
            changeValue={this.props.changeValue}
          />
        }

        <h2>{this.props.formHeadings.competencies}</h2>
        <Skills 
          skillsCommunication={this.props.skillsCommunication}
          skillsAttitude={this.props.skillsAttitude}
          skillsOther={this.props.skillsOther}
          changeValue={this.props.changeValue}
        />

        <Competencies 
          competencies={this.props.competencies}
          changeValue={this.props.changeValue}
        />

        <h2>{this.props.formHeadings.aboutAddressee}</h2>
        <Addressee 
          addressee={this.props.addressee}
          changeValue={this.props.changeValue}
        />

        <h2>{this.props.formHeadings.aboutJob}</h2>
        <NewInfo 
          referenceType={this.props.referenceType}
          newInfo={this.props.newInfo}
          placeholders={this.props.placeholders}
          changeValue={this.props.changeValue}
        />
        
      </div>
    )
  }
});



//The Form Toolbar:
var FormToolbar = React.createClass ({

  changePane: function() {

    var formPane = document.getElementById('form-container')
    var previewPane = document.getElementById('preview-container')

    formPane.style.display = "none";
    previewPane.style.display = "flex";

  },

  render: function() {

    
    return (
      <div className="pane-toolbar">
        <div className="toolbar-button" onClick={this.changePane}>
          <GenerateSVG />
          Generate Reference
        </div>
      </div>
    )
  }
})


//The Form container:
var FormBox = React.createClass ({
  render: function() {
    return (
      <div id="form-container" className="pane-container">
        <FormHeader 
          referenceType={this.props.referenceType}
          changeValue={this.props.changeValue}
        />
        <FormContent
            referenceType={this.props.referenceType}
            currentTime={this.props.currentTime}
            formHeadings={this.props.formHeadings}
            placeholders={this.props.placeholders}
            applicant={this.props.applicant}
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
            changeValue={this.props.changeValue} 
          />
          <FormToolbar />
        </div>
    )
  }
})

module.exports = FormBox;

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
