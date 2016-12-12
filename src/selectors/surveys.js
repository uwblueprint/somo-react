import { DRAFT_SURVEY, PUBLISHED_SURVEY, SENT_SURVEY } from 'constants';

export const getDraftSurveysMetadata = state =>
    state.get('metadata').filter(survey => survey.get('status') === DRAFT_SURVEY);
export const getPublishedSurveysMetadata = state =>
    state.get('metadata').filter(survey => survey.get('status') === PUBLISHED_SURVEY);
export const getSentSurveysMetadata = state =>
    state.get('metadata').filter(survey => survey.get('status') === SENT_SURVEY);
export const getSurvey = state => state.get('survey');
