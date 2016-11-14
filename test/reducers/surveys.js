import chai, { assert, expect } from 'chai';
import chaiImmutable from 'chai-immutable';
import Immutable from 'immutable';

import { NEW_SURVEY_ID, NEW_SURVEY, SURVEYS_ACTION } from 'src/constants';
import { surveys } from 'src/reducers';
import { mockSurveys, mockSurveysMetadata } from 'test/utils';

chai.use(chaiImmutable);

describe('surveys reducer', () => {
  it('should return the initial state', () => {
    expect(surveys(undefined, {})).to.deep.equal(Immutable.fromJS({
      metadata: {},
      cache: {},
      survey: {},
    }));
  });

  it('should add survey metadata for empty state', () => {
    const id = '1';
    const action = {
      type: SURVEYS_ACTION.ADD_SURVEY_METADATA,
      payload: {
        id,
        surveyMetadata: Immutable.fromJS(mockSurveysMetadata[id]),
      },
    };
    const expectedState = Immutable.fromJS({
      metadata: {
        [id]: mockSurveysMetadata[id],
      },
      cache: {},
      survey: {},
    });
    expect(surveys(undefined, action)).to.deep.equal(expectedState);
  });

  it('should add survey metadata for existing state without removing from it', () => {
    const id = '1';
    const mockSurveysMetadataLess = { ...mockSurveysMetadata };
    delete mockSurveysMetadataLess[id];
    const initialState = Immutable.fromJS({
      metadata: mockSurveysMetadataLess,
    });
    const action = {
      type: SURVEYS_ACTION.ADD_SURVEY_METADATA,
      payload: {
        id,
        surveyMetadata: Immutable.fromJS(mockSurveysMetadata[id]),
      },
    };
    const expectedState = Immutable.fromJS({
      metadata: mockSurveysMetadata,
    });
    assert.notDeepEqual(initialState, expectedState);
    expect(surveys(initialState, action)).to.deep.equal(expectedState);
  });

  it('should change surveys metadata for empty state', () => {
    const action = {
      type: SURVEYS_ACTION.CHANGE_SURVEYS_METADATA,
      payload: {
        surveysMetadata: Immutable.fromJS(mockSurveysMetadata),
      },
    };
    const expectedState = Immutable.fromJS({
      metadata: mockSurveysMetadata,
      cache: {},
      survey: {},
    });
    expect(surveys(undefined, action)).to.deep.equal(expectedState);
  });

  it('should replace surveys metadata for existing state', () => {
    const initialState = Immutable.fromJS({
      metadata: mockSurveysMetadata['1'],
    });
    const action = {
      type: SURVEYS_ACTION.CHANGE_SURVEYS_METADATA,
      payload: {
        surveysMetadata: Immutable.fromJS(mockSurveysMetadata),
      },
    };
    const expectedState = Immutable.fromJS({
      metadata: mockSurveysMetadata,
    });
    assert.notDeepEqual(initialState, expectedState);
    expect(surveys(initialState, action)).to.deep.equal(expectedState);
  });

  it('should add survey to an empty cache', () => {
    const id = '1';
    const action = {
      type: SURVEYS_ACTION.ADD_SURVEY_TO_CACHE,
      payload: {
        id,
        survey: Immutable.fromJS(mockSurveys[id]),
      },
    };
    const expectedState = Immutable.fromJS({
      metadata: {},
      cache: {
        [id]: mockSurveys[id],
      },
      survey: {},
    });
    expect(surveys(undefined, action)).to.deep.equal(expectedState);
  });

  it('should add survey to an existing cache without changing any other surveys', () => {
    const id = '1';
    const mockSurveysLess = { ...mockSurveys };
    delete mockSurveysLess[id];
    assert.notDeepEqual(mockSurveysLess, mockSurveys);
    const initialState = Immutable.fromJS({
      cache: mockSurveysLess,
    });
    const action = {
      type: SURVEYS_ACTION.ADD_SURVEY_TO_CACHE,
      payload: {
        id,
        survey: Immutable.fromJS(mockSurveys[id]),
      },
    };
    const expectedState = Immutable.fromJS({
      cache: mockSurveys,
    });
    assert.notDeepEqual(initialState, expectedState);
    expect(surveys(initialState, action)).to.deep.equal(expectedState);
  });

  it('should change survey to the survey from cache if id is not new', () => {
    const id = '1';
    const initialStateObject = {
      cache: mockSurveys,
    };
    const initialState = Immutable.fromJS(initialStateObject);
    const action = {
      type: SURVEYS_ACTION.CHANGE_SURVEY,
      payload: {
        id,
      },
    };
    const expectedState = Immutable.fromJS({
      ...initialStateObject,
      survey: {
        id,
        body: initialStateObject.cache[id],
      },
    });
    assert.notDeepEqual(initialState, expectedState);
    expect(surveys(initialState, action)).to.deep.equal(expectedState);
  });

  it('should change survey to the default new survey if id is new', () => {
    const id = NEW_SURVEY_ID;
    const initialStateObject = {
      cache: mockSurveys,
    };
    const initialState = Immutable.fromJS(initialStateObject);
    const action = {
      type: SURVEYS_ACTION.CHANGE_SURVEY,
      payload: {
        id,
      },
    };
    const expectedState = Immutable.fromJS({
      ...initialStateObject,
      survey: NEW_SURVEY,
    });
    assert.notDeepEqual(initialState, expectedState);
    expect(surveys(initialState, action)).to.deep.equal(expectedState);
  });
});
