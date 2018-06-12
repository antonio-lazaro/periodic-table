import React from 'react';

export default class OCQuestionChoice extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    let questionClassName = "question_choice";
    if(this.props.checked){
      questionClassName += " checked";
    }
    let showCorrection = (this.props.questionAnswered);
    if(showCorrection){
      if(this.props.checked){
        if(this.props.choice.answer === true){
          questionClassName += " question_choice_correct";
        } else {
          questionClassName += " question_choice_incorrect";
        }
      } else if(this.props.choice.answer === true){
        questionClassName += " question_choice_correct";
      }
    }
    return (
      <div className={questionClassName} onClick={() => this.props.handleChange(this.props.choice)}>
          <p>{this.props.choice.value}</p>
      </div>
    );
  }
}