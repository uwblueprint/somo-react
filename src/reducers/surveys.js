import Immutable from 'immutable';

import { SURVEYS_ACTION, NEW_SURVEY, NEW_SURVEY_ID } from 'constants';

// Add the survey metadata to the existing metadata stored in the state.
function addSurveyMetadata(state, payload) {
  const { id, surveyMetadata } = payload;
  return state.setIn(['metadata', id], surveyMetadata);
}

// Add the survey metadata to the state. The payload contains the data as an object.
// TODO(ayushbhagat): For now, this method replaces the metadata everytime it is called. Change it
// so that instead of replacing the metadata on every call, it adds to the metadata. The use case
// for this is pagination (with loading). This will also require changing the fetchSurveysMetadata
// method in actions.
function changeSurveysMetadata(state, payload) {
  const { surveysMetadata } = payload;
  return state.set('metadata', surveysMetadata);
}

// Add the survey to the cache. The payload contains the data as an object.
function addSurveyToCache(state, payload) {
  const { id, survey } = payload;
  return state.setIn(['cache', id], survey);
}

// Change the survey stored in the state to the survey that is being displayed. If id is
// NEW_SURVEY_ID, then change it to a new survey. Ensure that if the id passed in the payload is not
// NEW_SURVEY_ID, then the id is in the cache. The payload contains the data as an object.
function changeSurvey(state, payload) {
  const { id } = payload;
  let newSurvey = NEW_SURVEY;
  if (id !== NEW_SURVEY_ID) {
    newSurvey = {
      id,
      body: state.getIn(['cache', id]),
    };
  }
  return state.set('survey', Immutable.fromJS(newSurvey));
}

const INITIAL_STATE = Immutable.fromJS({
  metadata: {},
  cache: {},
  survey: {},
});

export function surveys(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SURVEYS_ACTION.ADD_SURVEY_METADATA:
      return addSurveyMetadata(state, action.payload);
    case SURVEYS_ACTION.CHANGE_SURVEYS_METADATA:
      return changeSurveysMetadata(state, action.payload);
    case SURVEYS_ACTION.ADD_SURVEY_TO_CACHE:
      return addSurveyToCache(state, action.payload);
    case SURVEYS_ACTION.CHANGE_SURVEY:
      return changeSurvey(state, action.payload);
    default:
      return state;
  }
}
