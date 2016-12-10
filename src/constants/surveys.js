// The different types of questions that can be asked.
export const QUESTION_TYPE = Object.freeze({
  SHORT_ANSWER: 'SHORT_ANSWER',
  TRUE_FALSE: 'TRUE_FALSE',
  MULTIPLE_CHOICE: 'MULTIPLE_CHOICE',
  CHECKBOX: 'CHECKBOX',
});

// Used to indicate the next question to ask in the case there are no options or an option has next
// question value of -1. An invariant will be maintained that all questions have this key. If this
// key is -1, it indicates that the survey should be terminated.
export const DEFAULT_NEXT_QUESTION_KEY = 'NEXT_QUESTION';

// The id of a new survey hasn't been persisted yet.
export const NEW_SURVEY_ID = 'NEW';

// The default survey object for a new survey.
export const NEW_SURVEY = Object.freeze({
  id: NEW_SURVEY_ID,
  body: {
    name: 'Untitled survey',
    intro: '',
    status: 'DRAFT',
    questions: {
      1: {
        text: 'Untitled question',
        type: QUESTION_TYPE.SHORT_ANSWER,
        options: [
          {
            key: DEFAULT_NEXT_QUESTION_KEY,
            next_question_to_ask: -1,
          },
        ],
      },
    },
  },
});

// Used to indicate the status of a survey.
export const DRAFT_SURVEY = 'DRAFT';
export const PUBLISHED_SURVEY = 'PUBLISHED';
export const SENT_SURVEY = 'SENT';
