import React, { PropTypes } from 'react';
import PureComponent from 'react-pure-render/component';
import Immutable from 'immutable';

import Dropdown from 'components/Dropdown';
import MultipleChoiceQuestion from 'components/MultipleChoiceQuestion';
import { QUESTION_TYPE, MARGIN_BETWEEN_QUESTIONS, SELECTED_SURVEY_BODY_PADDING } from 'constants';

export default class SurveyQuestion extends PureComponent {
  static propTypes = {
    id: PropTypes.number.isRequired,
    question: PropTypes.instanceOf(Immutable.Map).isRequired,
    isFocused: PropTypes.bool.isRequired,
    setQuestionInFocus: PropTypes.func.isRequired,
    nextQuestionOptions: PropTypes.array.isRequired,
  };

  renderQuestionTypeDropdown() {
    const { question } = this.props;
    const questionType = question.get('type');
    return (
      <div style={styles.questionTypeDropdownContainer}>
        <Dropdown
          selectedValue={questionType}
          options={{
            ...Object.keys(QUESTION_TYPE).map(type => ({
              value: type,
              words: type
                  .split('_')
                  .map(word => word.charAt(0).toUpperCase() + word.toLowerCase().substring(1))
                  .reduce((acc, cur) => `${acc} ${cur}`),
            })).reduce((acc, cur) => ({ ...acc, [cur.value]: cur.words }), {}),
          }}
          onChange={newValue => console.log(newValue)}
          width={180}
        />
      </div>
    );
  }

  renderSpecificQuestion() {
    const { id, question, nextQuestionOptions } = this.props;
    switch (question.get('type')) {
      case QUESTION_TYPE.SHORT_ANSWER:
        return (<div>Short Answer</div>);
      case QUESTION_TYPE.MULTIPLE_CHOICE:
        return (
          <MultipleChoiceQuestion
            id={id}
            question={question}
            nextQuestionOptions={nextQuestionOptions}
          />
        );
      case QUESTION_TYPE.TRUE_FALSE:
        return (<div>True False</div>);
      default:
        return (<div>Nothing</div>);
    }
  }

  render() {
    const { id, question, isFocused, setQuestionInFocus } = this.props;
    console.log(id);
    console.log(question);
    console.log(isFocused);
    return (
      <div
        style={{
          ...styles.questionContainer,
          ...(isFocused ? styles.onClickQuestion : {}),
        }}
        onClick={() => setQuestionInFocus()}
      >
        { isFocused && this.renderQuestionTypeDropdown() }
        { this.renderSpecificQuestion() }
      </div>
    );
  }
}

const styles = {
  questionContainer: {
    padding: `${MARGIN_BETWEEN_QUESTIONS} ${SELECTED_SURVEY_BODY_PADDING}`,
  },
  onClickQuestion: {
    border: '1px solid red',
  },
  questionTypeDropdownContainer: {
    marginBottom: MARGIN_BETWEEN_QUESTIONS,
  },
};
