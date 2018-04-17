import React from 'react';

export default class Header extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    let loggedText;
    let trackingTexts = [];
      

    // User
    if (this.props.user_profile) {
      // Name
      if ((typeof this.props.user_profile.name === "string")) {
        trackingTexts.push(this.props.I18n.getTrans("i.user") + ": " + this.props.user_profile.name);
      }

      // Dificulty
      if (typeof this.props.user_profile.learner_preference === "object") {
        if (typeof this.props.user_profile.learner_preference.difficulty === "number") {
          trackingTexts.push(this.props.I18n.getTrans("i.difficulty") + ": " + this.props.user_profile.learner_preference.difficulty);
        }
      }
    }

    // Score
    if (typeof this.props.tracking.score === "number") {
      trackingTexts.push(this.props.I18n.getTrans("i.score") + ": " + (this.props.tracking.score * 100).toFixed(1) + "%");
    } else {
      trackingTexts.push(this.props.I18n.getTrans("i.score") + ": null");
    }

    let trackingEls = trackingTexts.map(function(text, index) {
      return <span key={index}>{text}</span>;
    });

    return (
      <div className="header_wrapper">
        <p id="tracking">{trackingEls}</p>
      </div>
    );
  }
}