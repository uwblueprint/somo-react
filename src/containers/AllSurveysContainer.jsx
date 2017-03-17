import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable';

import { fetchSurveysMetadata } from 'actions';
import AllSurveysPage from 'components/AllSurveysPage';
import {
  getDraftSurveysMetadata,
  getPublishedSurveysMetadata,
  getSentSurveysMetadata,
} from 'selectors';

class AllSurveysContainer extends PureComponent {
  static propTypes = {
    draftSurveys: PropTypes.instanceOf(Immutable.Map).isRequired,
    publishedSurveys: PropTypes.instanceOf(Immutable.Map).isRequired,
    sentSurveys: PropTypes.instanceOf(Immutable.Map).isRequired,
    fetchSurveysMetadata: PropTypes.func.isRequired,
  };

  render() {
    return (
      <AllSurveysPage {...this.props} />
    );
  }
}

const mapStateToProps = state => ({
  draftSurveys: getDraftSurveysMetadata(state.surveys),
  publishedSurveys: getPublishedSurveysMetadata(state.surveys),
  sentSurveys: getSentSurveysMetadata(state.surveys),
});

const mapDispatchToProps = dispatch => ({
  fetchSurveysMetadata: () => dispatch(fetchSurveysMetadata()),
});

export default AllSurveysContainer =
    connect(mapStateToProps, mapDispatchToProps)(AllSurveysContainer);
