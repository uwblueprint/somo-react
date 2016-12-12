import Immutable from 'immutable';

import { NEW_SURVEY_ID, NEW_SURVEY_BODY, SURVEYS_ACTION } from 'constants';

// TODO(ayushbhagat): Remove this when backend requests are made to fetch the data instead of using
// the mock data that is meant only to be used in testing.
import { mockSurveys, mockSurveysMetadata } from '../../test/utils';

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
  return (dispatch) => {
    // TODO(ayushbhagat): Make the get request to get the metadata for the surveys, instead of
    // getting it from the mock data.
    dispatch(changeSurveysMetadata(mockSurveysMetadata));
  };
}

function changeSurvey(id, body) {
  return {
    type: SURVEYS_ACTION.CHANGE_SURVEY,
    payload: {
      id,
      body,
    },
  };
}

// Fetch the survey from the backend. If the survey doesn't exist, create a new one.
export function fetchSurvey(id) {
  return (dispatch) => {
    // TODO(ayushbhagat): Make a get request to retrieve the survey with the given id, instead of
    // getting it from the mock data.
    let body = {};
    if (id === NEW_SURVEY_ID) {
      body = NEW_SURVEY_BODY;
    } else if (id.toString() in mockSurveys) {
      body = mockSurveys[id.toString()];
    } else {
      // TODO(ayushbhagat): If the survey is not found, show PageNotFound.jsx.
    }
    dispatch(changeSurvey(id, body));
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
    // Do this to ensure that the survey in the application state is updated if the response
    // returned from the backend is different from the survey stored in the state. An example of
    // this is when a new survey is sent to the backend to be saved.
    // TODO(ayushbhagat): Replace the survey passed to the survey in the request response.
    dispatch(changeSurvey(id, surveys.getIn(['survey', 'body']).toJS()));
  };
}
