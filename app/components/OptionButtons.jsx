import React from 'react';
import './../assets/scss/main.scss';

import { updateUserProfile } from '../reducers/actions';

export default class OptionButtons extends React.Component {
  changeLevel(event) {
    let userProfile = this.props.user_profile;
    userProfile.learner_preference.difficulty = parseInt(event.target.value);
    this.props.dispatch(updateUserProfile(userProfile))
  }

  changeLanguage(event) {
    this.props.I18n.setLanguage(event.target.value);
    this.props.forceRender();
  }

  render() {
    // Levels
    var levels = [];
    for(var i = 0; i < 9; i++) {
      if(i == this.props.user_profile.learner_preference.difficulty) {
        levels.push(<option key={i} selected value={i+1}>{this.props.I18n.getTrans("i.level")+ ' ' + (i+1)}</option>);
      } else {
        levels.push(<option key={i} value={i+1}>{this.props.I18n.getTrans("i.level") + ' ' + (i+1)}</option>);
      }
    }

    // Languages
    var validLns = ["en", "es"];
    var lns = [];
    for(var i = 0; i < validLns.length; i++) {
      if(validLns[i] == this.props.I18n.getLanguage()) {
        lns.push(<option key={i} selected value={validLns[i]}>{validLns[i]}</option>);
      } else {
        lns.push(<option key={i} value={validLns[i]}>{validLns[i]}</option>);
      }
    }

    return (
      <div id="option-buttons">
        <select name="levels" onChange={this.changeLevel.bind(this)}>
          {levels}
        </select>
        <select name="language" onChange={this.changeLanguage.bind(this)}>
          {lns}
        </select>
      </div>
    );
  }
}