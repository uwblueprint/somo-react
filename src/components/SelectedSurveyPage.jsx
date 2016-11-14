import React, { PropTypes } from 'react';
import PureComponent from 'react-pure-render/component';

export default class SelectedSurveyPage extends PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    survey: PropTypes.object.isRequired,
    fetchSurvey: PropTypes.func.isRequired,
    saveSurvey: PropTypes.func.isRequired,
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  };

  componentDidMount() {
    const { id, fetchSurvey } = this.props;
    fetchSurvey(id);
  }

  render() {
    const { id, survey, saveSurvey } = this.props;
    const { router } = this.context;
    console.log(survey);
    return (
      <div>
        <div>
          This is the SelectedSurveyPage with id { id }.
        </div>
        <div onClick={() => saveSurvey()}>
          Click here to save survey.
        </div>
      </div>
    );
  }
}
