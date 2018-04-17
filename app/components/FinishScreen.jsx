import React from 'react';
import './../assets/scss/finish_screen.scss';

import { changePage } from '../reducers/actions.jsx';

import { PAGES } from '../constants/constants.jsx';

export default class FinishScreen extends React.Component {
  constructor(props){
    super(props);
  }

  handleClick() {
    this.props.dispatch(changePage(PAGES.LEARN_PAGE));
  }

  _getFinishScreenTitle(progress_measure, score){
    let finishTitleText;
    let hasProgressMeasure = (typeof progress_measure === "number");
    let hasScore = (typeof score === "number");
    if(hasProgressMeasure && hasScore){
      finishTitleText = this.props.I18n.getTrans("i.finish_screen_title_full", {progress_measure:(progress_measure * 100), score:(score * 100)});
    } else if(hasProgressMeasure){
      finishTitleText = this.props.I18n.getTrans("i.finish_screen_title_wpm", {progress_measure:(progress_measure * 100)});
    } else if(hasScore){
      finishTitleText = this.props.I18n.getTrans("i.finish_screen_title_ws", {score:(score * 100)});
    }
    if(typeof finishTitleText === "undefined"){
      finishTitleText = this.props.I18n.getTrans("i.finish_screen_title_simple");
    }
    return finishTitleText;
  }
  render(){
    let finishTitleText = this._getFinishScreenTitle(this.props.tracking.progress_measure, this.props.tracking.score);
    return (
      <div className="finish_screen">
        <p id="finish_title">{finishTitleText}</p>
        <button type="button" onClick={this.handleClick.bind(this)}>Go to Periodic Table!</button>
      </div>
    );
  }
}