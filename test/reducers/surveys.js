import chai, { assert, expect } from 'chai';
import chaiImmutable from 'chai-immutable';
import Immutable from 'immutable';

import { NEW_SURVEY_ID, SURVEYS_ACTION } from 'src/constants';
import { surveys } from 'src/reducers';
import { mockSurveys, mockSurveysMetadata } from 'test/utils';

chai.use(chaiImmutable);

describe('surveys reducer', () => {
  it('should return the initial state', () => {
    expect(surveys(undefined, {})).to.deep.equal(Immutable.fromJS({
      metadata: {},
      survey: {},
    }));
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
      survey: {},  // Need this because of the default parameters of reducer.
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

  it('should change survey for empty state', () => {
    const id = '1';
    const body = mockSurveys[id];
    const action = {
      type: SURVEYS_ACTION.CHANGE_SURVEY,
      payload: {
        id,
        body,
      },
    };
    const expectedState = Immutable.fromJS({
      metadata: {},  // Need this because of the default parameters of reducer.
      survey: {
        id,
        body,
      },
    });
    expect(surveys(undefined, action)).to.deep.equal(expectedState);
  });

  it('should replace survey for existing state', () => {
    const id = '1';
    const initialState = Immutable.fromJS({
      survey: {
        id,
        body: mockSurveys[id],
      },
    });
    const newBody = mockSurveys['2'];
    const action = {
      type: SURVEYS_ACTION.CHANGE_SURVEY,
      payload: {
        id,
        body: newBody,
      },
    };
    const expectedState = Immutable.fromJS({
      survey: {
        id,
        body: newBody,
      },
    });
    assert.notDeepEqual(initialState, expectedState);
    expect(surveys(initialState, action)).to.deep.equal(expectedState);
  });
});
