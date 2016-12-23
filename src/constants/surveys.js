// The different types of questions that can be asked.
export const QUESTION_TYPE = Object.freeze({
  SHORT_ANSWER: 'SHORT_ANSWER',
  TRUE_FALSE: 'TRUE_FALSE',
  MULTIPLE_CHOICE: 'MULTIPLE_CHOICE',
  CHECKBOX: 'CHECKBOX',
});

// The id of a new survey that hasn't been persisted yet.
export const NEW_SURVEY_ID = -1;

// The default survey object for a new survey.
export const NEW_SURVEY_BODY = Object.freeze({
  name: 'Untitled survey',
  description: 'Untitled survey description',
  status: 'DRAFT',
  questions: [
    {
      text: 'Untitled question',
      type: QUESTION_TYPE.SHORT_ANSWER,
      default_next_question_id: -1,
      options: [],
    },
  ],
});

// Used to indicate the status of a survey.
export const DRAFT_SURVEY = 'DRAFT';
export const PUBLISHED_SURVEY = 'PUBLISHED';
export const SENT_SURVEY = 'SENT';
