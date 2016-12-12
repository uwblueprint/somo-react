import Immutable from 'immutable';

import { SURVEYS_ACTION } from 'constants';

// Add the survey metadata to the state.
// TODO(ayushbhagat): For now, this method replaces the metadata everytime it is called. Change it
// so that instead of replacing the metadata on every call, it adds to the metadata. The use case
// for this is pagination (with loading). This will also require changing the fetchSurveysMetadata
// method in actions.
function changeSurveysMetadata(state, payload) {
  const { surveysMetadata } = payload;
  return state.set('metadata', Immutable.fromJS(surveysMetadata));
}

// Change the survey stored in the state to the survey that is being displayed.
function changeSurvey(state, payload) {
  const { id, body } = payload;
  return state.setIn(['survey', 'id'], id).setIn(['survey', 'body'], Immutable.fromJS(body));
}

const INITIAL_STATE = Immutable.fromJS({
  metadata: {},
  survey: {},
});

export function surveys(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SURVEYS_ACTION.CHANGE_SURVEYS_METADATA:
      return changeSurveysMetadata(state, action.payload);
    case SURVEYS_ACTION.CHANGE_SURVEY:
      return changeSurvey(state, action.payload);
    default:
      return state;
  }
}
