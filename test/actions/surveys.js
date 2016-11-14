/* eslint-disable no-unused-expressions */

import { expect } from 'chai';
import Immutable from 'immutable';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from 'src/actions';
import { SURVEYS_ACTION, NEW_SURVEY_ID, NEW_SURVEY } from 'src/constants';
import { mockSurveys, mockSurveysMetadata } from 'test/utils';

const mockStore = configureStore([thunk]);

describe('surveys actions', () => {
  it('should dispatch an action to fetch metadata when it is empty', () => {
    const store = mockStore({});

    store.dispatch(actions.fetchSurveysMetadata());

    // TODO(ayushbhagat): When the action makes a request to the backend, change the expectedActions
    // to mock that request.
    const expectedActions = {
      type: SURVEYS_ACTION.CHANGE_SURVEYS_METADATA,
      payload: {
        surveysMetadata: Immutable.fromJS(mockSurveysMetadata),
      },
    };
    const actualActions = store.getActions();
    expect(actualActions).to.deep.equal([expectedActions]);
  });

  it('should not dispatch an action to fetch metadata when it is not empty', () => {
    const initalState = {
      surveys: Immutable.fromJS({
        metadata: mockSurveysMetadata,
      }),
    };
    const store = mockStore(initalState);

    store.dispatch(actions.fetchSurveysMetadata());

    const actualActions = store.getActions();
    expect(actualActions).to.be.empty;
  });

  it('should dispatch actions to update cache and change survey when it is not in cache', () => {
    const store = mockStore({});

    const id = 1;
    store.dispatch(actions.fetchSurvey(id));

    const expectedAddSurveyToCacheAction = {
      type: SURVEYS_ACTION.ADD_SURVEY_TO_CACHE,
      payload: {
        id: id.toString(),
        survey: Immutable.fromJS(mockSurveys[id]),
      },
    };
    const expectedChangeSurveyAction = {
      type: SURVEYS_ACTION.CHANGE_SURVEY,
      payload: {
        id: id.toString(),
      },
    };
    const actualActions = store.getActions();
    expect(actualActions).to.deep.equal(
        [expectedAddSurveyToCacheAction, expectedChangeSurveyAction]);
  });

  it('should only dispatch action to change survey if survey is in cache', () => {
    const initalState = {
      surveys: Immutable.fromJS({
        cache: mockSurveys,
      }),
    };
    const store = mockStore(initalState);

    const id = 1;
    store.dispatch(actions.fetchSurvey(id));

    const expectedAction = {
      type: SURVEYS_ACTION.CHANGE_SURVEY,
      payload: {
        id: id.toString(),
      },
    };
    const actualActions = store.getActions();
    expect(actualActions).to.deep.equal([expectedAction]);
  });

  it('should only dispatch action to change survey if the survey is new', () => {
    const initalState = {
      surveys: Immutable.fromJS({
        cache: mockSurveys,
      }),
    };
    const store = mockStore(initalState);

    const id = NEW_SURVEY_ID;
    store.dispatch(actions.fetchSurvey(id));

    const expectedAction = {
      type: SURVEYS_ACTION.CHANGE_SURVEY,
      payload: {
        id,
      },
    };
    const actualActions = store.getActions();
    expect(actualActions).to.deep.equal([expectedAction]);
  });

  it('should dispatch actions to add survey to cache, metadata and change it', () => {
    const id = '1';
    const oldIdMetadata = '2';
    const initalState = {
      surveys: Immutable.fromJS({
        metadata: {
          [id]: mockSurveysMetadata[oldIdMetadata],
        },
        survey: {
          id,
          body: mockSurveys[id],
        },
      }),
    };
    const store = mockStore(initalState);

    store.dispatch(actions.saveSurvey());

    const expectedAddSurveyToCacheAction = {
      type: SURVEYS_ACTION.ADD_SURVEY_TO_CACHE,
      payload: {
        id,
        survey: Immutable.fromJS(mockSurveys[id]),
      },
    };
    const expectedChangeSurveyAction = {
      type: SURVEYS_ACTION.CHANGE_SURVEY,
      payload: {
        id,
      },
    };
    const expectedAddSurveyMetadataAction = {
      type: SURVEYS_ACTION.ADD_SURVEY_METADATA,
      payload: {
        id,
        surveyMetadata: Immutable.fromJS(mockSurveysMetadata[id]),
      },
    };
    const actualActions = store.getActions();
    expect(actualActions).to.deep.equal([
      expectedAddSurveyToCacheAction,
      expectedChangeSurveyAction,
      expectedAddSurveyMetadataAction,
    ]);
  });
});
