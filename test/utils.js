// TODO(ayushbhagat): Make this use absolute path once its dependency is removed from
// src/actions/surveys.js (i.e. when backend requests are made to fetch the data instead of using
// the mock data that is meant only to be used in testing).
import mockSurveysJSON from './mockSurveys.json';

export const mockSurveys = mockSurveysJSON;
export const mockSurveysMetadata = Object.keys(mockSurveys).reduce(
    (surveysMetadataSoFar, curSurveyKey) => ({
      ...surveysMetadataSoFar,
      [curSurveyKey]: {
        name: mockSurveys[curSurveyKey].name,
        status: mockSurveys[curSurveyKey].status,
      },
    }), {});
