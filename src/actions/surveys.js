import Immutable from 'immutable';

import { NEW_SURVEY_ID, SURVEYS_ACTION } from 'constants';

// TODO(ayushbhagat): Remove this when backend requests are made to fetch the data instead of using
// the mock data that is meant only to be used in testing.
import { mockSurveys, mockSurveysMetadata } from '../../test/utils';

function addSurveyMetadata(id, surveyMetadata) {
  return {
    type: SURVEYS_ACTION.ADD_SURVEY_METADATA,
    payload: {
      id,
      surveyMetadata,
    },
  };
}

// Acts like a batch add, so that addSurveyMetadata doens't need to be called multiple times.
function changeSurveysMetadata(surveysMetadata) {
  return {
    type: SURVEYS_ACTION.CHANGE_SURVEYS_METADATA,
    payload: {
      surveysMetadata,
    },
  };
}

// Fetch the surveys metadata from the backend.
export function fetchSurveysMetadata() {
  return (dispatch, getState) => {
    const { surveys } = getState();
    // If surveys metadata is already in the application state, don't request it again.
    if (surveys && !surveys.get('metadata').isEmpty()) {
      return;
    }
    // TODO(ayushbhagat): Make the get request to get the metadata for the surveys, instead of
    // getting it from the mock data.
    dispatch(changeSurveysMetadata(Immutable.fromJS(mockSurveysMetadata)));
  };
}

function addSurveyToCache(id, survey) {
  return {
    type: SURVEYS_ACTION.ADD_SURVEY_TO_CACHE,
    payload: {
      id,
      survey,
    },
  };
}

function changeSurvey(id) {
  return {
    type: SURVEYS_ACTION.CHANGE_SURVEY,
    payload: {
      id,
    },
  };
}

// Fetch the survey from the backend. If the survey doesn't exist, create a new one.
// If the survey is in the cache, dispatch an action to change the current survey to it.
// Otherwise, try fetching the survey.
// If it is in the database, dispatch actions to add it to cache and to change the current survey to
// it.
// Otherwise, dispatch an action to change the current survey to a new one.
export function fetchSurvey(idNum) {
  return (dispatch, getState) => {
    const { surveys } = getState();
    const id = idNum.toString();
    // If the survey is already in the cache, then don't request it again, take it directly from the
    // cache.
    if (surveys && surveys.get('cache').has(id)) {
      dispatch(changeSurvey(id));
      return;
    }
    // TODO(ayushbhagat): Make a get request to retrieve the survey with the given id, instead of
    // getting it from the mock data.
    // If it is a new survey, then don't add it to the cache.
    if (!(id in mockSurveys)) {
      dispatch(changeSurvey(NEW_SURVEY_ID));
      return;
    }
    // Otherwise, add it to the cache and update the survey stored in the state.
    dispatch(addSurveyToCache(id, Immutable.fromJS(mockSurveys[id])));
    dispatch(changeSurvey(id));
  };
}

// Save the survey in the state to the backend.
// TODO(ayushbhagat): Note that this function currently passes part of the state when dispatching
// the action. However, this is bad because the state should be manipulated in the reducer (since
// that is what it is meant to do). However, this is done here because in the future when saving a
// survey will make a post request to the backend, the response that the backend sends should be
// passed into the action. So, it is done this way to simulate that.
export function saveSurvey() {
  return (dispatch, getState) => {
    const { surveys } = getState();
    // TODO(ayushbhagat): Make a post request to send the survey to the backend so that it can
    // persist it.
    // TODO(ayushbhagat): For now, calculate its id if the survey is new. Later, change it so that
    // the survey that is sent in the response is saved (since that will have the id).
    // Note that survey is guaranteed to exist, since this action would have only been dispatched
    // when on the survey editing page, which populates the survey state.
    let id = surveys.getIn(['survey', 'id']);
    if (id === NEW_SURVEY_ID) {
      id = Math.max(...Object.keys(mockSurveys).map(num => parseInt(num, 10))) + 1;
    }
    dispatch(addSurveyToCache(id, surveys.getIn(['survey', 'body'])));
    // Do this to ensure that the survey in the application state is updated if the response
    // returned from the backend is different from the survey stored in the state. An example of
    // this is when a new survey is sent to the backend to be saved.
    dispatch(changeSurvey(id));
    // Update the survey metadata in the state, in case the information relevant to the metadata was
    // changed in the survey.
    dispatch(addSurveyMetadata(id, Immutable.fromJS({
      name: surveys.getIn(['survey', 'body', 'name']),
      is_sent: surveys.getIn(['survey', 'body', 'is_sent']),
    })));
  };
}
