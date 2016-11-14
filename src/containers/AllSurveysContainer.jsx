import Immutable from 'immutable';
import React, { PropTypes } from 'react';
import PureComponent from 'react-pure-render/component';
import { connect } from 'react-redux';

import { fetchSurveysMetadata } from 'actions';
import AllSurveysPage from 'components/AllSurveysPage';
import { getSentSurveysMetadata, getUnsentSurveysMetadata } from 'selectors';

class AllSurveysContainer extends PureComponent {
  static propTypes = {
    sentSurveys: PropTypes.instanceOf(Immutable.Map).isRequired,
    unsentSurveys: PropTypes.instanceOf(Immutable.Map).isRequired,
    fetchSurveysMetadata: PropTypes.func.isRequired,
  };

  render() {
    return (
      <AllSurveysPage {...this.props} />
    );
  }
}

const mapStateToProps = state => ({
  sentSurveys: getSentSurveysMetadata(state),
  unsentSurveys: getUnsentSurveysMetadata(state),
});

const mapDispatchToProps = dispatch => ({
  fetchSurveysMetadata: () => dispatch(fetchSurveysMetadata()),
});

export default AllSurveysContainer =
    connect(mapStateToProps, mapDispatchToProps)(AllSurveysContainer);
