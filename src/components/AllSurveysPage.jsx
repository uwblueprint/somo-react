import Immutable from 'immutable';
import React, { PropTypes } from 'react';
import PureComponent from 'react-pure-render/component';

import { ALL_SURVEYS_PAGE, NEW_SURVEY_PAGE } from 'constants';
import { formPath } from 'utils';

export default class AllSurveysPage extends PureComponent {
  static propTypes = {
    draftSurveys: PropTypes.instanceOf(Immutable.Map).isRequired,
    publishedSurveys: PropTypes.instanceOf(Immutable.Map).isRequired,
    sentSurveys: PropTypes.instanceOf(Immutable.Map).isRequired,
    fetchSurveysMetadata: PropTypes.func.isRequired,
  };

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  };

  componentWillMount() {
    this.props.fetchSurveysMetadata();
  }

  render() {
    const { draftSurveys, publishedSurveys, sentSurveys } = this.props;
    const { router } = this.context;
    console.log(draftSurveys);
    console.log(publishedSurveys);
    console.log(sentSurveys);
    return (
      <div>
        <div>
          This is the AllSurveysPage.
        </div>
        <div onClick={() => router.push(formPath([ALL_SURVEYS_PAGE, NEW_SURVEY_PAGE]))}>
          Click here to create a new survey.
        </div>
        <div onClick={() => router.push(formPath([ALL_SURVEYS_PAGE, 1]))}>
          Click here to go to survey 1.
        </div>
      </div>
    );
  }
}
