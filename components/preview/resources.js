//Get React:
var React = require('react');

//Make SVG icons:
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

//Make a generic toolbar to appear against every paragraph:
var PreviewTextTools = React.createClass ({

  generateRandomNo(name, randomNos) {

    var current = randomNos[name].current;
    var max = randomNos[name].max;

    //Copy RandomNos object:
    var newObject = copy(this.props.randomNos);

    //Generate a new random number
    //Cycle through numbers, returning to 1 if needed:
    var newNo = current + 1;

    if (newNo > max) {
      newNo = 1;
    }

    //Put this into the Object
    newObject[name] = {current: newNo, max: max}

    //Send back to state:
    var newState={}
    newState["randomNos"] = newObject;
    this.props.changeValue(newState)

  },

  makeContentEditable(name) {

    var textBox = document.getElementById(name);

    //Toggle editable DIV
    if (textBox.contentEditable == "inherit" || textBox.contentEditable == "false") {
      textBox.contentEditable = true;
      textBox.className = "preview-text copy-body email-body editable-text";
    } else {
      textBox.contentEditable = false;
      textBox.className = "preview-text copy-body email-body";
    }
    

  },

  render: function() {

    return (
      <div className="preview-tools">

        {this.props.randomised == "true" &&
          <div 
          className="preview-tools-button" 
          onClick={this.generateRandomNo.bind(this, this.props.name, this.props.randomNos)}>
            <RefreshSVG/>
          </div>
        }

        {this.props.editable == "true" &&
          <div 
          className="preview-tools-button" 
          onClick={this.makeContentEditable.bind(this, this.props.name)}>
            <EditSVG /> 
          </div>
        }       
        
      </div>
    )
  }
})

//Make Buttons for the Preview Toolbar:
var EditButton = React.createClass ({
  changePane: function() {

    var formPane = document.getElementById('form-container')
    var previewPane = document.getElementById('preview-container')

    formPane.style.display = "flex";
    previewPane.style.display = "none";

  },

  render: function() {
    return (
      <div className="toolbar-button" onClick={this.changePane}>
        <EditSVG />
        Edit details
      </div>
    )
  }
})

var EmailButton = React.createClass ({

  buildEmailLink() {

    //Let's get all of the elements we need:
    var subject = document.getElementById('subject').textContent;

    var bodyContent = document.getElementsByClassName('email-body');

    var signatureName = document.getElementById('signatureName').textContent;
    var signatureTitle = document.getElementById('signatureTitle').textContent;
    var signaturePlace = document.getElementById('signaturePlace').textContent;

    //Parse individual snippets into email (URI) format:
    var parsedSubject = encodeURIComponent(subject);

    var parsedSignatureName = encodeURIComponent(signatureName);
    var parsedSignatureTitle = encodeURIComponent(signatureTitle);
    var parsedSignaturePlace = encodeURIComponent(signaturePlace);

    //And push the email body elements to an array:
    var mainTextContent = [];

    for (var i = 0; i < bodyContent.length; i++) {
      var textContent = bodyContent[i].textContent
      mainTextContent.push(encodeURIComponent(textContent))
    }  

    //Now bind everything together:   
    var mainBodyText = mainTextContent.join("%0D%0A" + "%0D%0A");
    var signatureCombined = [signatureName, signatureTitle, signaturePlace].join("%0D%0A");
    var emailBodyText = [mainBodyText, signatureCombined].join("%0D%0A" + "%0D%0A");

    //Now we'll find the email button link:
    var emailButton = document.getElementById('email-button');

    //And attach an href attribute to it with this information:
    emailButton.href = "mailto:someone@example.com"
      + "?Subject=" + parsedSubject
      + "&body=" + emailBodyText

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

var CopyButton = React.createClass ({


  copyToClipboard() {

    //Let's get all of the elements
    var rawTextContent = document.getElementsByClassName('copy-body');
    var signatureName = document.getElementById('signatureName').textContent;
    var signatureTitle = document.getElementById('signatureTitle').textContent;
    var signaturePlace = document.getElementById('signaturePlace').textContent;

    //And push the raw content elements to an array:
    var mainTextContent = [];

    for (var i = 0; i < rawTextContent.length; i++) {
      mainTextContent.push(rawTextContent[i].textContent)
    }

    //Now bind everything together:   
    var finalTextContent = mainTextContent.join("\n\n");
    var signatureCombined = [signatureName, signatureTitle, signaturePlace].join("\n");

    var clipboardText = [finalTextContent, signatureCombined].join("\n\n");

    copyTextToClipboard(clipboardText)

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

var PrintButton = React.createClass ({

  printButton: function () {
    window.print();
  },

  render: function() {
    return (
      <div className="toolbar-button" onClick={this.printButton}>
        Print
      </div>
    )
  }
})

module.exports = {
  editSVG: EditSVG,
  copySVG: CopySVG,
  emailSVG: EmailSVG,
  refreshSVG: RefreshSVG,
  previewTextTools: PreviewTextTools,
  editButton: EditButton,
  emailButton: EmailButton,
  copyButton: CopyButton,
  printButton: PrintButton,
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