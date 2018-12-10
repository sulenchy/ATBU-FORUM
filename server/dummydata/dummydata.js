const questions = [
  {
    id: 1,
    questionTitle: 'How do I fix my arduino?',
    questionDescription:
     'My arduino is misbehaving ,it emits a red light during code upload.',
    answers: [],
    time: (new Date(2018, 7, 13, 7, 36)).toTimeString(),
    date: (new Date(2018, 7, 13, 7, 36)).toDateString(),
  },
  {
    id: 2,
    questionTitle: 'How do I install eslint on my codebase?',
    questionDescription:
     'I have tried installing eslint, but its seems not to work on my codebase.',
    answers: [],
    time: (new Date(2018, 7, 13, 7, 36)).toTimeString(),
    date: (new Date(2018, 7, 13, 7, 36)).toDateString(),
  }
];

const answers = [
  {
    id: 1,
    answer:
    'Consider  connecting pin 10 to ground with a reset capacitor between Vcc and pin 10.',
    comments: [],
    upvotes: 0,
    downvotes: 0,
    mostPreferred: 1,
    questionId: 1,
    time: (new Date(2018, 7, 13, 7, 36)).toTimeString(),
    date: (new Date(2018, 7, 13, 7, 36)).toDateString()
  }
];

const comments = [
  {
    id: 1,
    comment: 'Nice post',
    upvotes: 0,
    downvotes: 0,
    answerId: 1,
    time: (new Date(2018, 7, 13, 7, 36)).toTimeString(),
    date: (new Date(2018, 7, 13, 7, 36)).toDateString()
  }
];

export { questions, comments, answers };
