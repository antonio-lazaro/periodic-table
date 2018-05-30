export const INITIAL_STATE = {
  tracking: {
    progress_measure: 0,
    score: null,
    objectives: {},
    finished: false,
  },
  scorm: null,
  user_profile: {
    id: undefined,
    name: "Unknown",
    learner_preference: {},
  },
  wait_for_user_profile: false,

  page: 'LEARN_PAGE',
  mode: 'EXAM',
  quiz: {
    questions: [],
    current_question_index: 1,
    started: false
  }
};

export const MODES = {
  LEARN: 'LEARN',
  EXAM: 'EXAM'
};

export const PAGES = {
  LEARN_PAGE: 'LEARN_PAGE',
  QUIZ_PAGE: 'QUIZ_PAGE'
};

export const ELEMENT_GROUPS = {
  // en
  "alkali-metal": "alkali-metal",
  "alkaline-earth-metal": "alkaline-earth-metal",
  "transition-metal": "transition-metal",
  "metalloid": "metalloid",
  "post-transition-metal": "post-transition-metal",
  "polyatomic-nonmetal": "polyatomic-nonmetal",
  "diatomic-nonmetal": "diatomic-nonmetal",
  "noble-gas": "noble-gas",
  "unknown": "unknown",
  "lanthanide": "lanthanide",
  "actinide": "actinide",
  // es
  "metal-alkalino": "alkali-metal",
  "metal-alkalino-térreo": "alkaline-earth-metal",
  "metal-de-transición": "transition-metal",
  "semimetal": "metalloid",
  "metal-de-bloque-p": "post-transition-metal",
  "no-metal-poliatómico": "polyatomic-nonmetal",
  "no-metal-diatómico": "diatomic-nonmetal",
  "gas-noble": "noble-gas",
  "desconocido": "unknown",
  "lantano": "lanthanide",
  "actínio": "actinide"
};

export const ANSWER_TYPES = {
  SELECT_ONE_ANSWER: 'SELECT_ONE_ANSWER',
  SELECT_MULTIPLE_ANSWER: 'SELECT_MULTIPLE_ANSWER',
  PT_SELECT_ONE_ANSWER: 'PT_SELECT_ONE_ANSWER',
  PT_SELECT_MULTIPLE_ANSWER: 'PT_SELECT_MULTIPLE_ANSWER',
  SELECT_ONE_ANSWER_COMPARE: 'SELECT_ONE_ANSWER_COMPARE'
};

export const QUIZ_EN = {
  questions: [{
    question: "Which element has #{symbol} symbol?",
    answerField: "name",
    answerType: "SELECT_ONE_ANSWER",
    "difficulty": 2
  }, {
    question: "What elements are #{category}?",
    answerField: "name",
    askedField: "category",
    answerType: "SELECT_MULTIPLE_ANSWER",
    "difficulty": 4
  }, {
    question: "Which is the symbol of #{name}?",
    answerField: "symbol",
    answerType: "SELECT_ONE_ANSWER",
    "difficulty": 2
  }, {
    question: "What category does #{name} (#{symbol}) belong to?",
    answerField: "category",
    answerType: "SELECT_ONE_ANSWER",
    "difficulty": 4
  }, {
    question: "Which element belongs to the same category as #{name}?",
    comparedField: "category",
    answerField: "name",
    condition: '=',
    answerType: "SELECT_ONE_ANSWER_COMPARE",
    "difficulty": 5
  }, {
    question: "How many protons does #{name} have?",
    answerField: "number",
    answerType: "SELECT_ONE_ANSWER",
    "difficulty": 9
  }, {
    question: "Which of the following elements has the highest atomic number?",
    comparedField: "number",
    answerField: "name",
    condition: '>',
    answerType: "SELECT_ONE_ANSWER_COMPARE",
    "difficulty": 5
  }, {
    question: "Select #{name}",
    answerField: "number",
    answerType: "PT_SELECT_ONE_ANSWER",
    showElements: false,
    "difficulty": 4
  }, {
    question: "Which of the following elements has the highest density?",
    comparedField: "density",
    answerField: "name",
    condition: '>',
    answerType: "SELECT_ONE_ANSWER_COMPARE",
    "difficulty": 8
  }, {
    question: "Which of the following elements has #{number} protons?",
    answerField: "name",
    answerType: "SELECT_ONE_ANSWER",
    "difficulty": 9
  }, {
    question: "Select the #{category} elements",
    answerField: "name",
    askedField: "category",
    answerType: "PT_SELECT_MULTIPLE_ANSWER",
    showElements: true,
    "difficulty": 7
  }]
};

export const QUIZ_ES = {
  questions: [{
    question: "¿A qué elemento corresponde el símbolo #{symbol}?",
    answerField: "name",
    answerType: "SELECT_ONE_ANSWER",
    "difficulty": 2
  }, {
    question: "¿Cuales de los siguientes elementos son #{category}?",
    answerField: "name",
    askedField: "category",
    answerType: "SELECT_MULTIPLE_ANSWER",
    "difficulty": 4
  }, {
    question: "¿Cuál es el símbolo que corresponde al #{name}?",
    answerField: "symbol",
    answerType: "SELECT_ONE_ANSWER",
    "difficulty": 2
  }, {
    question: "¿A qué grupo pertenece el #{name} (#{symbol})?",
    answerField: "category",
    answerType: "SELECT_ONE_ANSWER",
    "difficulty": 4
  }, {
    question: "¿Cuál es el número atómico del #{name}?",
    answerField: "number",
    answerType: "SELECT_ONE_ANSWER",
    "difficulty": 9
  }, {
    question: "Selecciona la posición del #{name}",
    answerField: "number",
    answerType: "PT_SELECT_ONE_ANSWER",
    showElements: false,
    "difficulty": 4
  }, {
    question: "¿Cuál de los siguientes elementos tiene número atómico #{number}?",
    answerField: "name",
    answerType: "SELECT_ONE_ANSWER",
    "difficulty": 9
  }, {
    question: "Selecciona los elementos del grupo #{category}",
    answerField: "name",
    askedField: "category",
    answerType: "PT_SELECT_MULTIPLE_ANSWER",
    showElements: true,
    "difficulty": 7
  }]
};