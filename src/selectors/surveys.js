export const getDraftSurveysMetadata = state =>
    state.surveys.get('metadata').filter(survey => survey.get('status') === DRAFT_SURVEY);
export const getPublishedSurveysMetadata = state =>
    state.surveys.get('metadata').filter(survey => survey.get('status') === PUBLISHED_SURVEY);
export const getSentSurveysMetadata = state =>
    state.surveys.get('metadata').filter(survey => survey.get('status') === SENT_SURVEY);
export const getSurvey = state => state.surveys.get('survey');
