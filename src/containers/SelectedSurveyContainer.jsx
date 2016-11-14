import React, { PropTypes } from 'react';
import PureComponent from 'react-pure-render/component';
import { connect } from 'react-redux';

import { fetchSurvey, saveSurvey } from 'actions';
import SelectedSurveyPage from 'components/SelectedSurveyPage';
import { getSurvey } from 'selectors';

class SelectedSurveyContainer extends PureComponent {
  static propTypes = {
    params: PropTypes.object.isRequired,
    survey: PropTypes.object.isRequired,
    fetchSurvey: PropTypes.func.isRequired,
    saveSurvey: PropTypes.func.isRequired,
  }

  render() {
    const selectedSurveyPageProps = { ...this.props };
    delete selectedSurveyPageProps.params;
    selectedSurveyPageProps.id = this.props.params.id;
    return (
      <SelectedSurveyPage {...selectedSurveyPageProps} />
    );
  }
}

const mapStateToProps = state => ({
  survey: getSurvey(state),
});

const mapDispatchToProps = dispatch => ({
  fetchSurvey: id => dispatch(fetchSurvey(id)),
  saveSurvey: () => dispatch(saveSurvey()),
});

export default SelectedSurveyContainer =
    connect(mapStateToProps, mapDispatchToProps)(SelectedSurveyContainer);
