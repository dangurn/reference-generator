//Reference Generator

var SVGStar = React.createClass({

  handleChange: function(index, number) {

    var initialArray = this.props.work;
    var newObject = copy(initialArray);
    var targetItem = initialArray[index];

    newObject.splice(index, 1, {
      name: targetItem.name,
      count: targetItem.count,
      topic: targetItem.topic,
      performance: number,
      selected: true
    })

    var newState={}
    newState.work = newObject

    this.props.changeValue(newState)
  },

  render: function() {

    var number = this.props.number;
    var index = this.props.index;
    var performance = this.props.performance;

    if (number <= performance) {
      var type = "selected"
    } else {
      var type = "not-selected"
    }

    return (
      <svg id={'work-' + index + '-' + number} className={type} onClick={this.handleChange.bind(this, index, number)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22">
        <polygon points="11.17 1.13 14.29 7.45 21.26 8.46 16.21 13.38 17.4 20.33 11.17 17.05 4.93 20.33 6.12 13.38 1.07 8.46 8.05 7.45 11.17 1.13"/>
      </svg>
    )
  }
})

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
        <SVGStar number={4} index={this.props.index} performance={this.props.performance} work={this.props.work} changeValue={this.props.changeValue} />
        <SVGStar number={3} index={this.props.index} performance={this.props.performance} work={this.props.work} changeValue={this.props.changeValue} />
        <SVGStar number={2} index={this.props.index} performance={this.props.performance} work={this.props.work} changeValue={this.props.changeValue} />
        <SVGStar number={1} index={this.props.index} performance={this.props.performance} work={this.props.work} changeValue={this.props.changeValue} />
      </div>
    )
  }
})


//The Form component components:

//SVG Files:
var GenerateSVG = React.createClass ({
  render: function() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
        <path d="M3.6,0.1v24.8h18V0.1H3.6z M9.6,22.9l1.7-9.6l-3-1.8l7.2-9.3l-1.6,9.6l3,1.8L9.6,22.9z"/>
      </svg>
    )
  }
})

var AddSVG = React.createClass({
  render: function() {
    return (
      <svg className="button-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.98 14.98">
        <polygon points="14.48 5.39 9.58 5.39 9.58 0.5 5.39 0.5 5.39 5.39 0.5 5.39 0.5 9.58 5.39 9.58 5.39 14.48 9.58 14.48 9.58 9.58 14.48 9.58 14.48 5.39"/>
      </svg>
    )
  }
})

var DeleteSVG = React.createClass ({
  render: function() {
    return (
      <svg className="button-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.26 14.26">
        <polygon points="13.55 10.59 10.09 7.13 13.55 3.67 10.59 0.71 7.13 4.17 3.67 0.71 0.71 3.67 4.17 7.13 0.71 10.59 3.67 13.55 7.13 10.09 10.59 13.55 13.55 10.59"/>
      </svg>
    )
  }
})

//Reference Type:
var RefType = React.createClass ({

  changeValue: function(name, value, key) {

    

  },


  render: function() {
    return (
      <div className="form-block">
        <div className="form-row">
          <div className="element-container">
            {this.props.refType.map((item, index) => (
              <label>
                <input name="refType" type="radio" value={item.name} onChange={this.changeValue.bind(this, "refType", item, index)} checked={item.selected}/>
                <span>{item.name}</span>
              </label>
            ))}
          </div>
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

    //Commit new value(s) to state
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
        <div className="form-row">
          <input name="workPlace" type="text" placeholder={this.props.placeholders.refereeWorkPlace} onBlur={this.handleChange}/>
        </div>
        <div className="form-row">
          <input name="jobTitle" type="text" placeholder={this.props.placeholders.refereePosition} onBlur={this.handleChange}/>
        </div>
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
      var label = "I have known the applicant for (drag to select)";
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
      name: value.name, 
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
            <label>
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

    var attributeName = e.target.name
    var newValue = e.target.value

    var newState={}
    newState[attributeName] = newValue
    this.props.changeValue(newState)

  },

  render: function() {
    return (
      <div className="form-row">
        <input type="text" name="relationshipPosition" placeholder={this.props.placeholders.relationshipPosition} onBlur={this.handleChange} />
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
          <div className="form-row">
            <div key={index} className="radio-container">
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
            <label>
              <input type="checkbox" value={item.name} onChange={this.handleChange.bind(this, "skillsCommunication", item, index)} className={item.selected}/>
              <span>{item.name}</span>
            </label>
          ))}
          </div>
        </div>

        <div className="form-row">
          <div className="radio-container">
          {this.props.skillsAttitude.map((item, index) => (
            <label>
              <input type="checkbox" value={item.name} onChange={this.handleChange.bind(this, "skillsAttitude", item, index)} className={item.selected}/>
              <span>{item.name}</span>
            </label>
          ))}
          </div>
        </div>

        <div className="form-row">
          <div className="radio-container">
          {this.props.skillsOther.map((item, index) => (
            <label>
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
              <label>
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
          <div className="form-row">
            <input type="text" name="position" placeholder={this.props.placeholders.newInfoPosition} onBlur={this.handleChange} />
          </div>
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

        <h2>About the applicant</h2>
        <Applicant
          applicant={this.props.applicant}
          changeValue={this.props.changeValue}
        />

        <h2>About you</h2>
        <Referee
          referee={this.props.referee}
          changeValue={this.props.changeValue}
          placeholders={this.props.placeholders}
        />       

        <h2>The applicant's background</h2>
        <div className="form-block">
          <RelationshipPosition
            changeValue={this.props.changeValue}
            placeholders={this.props.placeholders}
          />
          <DatePeriod
            currentTime={this.props.currentTime}
            datePeriod={this.props.datePeriod}
            changeValue={this.props.changeValue}
          />
        </div>

        <h2>Your relationship with the applicant</h2>
        <div className="form-block">
          <RelationshipLength 
            relationshipLength={this.props.relationshipLength}
            changeValue={this.props.changeValue}
          />
          <RelationshipCapacity 
            relationshipCapacity={this.props.relationshipCapacity}
            changeValue={this.props.changeValue}
          />
        </div>
        
        <h2>The applicant's performance</h2>
        <Work 
          work={this.props.work}
          changeValue={this.props.changeValue}
        />

        <h2>The applicant's competencies</h2>
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

        <h2>About the addressee</h2>
        <Addressee 
          addressee={this.props.addressee}
          changeValue={this.props.changeValue}
        />

        <h2>About the new Job</h2>
        <NewInfo 
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
        <FormContent
            refType={this.props.refType}
            currentTime={this.props.currentTime}
            placeholders={this.props.placeholders}
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
          <FormToolbar />
        </div>
    )
  }
})


//Now we're going to make all of the parts of the <Preview /> component:

//SVG Files:
var EditSVG = React.createClass ({
  render: function() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17.44 25.17">
      <rect x="9.57" y="2.74" width="9.84" height="16.76" transform="translate(1.48 -6.84) rotate(27.47)"/>
      <polygon points="1.17 25.17 0 16.75 8.73 21.29 1.17 25.17"/></svg>
    )
  }
})


var CopySVG = React.createClass ({
  render: function() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.91 25.55">
        <polygon points="3.21 2.78 14.75 2.78 14.75 0 0 0 0 20.99 3.21 20.99 3.21 2.78"/>
        <rect x="5.16" y="4.56" width="14.75" height="20.99"/>
      </svg>
    )
  }
})

var EmailSVG = React.createClass ({
  render: function() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23.72 15.9">
        <polygon points="11.53 10.48 0 2.34 0 15.89 23.72 15.89 23.72 2.17 23.52 2.17 11.53 10.48"/>
        <polygon points="11.74 8.31 23.72 0 0.21 0 0.21 0.17 11.74 8.31"/>
      </svg>
    )
  }
})

var RefreshSVG = React.createClass ({
  render: function() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24.31 21.33">
        <path d="M12.4,1.8c-4.1,0-7.5,2.6-8.8,6.3H0.2l4.9,6.1L10,8.1h-4c1.1-2.4,3.6-4.1,6.4-4.1c2.9,0,5.4,1.8,6.5,4.3h2.3
	C20,4.5,16.5,1.8,12.4,1.8z"/>
<path d="M12.6,23.2c4.1,0,7.5-2.6,8.8-6.3h3.4l-4.9-6.1L15,16.9h4c-1.1,2.4-3.6,4.1-6.4,4.1c-2.9,0-5.4-1.8-6.5-4.3H3.8
	C5,20.5,8.5,23.2,12.6,23.2z"/>
      </svg>
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



//This is the component where all of our data (state) lives:
var DataStore = React.createClass ({

  getInitialState: function() {

    return {

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

//This compiles all of the data ready to distribute to the main components:
var Compiler = React.createClass ({
  render: function() {

    //Get the dates
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth();
    var day = today.getDate();

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

    var currentTime = {year: year, month: month, day: day, monthList: monthList}

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
          randomNumbers={this.props.randomNumbers}
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
        />
        
      </div>
    )
  }
})



//The main banner components:

//SVG Files:
var MainLogo = React.createClass ({
  render: function() {
    return (
      <div className="logo-area">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180">
          <polygon points="85.8,122.4 70.6,117.1 101.1,34.6 116.3,39.9 "/>
          <polygon points="73.1,134.4 70.2,118.9 85.4,124.2 "/>
          <polygon points="58.2,50 48.1,40.2 3.5,83.6 3.5,83.6 3.5,83.7 48.1,127 58.2,117.2 23.6,83.6 "/>
          <polygon points="174,85.7 129.4,42.3 119.3,52.1 153.8,85.7 119.3,119.3 129.4,129.1 174,85.8 173.9,85.7 "/>
        </svg>
      </div>
    )
  }
})

var GitHubSVG = React.createClass ({
  render: function() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35">
        <path d="M17.5,0.45A17.48,17.48,0,0,0,12,34.52a0.88,0.88,0,0,0,1.19-.84c0-.41,0-1.51,0-3-4.86,1.06-5.89-2.34-5.89-2.34A4.63,4.63,0,0,0,5.32,25.8c-1.59-1.08.12-1.06,0.12-1.06a3.67,3.67,0,0,1,2.68,1.8A3.72,3.72,0,0,0,13.2,28a3.73,3.73,0,0,1,1.11-2.34c-3.88-.44-8-1.94-8-8.64a6.76,6.76,0,0,1,1.8-4.69A6.29,6.29,0,0,1,8.32,7.7s1.47-.47,4.81,1.79a16.57,16.57,0,0,1,8.75,0c3.34-2.26,4.8-1.79,4.8-1.79a6.28,6.28,0,0,1,.17,4.63A6.74,6.74,0,0,1,28.65,17c0,6.71-4.09,8.19-8,8.62a4.17,4.17,0,0,1,1.19,3.24c0,2.34,0,4.22,0,4.79a0.88,0.88,0,0,0,1.2.84A17.48,17.48,0,0,0,17.5.45Z" transform="translate(-0.02 -0.45)"/>
      </svg>
    )
  }
})

var TwitterSVG = React.createClass ({
  render: function() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35">
        <path d="M17.5,0A17.49,17.49,0,1,0,35,17.5,17.49,17.49,0,0,0,17.5,0Zm9.58,12.57q0,0.32,0,.64A14,14,0,0,1,13,27.29h0a14,14,0,0,1-7.57-2.22,10,10,0,0,0,1.18.07A9.91,9.91,0,0,0,12.77,23a5,5,0,0,1-4.62-3.43,4.93,4.93,0,0,0,2.23-.08,4.94,4.94,0,0,1-4-4.84s0,0,0-.06a4.9,4.9,0,0,0,2.24.62,4.95,4.95,0,0,1-1.53-6.6,14,14,0,0,0,10.18,5.16,4.94,4.94,0,0,1,8.42-4.51,9.91,9.91,0,0,0,3.14-1.2,5,5,0,0,1-2.17,2.73A9.85,9.85,0,0,0,29.54,10,10,10,0,0,1,27.08,12.59Z"/>
      </svg>
    )
  }
})

var FacebookSVG = React.createClass ({
  render: function() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35">
        <path d="M17.5,0A17.49,17.49,0,1,0,35,17.5,17.49,17.49,0,0,0,17.5,0Zm6.13,9.61H21.4c-1.74,0-2.08.83-2.08,2v2.68h4.15l-0.54,4.19H19.33V29.29H15V18.53H11.38V14.34H15V11.25c0-3.59,2.19-5.54,5.39-5.54a29.69,29.69,0,0,1,3.24.17V9.62Z"/>
      </svg>
    )
  }
})

var WhoMadeThis = React.createClass ({
  render: function() {
    return (
      <footer>
        Who made this?
      </footer>
    )
  }
})

//The main banner
var Banner = React.createClass({
  render: function() {
    return (
      <div className="banner-container">
        <div className="title-container">
          <h1>Reference Generator</h1>
          <span>v 1.0</span>
          <MainLogo />
        </div>
        <div className="social-media-container">
          <TwitterSVG />
          <FacebookSVG />
          <GitHubSVG />
        </div>
        <WhoMadeThis />
      </div>
    )
  }
})

//The Ad down the side
var Ad = React.createClass({
  render: function() {
    return (
      <div className="ad-container">
        <p>Ads</p>
      </div>
    )
  }
})


//The whole app
var App = React.createClass({

  getInitialState: function() {
    return {

      refType: [
        {name: "academic", selected: true},
        {name: "professional", selected: false},
        {name: "personal", selected: false}
      ],

      randomNumbers: [
        {greeting: 1},
        {signature: 1}

      ],

    }
  },

  render: function() {

    return (
      <div className="app-container">
        <Banner />
        <DataStore />
      </div>
    )
  }
})

ReactDOM.render(<App />, document.getElementById('app'));


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

    var clipboard = new Clipboard('.btn');

    clipboard.on('success', function(e) {
        console.log(e);
    });

    clipboard.on('error', function(e) {
        console.log(e);
    });

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