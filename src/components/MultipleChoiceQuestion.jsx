import React, { PropTypes } from 'react';
import PureComponent from 'react-pure-render/component';
import Immutable from 'immutable';

import Dropdown from 'components/Dropdown';
import { NEXT_QUESTION_DROPDOWN_WIDTH } from 'constants';

export default class MultipleChoiceQuestion extends PureComponent {
  static propTypes = {
    id: PropTypes.number.isRequired,
    question: PropTypes.instanceOf(Immutable.Map).isRequired,
    nextQuestionOptions: PropTypes.array.isRequired,
  };

  render() {
    const { id, question, nextQuestionOptions } = this.props;
    const defaultNextQuestionId = question.get('default_next_question_id');
    return (
      <div>
        <div>{question.get('text')}</div>
        <div style={styles.options}>
          { question.get('options') && question.get('options').map((option, index) => (
            <div key={index} style={styles.option}>
              <div
                style={{
                  ...styles.key,
                  ...styles.item,
                }}
              >
                {option.get('key')}
              </div>
              <div
                style={{
                  ...styles.optionText,
                  ...styles.item,
                }}
              >
                {option.get('text')}
              </div>
              <div
                style={{
                  ...styles.nextQuestionDropdown,
                  ...styles.item,
                }}
              >
                { /* TODO(ayushbhagat): Handle the case where default_next_question_id === -1 and
                option.next_question_id === -1 (i.e. the conditional question is the last
                question). */ }
                <Dropdown
                  selectedValue={defaultNextQuestionId === -1
                    ? `${option.get('next_question_id')}`
                    : `${defaultNextQuestionId}`}
                  options={{
                    ...nextQuestionOptions.map(questionId => id !== questionId && ({
                      value: `${questionId}`,
                      words: `Continue to Question ${questionId + 1}`,
                    })).reduce((acc, cur) => ({ ...acc, [cur.value]: cur.words }), {}),
                  }}
                  onChange={newValue => console.log(newValue)}
                  width={NEXT_QUESTION_DROPDOWN_WIDTH}
                />
              </div>
              <div
                style={{
                  ...styles.remove,
                  ...styles.item,
                }}
              >
                X
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const optionTextSize = '14px';
const styles = {
  options: {
  },
  option: {
    display: 'flex',
    margin: '10px 0',
  },
  key: {
    marginRight: '10px',
    fontSize: optionTextSize,
  },
  optionText: {
    fontSize: optionTextSize,
  },
  nextQuestionDropdown: {
    marginLeft: 'auto',
  },
  remove: {
    marginLeft: '20px',
    cursor: 'pointer',
  },
  item: {
    marginTop: 'auto',
  },
};
