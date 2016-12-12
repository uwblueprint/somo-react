/* eslint-disable no-unused-expressions */

import { expect } from 'chai';
import Immutable from 'immutable';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from 'src/actions';
import { SURVEYS_ACTION, NEW_SURVEY_ID, NEW_SURVEY_BODY } from 'src/constants';
import { mockSurveys, mockSurveysMetadata } from 'test/utils';

const mockStore = configureStore([thunk]);

describe('surveys actions', () => {
  it('should dispatch action to fetch metadata', () => {
    const store = mockStore({});

    store.dispatch(actions.fetchSurveysMetadata());

    // TODO(ayushbhagat): When the action makes a request to the backend, change the expectedAction
    // to mock that request.
    const expectedAction = {
      type: SURVEYS_ACTION.CHANGE_SURVEYS_METADATA,
      payload: {
        surveysMetadata: mockSurveysMetadata,
      },
    };
    const actualActions = store.getActions();
    expect(actualActions).to.deep.equal([expectedAction]);
  });

  it('should dispatch action to change an existing survey', () => {
    const store = mockStore({});

    const id = '1';
    store.dispatch(actions.fetchSurvey(id));

    const expectedAction = {
      type: SURVEYS_ACTION.CHANGE_SURVEY,
      payload: {
        id,
        body: mockSurveys[id],
      },
    };
    const actualActions = store.getActions();
    expect(actualActions).to.deep.equal([expectedAction]);
  });

  it('should dispatch action to change the survey to a new one based on the input id', () => {
    const store = mockStore({});

    store.dispatch(actions.fetchSurvey(NEW_SURVEY_ID));

    const expectedAction = {
      type: SURVEYS_ACTION.CHANGE_SURVEY,
      payload: {
        id: NEW_SURVEY_ID,
        body: NEW_SURVEY_BODY,
      },
    };
    const actualActions = store.getActions();
    expect(actualActions).to.deep.equal([expectedAction]);
  });

  it('should dispatch actions to change the survey when trying to save it', () => {
    const id = '1';
    const initalState = {
      surveys: Immutable.fromJS({
        survey: {
          id,
          body: mockSurveys[id],
        },
      }),
    };
    const store = mockStore(initalState);

    store.dispatch(actions.saveSurvey());

    const expectedAction = {
      type: SURVEYS_ACTION.CHANGE_SURVEY,
      payload: {
        id,
        body: mockSurveys[id],
      },
    };
    const actualActions = store.getActions();
    expect(actualActions).to.deep.equal([expectedAction]);
  });
});
