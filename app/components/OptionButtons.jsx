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
  }

  render() {
    return (
      <div id="option-buttons">
        <select name="levels" onChange={this.changeLevel.bind(this)}>
          <option value="1">Level 1</option>
          <option value="2">Level 2</option>
          <option value="3">Level 3</option>
          <option value="4">Level 4</option>
          <option value="5">Level 5</option>
          <option value="6">Level 6</option>
          <option value="7">Level 7</option>
          <option value="8">Level 8</option>
          <option value="9">Level 9</option>
        </select>
        <select name="language" onChange={this.changeLanguage.bind(this)}>
          <option value="en">en</option>
          <option value="es">es</option>
        </select>
      </div>
    );
  }
}