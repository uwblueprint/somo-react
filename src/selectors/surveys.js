export const getSentSurveysMetadata =
    state => state.surveys.get('metadata').filter(survey => survey.get('is_sent'));
export const getUnsentSurveysMetadata =
    state => state.surveys.get('metadata').filter(survey => !survey.get('is_sent'));
export const getSurvey = state => state.surveys.get('survey');
