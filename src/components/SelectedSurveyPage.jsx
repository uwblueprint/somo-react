import React, { PureComponent, PropTypes } from 'react';
import Immutable from 'immutable';

import SurveyQuestion from 'components/SurveyQuestion';
import { MARGIN_BETWEEN_QUESTIONS, SELECTED_SURVEY_BODY_PADDING } from 'constants';

export default class SelectedSurveyPage extends PureComponent {
  static propTypes = {
    id: PropTypes.number.isRequired,
    survey: PropTypes.instanceOf(Immutable.Map).isRequired,
    fetchSurvey: PropTypes.func.isRequired,
    saveSurvey: PropTypes.func.isRequired,
  };

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  };

  state = {
    questionInFocus: -1,
  };

  componentWillMount() {
    const { id, fetchSurvey } = this.props;
    fetchSurvey(id);
  }

  // TODO(ayushbhagat): Check for cycles.
  getValidNextQuestionOptions = (id) => {
    const { survey } = this.props;
    const questions = survey.getIn(['body', 'questions']);
    const options = [];
    for (let questionId = 0; questionId < questions.size; questionId++) {
      if (questionId !== id) {
        options.push(questionId);
      }
    }
    return options;
  }

  renderMetadata() {
    const { survey } = this.props;
    const name = survey.getIn(['body', 'name']);
    const description = survey.getIn(['body', 'description']);
    if (name !== null && description !== null) {
      return (
        <div style={styles.metadataContainer}>
          <div style={styles.name}>{name}</div>
          <div style={styles.description}>{description}</div>
        </div>
      );
    }
    return null;
  }

  renderQuestions() {
    const { survey } = this.props;
    const questions = survey.getIn(['body', 'questions']);
    return (
      <div>
        { questions &&
          questions.map((question, questionId) => (
            <SurveyQuestion
              key={questionId}
              id={questionId}
              question={question}
              isFocused={this.state.questionInFocus === questionId}
              setQuestionInFocus={() => this.setState({ questionInFocus: questionId })}
              nextQuestionOptions={this.getValidNextQuestionOptions(questionId)}
            />
          )).toJS()
        }
      </div>
    );
  }

  render() {
    const { id, survey, saveSurvey } = this.props;
    const { router } = this.context;
    return (
      <div style={{ paddingTop: '50px' }}>
        <div style={styles.surveyContainer}>
          { /* <div>
            This is the SelectedSurveyPage with id { id }.
          </div>
          <div onClick={() => saveSurvey()}>
            Click here to save survey.
          </div> */ }
          { this.renderMetadata() }
          { this.renderQuestions() }
        </div>
      </div>
    );
  }
}

const styles = {
  surveyContainer: {
    margin: '0px auto',
    paddingTop: SELECTED_SURVEY_BODY_PADDING,
    width: '800px',
    background: '#ffffff',
  },
  metadataContainer: {
    marginLeft: SELECTED_SURVEY_BODY_PADDING,
    marginRight: SELECTED_SURVEY_BODY_PADDING,
    marginBottom: MARGIN_BETWEEN_QUESTIONS,
  },
  name: {
    fontSize: SELECTED_SURVEY_BODY_PADDING,
    marginBottom: MARGIN_BETWEEN_QUESTIONS,
  },
  description: {
    color: 'grey',
  },
};
