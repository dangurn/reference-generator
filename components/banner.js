var React = require('react');

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

module.exports = Banner;