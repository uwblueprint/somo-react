import React, { PropTypes } from 'react';
import PureComponent from 'react-pure-render/component';

import SelectedSurveyPage from '../components/SelectedSurveyPage.jsx';

export default class SelectedSurveyContainer extends PureComponent {
  static propTypes = {
    params: PropTypes.object,
  }

  render() {
    return (
      <SelectedSurveyPage
        {...this.props.params}
      />
    );
  }
}
