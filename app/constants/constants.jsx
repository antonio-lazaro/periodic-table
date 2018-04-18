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

  page: 'QUIZ_PAGE',
  learnPage: {
    selectedElement: undefined
  },
};

export const PAGES = {
  LEARN_PAGE: 'LEARN_PAGE',
  QUIZ_PAGE: 'QUIZ_PAGE'
};

export const ELEMENT_GROUPS = [
  "alkali-metal",
  "alkaline-earth-metal",
  "transition-metals",
  "noble-gas",
];

export const ELEMENTS = [{
    atomicNumber: 1,
    symbol: "H",
    name: "Hidrógeno",
    group: "non-metal"
  }, {
    atomicNumber: 2,
    symbol: "He",
    name: "Hidrógeno",
    group: "noble-gas"
  }, {
    atomicNumber: 3,
    symbol: "Li",
    name: "Litio",
    group: "alkali-metal"
  }, {
    atomicNumber: 4,
    symbol: "Be",
    name: "Berilio",
    group: "alkaline-earth-metal"
  }, {
    atomicNumber: 5,
    symbol: "B",
    name: "Boro",
    group: "alkaline-earth-metal"
  }, {
    atomicNumber: 6,
    symbol: "C",
    name: "Carbono",
    group: "alkaline-earth-metal"
  }, {
    atomicNumber: 7,
    symbol: "N",
    name: "Nitrógeno",
    group: "alkaline-earth-metal"
  }, {
    atomicNumber: 8,
    symbol: "O",
    name: "Oxígeno",
    group: "alkaline-earth-metal"
  }, {
    atomicNumber: 9,
    symbol: "F",
    name: "Flúor",
    group: "alkaline-earth-metal"
  }, {
    atomicNumber: 10,
    symbol: "Ne",
    name: "Neón",
    group: "alkaline-earth-metal"
  }, {
    atomicNumber: 11,
    symbol: "Na",
    name: "Sodio",
    group: "alkaline-earth-metal"
  }, {
    atomicNumber: 12,
    symbol: "Mg",
    name: "Magnesio",
    group: "alkaline-earth-metal"
  }, {
    atomicNumber: 13,
    symbol: "Al",
    name: "Aluminio",
    group: "alkaline-earth-metal"
  }, {
    atomicNumber: 14,
    symbol: "Si",
    name: "Silicio",
    group: "alkaline-earth-metal"
  }, {
    atomicNumber: 15,
    symbol: "P",
    name: "Fósforo",
    group: "alkaline-earth-metal"
  }, {
    atomicNumber: 16,
    symbol: "S",
    name: "Azufre",
    group: "alkaline-earth-metal"
  }, {
    atomicNumber: 17,
    symbol: "Cl",
    name: "Cloro",
    group: "alkaline-earth-metal"
  }, {
    atomicNumber: 18,
    symbol: "Ar",
    name: "Argón",
    group: "alkaline-earth-metal"
  }, {
    atomicNumber: 19,
    symbol: "K",
    name: "Potasio",
    group: "alkaline-earth-metal"
  }, {
    atomicNumber: 20,
    symbol: "Be",
    name: "Berilio",
    group: "alkaline-earth-metal"
  }, {
    atomicNumber: 21,
    symbol: "Be",
    name: "Berilio",
    group: "alkaline-earth-metal"
  }, {
    atomicNumber: 22,
    symbol: "Be",
    name: "Berilio",
    group: "alkaline-earth-metal"
  }, {
    atomicNumber: 23,
    symbol: "Be",
    name: "Berilio",
    group: "alkaline-earth-metal"
  }, {
    atomicNumber: 24,
    symbol: "Be",
    name: "Berilio",
    group: "alkaline-earth-metal"
  }, {
    atomicNumber: 25,
    symbol: "Be",
    name: "Berilio",
    group: "alkaline-earth-metal"
  }, {
    atomicNumber: 26,
    symbol: "Be",
    name: "Berilio",
    group: "alkaline-earth-metal"
  }, {
    atomicNumber: 27,
    symbol: "Be",
    name: "Berilio",
    group: "alkaline-earth-metal"
  }, {
    atomicNumber: 28,
    symbol: "Be",
    name: "Berilio",
    group: "alkaline-earth-metal"
  }, {
    atomicNumber: 29,
    symbol: "Be",
    name: "Berilio",
    group: "alkaline-earth-metal"
  }, {
    atomicNumber: 30,
    symbol: "Be",
    name: "Berilio",
    group: "alkaline-earth-metal"
  }, {
    atomicNumber: 31,
    symbol: "Be",
    name: "Berilio",
    group: "alkaline-earth-metal"
  }, {
    atomicNumber: 32,
    symbol: "Be",
    name: "Berilio",
    group: "alkaline-earth-metal"
  }, {
    atomicNumber: 33,
    symbol: "Be",
    name: "Berilio",
    group: "alkaline-earth-metal"
  }, {
    atomicNumber: 34,
    symbol: "Be",
    name: "Berilio",
    group: "alkaline-earth-metal"
  }, {
    atomicNumber: 35,
    symbol: "Be",
    name: "Berilio",
    group: "alkaline-earth-metal"
  }, {
    atomicNumber: 36,
    symbol: "Be",
    name: "Berilio",
    group: "alkaline-earth-metal"
  }, {
    atomicNumber: 37,
    symbol: "Be",
    name: "Berilio",
    group: "alkaline-earth-metal"
  }, {
    atomicNumber: 38,
    symbol: "Be",
    name: "Berilio",
    group: "alkaline-earth-metal"
  }, {
    atomicNumber: 39,
    symbol: "Be",
    name: "Berilio",
    group: "alkaline-earth-metal"
  }, {
    atomicNumber: 40,
    symbol: "Be",
    name: "Berilio",
    group: "alkaline-earth-metal"
  }, {
    atomicNumber: 41,
    symbol: "Be",
    name: "Berilio",
    group: "alkaline-earth-metal"
  }, {
    atomicNumber: 42,
    symbol: "Be",
    name: "Berilio",
    group: "alkaline-earth-metal"
  }, {
    atomicNumber: 43,
    symbol: "Be",
    name: "Berilio",
    group: "alkaline-earth-metal"
  }, {
    atomicNumber: 44,
    symbol: "Be",
    name: "Berilio",
    group: "alkaline-earth-metal"
  }, {
    atomicNumber: 45,
    symbol: "Be",
    name: "Berilio",
    group: "alkaline-earth-metal"
  }, {
    atomicNumber: 46,
    symbol: "Be",
    name: "Berilio",
    group: "alkaline-earth-metal"
  }, {
    atomicNumber: 47,
    symbol: "Be",
    name: "Berilio",
    group: "alkaline-earth-metal"
  }, {
    atomicNumber: 48,
    symbol: "Be",
    name: "Berilio",
    group: "alkaline-earth-metal"
  }, {
    atomicNumber: 49,
    symbol: "Be",
    name: "Berilio",
    group: "alkaline-earth-metal"
  }, {
    atomicNumber: 50,
    symbol: "Be",
    name: "Berilio",
    group: "alkaline-earth-metal"
  }, {
    atomicNumber: 51,
    symbol: "Be",
    name: "Berilio",
    group: "alkaline-earth-metal"
  }, {
    atomicNumber: 52,
    symbol: "Be",
    name: "Berilio",
    group: "alkaline-earth-metal"
  }, {
    atomicNumber: 53,
    symbol: "Be",
    name: "Berilio",
    group: "alkaline-earth-metal"
  }, {
    atomicNumber: 54,
    symbol: "Be",
    name: "Berilio",
    group: "alkaline-earth-metal"
  }, {
    atomicNumber: 55,
    symbol: "Be",
    name: "Berilio",
    group: "alkaline-earth-metal"
  }, {
    atomicNumber: 56,
    symbol: "Be",
    name: "Berilio",
    group: "alkaline-earth-metal"
  }, {
    atomicNumber: 57,
    symbol: "Be",
    name: "Berilio",
    group: "alkaline-earth-metal"
  }, {
    atomicNumber: 58,
    symbol: "Be",
    name: "Berilio",
    group: "alkaline-earth-metal"
  }, {
    atomicNumber: 24,
    symbol: "Be",
    name: "Berilio",
    group: "alkaline-earth-metal"
  }, {
    atomicNumber: 24,
    symbol: "Be",
    name: "Berilio",
    group: "alkaline-earth-metal"
  }, {
    atomicNumber: 24,
    symbol: "Be",
    name: "Berilio",
    group: "alkaline-earth-metal"
  }, {
    atomicNumber: 24,
    symbol: "Be",
    name: "Berilio",
    group: "alkaline-earth-metal"
  }, {
    atomicNumber: 24,
    symbol: "Be",
    name: "Berilio",
    group: "alkaline-earth-metal"
  }, {
    atomicNumber: 24,
    symbol: "Be",
    name: "Berilio",
    group: "alkaline-earth-metal"
  }, {
    atomicNumber: 24,
    symbol: "Be",
    name: "Berilio",
    group: "alkaline-earth-metal"
  },
];

export const ANSWER_TYPES = {
  SELECT_ONE_ANSWER: 'SELECT_ONE_ANSWER',
  SELECT_MULTIPLE_ANSWER: 'SELECT_MULTIPLE_ANSWER',
  PT_SELECT_ONE_ANSWER: 'PT_SELECT_ONE_ANSWER',
  PT_SELECT_MULTIPLE_ANSWER: 'PT_SELECT_MULTIPLE_ANSWER'
};

export const QUIZ = {
  questions: [{
    question: "¿A qué elemento corresponde el símbolo #{symbol}?",
    answerField: "name",
    answerType: "SELECT_ONE_ANSWER",
    "difficulty": 2
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
    "difficulty": 4
  }, {
    question: "¿Cuál de los siguientes elementos tiene número atómico #{number}?",
    answerField: "name",
    answerType: "SELECT_ONE_ANSWER",
    "difficulty": 9
  }, {
    question: "Selecciona los elementos del grupo #{category}",
    answerField: "name",
    answerType: "PT_SELECT_ANSWER",
    "difficulty": 7
  }, {
    question: "¿?",
    answerField: "name",
    answerType: "PT_SELECT_ANSWER",
    "difficulty": 9
  }]
};