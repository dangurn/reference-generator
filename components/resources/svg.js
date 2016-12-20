var React = require('react');

//FormBox SVGs:

var StarSVG = React.createClass({

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


//PreviewBox SVGs
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


module.exports = {
    generateSVG: GenerateSVG,
    addSVG: AddSVG,
    deleteSVG: DeleteSVG,
    starSVG: StarSVG,
    editSVG: EditSVG,
    copySVG: CopySVG,
    emailSVG: EmailSVG,
    refreshSVG: RefreshSVG
};

