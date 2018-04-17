import React from 'react';
import { connect } from 'react-redux';
import './../assets/scss/main.scss';

import LearnPage from './LearnPage.jsx';
import QuizPage from './QuizPage.jsx';

import { PAGES } from '../constants/constants.jsx';

export class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let appContent = "";

    switch (this.props.page) {
      case PAGES.LEARN_PAGE:
        appContent = (<LearnPage />);
        break;
      case PAGES.QUIZ_PAGE:
        appContent = (<QuizPage />);
        break;
      default:
        appContent = (<LearnPage />);
    }

    return (
      <div id="container">
        {appContent}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    page: state.page
  };
}

export default connect(mapStateToProps)(App);