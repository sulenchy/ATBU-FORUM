/**
  * @class SqlHelper
  *
  * @description handles all sql queries
  */
class SqlHelper {
  /**
    * @static
    *
    * @returns {string} - query string
    *
    * @description This method creates the table for users
    * @memberOf SqlHelper
    */
  static createTableForUsers() {
    return `DROP TABLE IF EXISTS users CASCADE;
    CREATE TABLE users(id  SERIAL UNIQUE PRIMARY KEY,
        firstName TEXT  NOT NULL,
        lastName  TEXT  NOT NULL,
        email VARCHAR(60) UNIQUE NOT NULL,
        password VARCHAR(130) NOT NULL,
        jobRole VARCHAR(60) NOT NULL,
        company VARCHAR(60) NOT NULL,
        photo VARCHAR(900) NOT NULL,
        time VARCHAR(80) NOT NULL,
        date VARCHAR(80) NOT NULL);`;
  }

  /**
    * @static
    *
    * @returns {object} - query string
    *
    * @description This method creates the table for questions
    * @memberOf SqlHelper
    */
  static createTableForQuestions() {
    return `DROP TABLE IF EXISTS questions CASCADE;
    CREATE TABLE questions(id SERIAL UNIQUE PRIMARY KEY,
    questionTitle VARCHAR(100) NOT NULL,
    questionDescription VARCHAR(300) NOT NULL,
    time VARCHAR(80) NOT NULL,
    date VARCHAR(80) NOT NULL,
    userId SERIAL references users(ID) ON DELETE CASCADE);`;
  }

  /**
    * @static
    *
    * @returns {object} - query string
    *
    * @description This method creates the table for answers
    * @memberOf SqlHelper
    */
  static createTableForAnswers() {
    return `DROP TABLE IF EXISTS answers CASCADE;
    CREATE TABLE answers(id SERIAL UNIQUE PRIMARY KEY,
    answer VARCHAR(300) NOT NULL,
    upvotes INT NOT NULL,
    downvotes INT NOT NULL,
    approved BOOLEAN NOT NULL,
    time VARCHAR(80) NOT NULL,
    date VARCHAR(80) NOT NULL,
    questionId SERIAL references questions(ID) ON DELETE CASCADE,
    userId SERIAL references users(ID) ON DELETE CASCADE);`;
  }

  /**
    * @static
    *
    * @returns {object} - query string
    *
    * @description This method creates the table for comments
    * @memberOf SqlHelper
    */
  static createTableForComments() {
    return `DROP TABLE IF EXISTS comments CASCADE;
    CREATE TABLE comments(id SERIAL UNIQUE PRIMARY KEY,
    comment VARCHAR(300) NOT NULL,
    upvotes SERIAL NOT NULL,
    downvotes SERIAL NOT NULL,
    time VARCHAR(80) NOT NULL,
    date VARCHAR(80) NOT NULL,
    answerId SERIAL references answers(ID) ON DELETE CASCADE,
    questionId SERIAL references questions(ID) ON DELETE CASCADE,
    userId SERIAL references users(ID) ON DELETE CASCADE);`;
  }

  /**
    * @static
    *
    * @returns {object} - query string
    *
    * @description This method creates the table for comments
    * @memberOf SqlHelper
    */
  static createTableForVotes() {
    return `DROP TABLE IF EXISTS votes CASCADE;
    CREATE TABLE votes(id SERIAL UNIQUE PRIMARY KEY,
    vote INTEGER NOT NULL,
    time VARCHAR(80) NOT NULL,
    date VARCHAR(80) NOT NULL,
    answerId SERIAL references answers(ID) ON DELETE CASCADE,
    questionId SERIAL references questions(ID) ON DELETE CASCADE,
    userId SERIAL references users(ID) ON DELETE CASCADE);`;
  }

  /**
    * @static
    *
    * @param {string} firstName - The first name of the user
    * @param {string} lastName - The last name of the user
    * @param {string} email - The email of the user
    * @param {string} password - The password of the user
    * @param {string} jobRole - The company of the user
    * @param {string} company - The company of the user
    * @param {string} photo - The photo of the user
    * @returns {object} - query string
    *
    * @description This method creates a user in the user database
    * @memberOf SqlHelper
    */
  static createUser(firstName, lastName, email, password, jobRole = 'Update your job role',
    company = 'Update your company name', photo = 'image-url') {
    const query = {
      text: `INSERT INTO users(firstName, lastName, email, password, jobRole, company, photo, time, date)
                                              VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      values: [firstName, lastName, email, password, jobRole, company, photo,
        (new Date(Date.now())).toTimeString(), (new Date(Date.now())).toDateString()]
    };
    return query;
  }

  /**
    * @static
    *
    * @param {string} email - The email to check for in the database
    * @returns {object} - query string
    *
    * @description This method checks for an email in the database
    * @memberOf SqlHelper
    */
  static checkEmail(email) {
    const query = {
      text: 'SELECT * FROM users WHERE users.email = $1',
      values: [email]
    };
    return query;
  }

  /**
    * @static
    *
    * @param {string} questionTitle - The question title to post to the database
    * @param {string} questionDescription - The question description to post in the database
    * @param {integer} id - The id of the user creating the question.
    * @returns {object} - query string
    *
    * @description This method creates a question in the database
    * @memberOf SqlHelper
    */
  static createQuestion(questionTitle, questionDescription, id) {
    const query = {
      text: `INSERT INTO questions(questionTitle, questionDescription, time, date, userId)
           VALUES($1, $2, $3, $4, $5) RETURNING * `,
      values: [questionTitle, questionDescription,
        (new Date(Date.now())).toTimeString(), (new Date(Date.now())).toDateString(), id]
    };
    return query;
  }

  /**
    * @static
    *
    * @param {integer} userId - The userId that owns the question
    * @param {integer} id - The id of the question
    * @returns {object} - query string
    *
    * @description This method checks for a question in the database
    * @memberOf SqlHelper
    */
  static getAUserQuestion(userId, id) {
    const query = {
      text: 'SELECT * FROM questions where questions.userid = $1 and questions.id = $2',
      values: [userId, id]
    };
    return query;
  }

  /**
    * @static
    *
    * @param {string} answer - The answer that you want to post to the database
    * @param {integer} id - The id of the user that is creating the answer
    * @param {integer} questionId - The id of the question you want to answer
    * @returns {object} - query string
    *
    * @description This method creates an answer in the database
    * @memberOf SqlHelper
    */
  static createAnswer(answer, id, questionId) {
    const query = {
      text: `INSERT INTO answers(answer, upvotes, downvotes, approved, time, date, questionid,  userid)
           VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING * `,
      values: [answer, 0, 0, false,
        (new Date(Date.now())).toTimeString(), (new Date(Date.now())).toDateString(), questionId, id]
    };
    return query;
  }

  /**
    * @static
    *
    * @param {string} comment - The comment that you need to post to the database
    * @param {integer} id - The userId of the user that wants to post the comment
    * @param {integer} questionId - The questionI
    * @param {integer} answerId - The answerId of the answer that you want to comment
    * @returns {object} - query string
    *
    * @description This method creates a comment in the database
    * @memberOf SqlHelper
    */
  static createComment(comment, id, questionId, answerId) {
    const query = {
      text: `INSERT INTO comments(comment, upvotes, downvotes, time, date, answerid, questionId, userid)
           VALUES($1, $2, $3, $4, $5, $6, $7,$8 ) RETURNING * `,
      values: [comment, 0, 0,
        (new Date(Date.now())).toTimeString(), (new Date(Date.now())).toDateString(), answerId, questionId, id]
    };
    return query;
  }

  /**
    * @static
    *
    * @param {integer} questionId - The questionId of the question that you want to upvote
    * @param {integer} answerId - The answerId of the answer that you want to upvote
    * @param {integer} id - The id of the user that wants to upvote the answer
    * @returns {object} - query string
    *
    * @description This method creates an upvote in the database
    * @memberOf SqlHelper
    */
  static createUpvote(questionId, answerId, id) {
    const query = {
      text: `INSERT INTO votes(vote, time, date, answerid, questionId, userid)
           VALUES($1, $2, $3, $4, $5, $6) RETURNING * `,
      values: [1, (new Date(Date.now())).toTimeString(), (new Date(Date.now())).toDateString(),
        answerId, questionId, id]
    };
    return query;
  }

  /**
    * @static
    *
    * @param {integer} questionId - The questionId of the question that you want to downvote
    * @param {integer} answerId - The answerId of the answer that you want to downvote
    * @param {integer} id - The id of the user that wants to downvote the answer
    * @returns {object} - query string
    *
    * @description This method creates a downvote in the database
    * @memberOf SqlHelper
    */
  static createDownvote(questionId, answerId, id) {
    const query = {
      text: `INSERT INTO votes(vote, time, date, answerid, questionId, userid)
           VALUES($1, $2, $3, $4, $5, $6) RETURNING * `,
      values: [0, (new Date(Date.now())).toTimeString(), (new Date(Date.now())).toDateString(),
        answerId, questionId, id]
    };
    return query;
  }

  /**
    * @static
    *
    * @param {integer} answerId - The answerId of the upvote that you want to search
    * @param {integer} id - The id of the user that has the vote
    * @param {string} vote - The vote casted by the user
    * @returns {object} - query string
    *
    * @description This method searches for votes in the votes table
    * @memberOf SqlHelper
    */
  static searchVotes(answerId, id, vote) {
    const query = {
      text: 'SELECT * from votes where votes.answerid = $1 and votes.userid= $2 and votes.vote=$3',
      values: [answerId, id, vote]
    };
    return query;
  }

  /**
    * @static
    *
    * @param {integer} userId - The id of the user that has the answer
    * @param {integer} id - The id of the answer
    *
    * @returns {object} - query string
    *
    * @description This method gets an answer that belongs to a user
    * @memberOf SqlHelper
    */
  static getAUserAnswer(userId, id) {
    const query = {
      text: 'SELECT * FROM answers where answers.userid = $1 and answers.id = $2',
      values: [userId, id]
    };
    return query;
  }

  /**
    * @static
    *
    * @param {integer} questionId - The id of the question
    *
    * @returns {object} - query string
    *
    * @description This method gets an answer that belongs to a user
    * @memberOf SqlHelper
    */
  static getAQuestion(questionId) {
    const query = {
      text: 'SELECT * FROM questions where questions.id = $1',
      values: [questionId]
    };
    return query;
  }

  /**
    * @static
    *
    * @param {integer} answerId - The id of the question that bears the answer
    * @param {integer} questionId - The id of the answer that you want to get
    * @returns {object} - query string
    *
    * @description This method gets an answer by the questionId in the database
    * @memberOf SqlHelper
    */
  static getAnAnswer(answerId, questionId) {
    const query = {
      text: 'SELECT * FROM answers where answers.id = $1 and answers.questionId = $2',
      values: [answerId, questionId]
    };
    return query;
  }

  /**
    * @static
    *
    * @param {string} answer - The new answer for update
    * @param {integer} answerId - The id of the answer that you want to update
    * @returns {object} - query string
    *
    * @description This method updates an answer in the database
    * @memberOf SqlHelper
    */
  static updateAnAnswer(answer, answerId) {
    const query = {
      text: 'UPDATE answers SET answer = $1 where answers.id =$2',
      values: [answer, answerId]
    };
    return query;
  }

  /**
    * @static
    *
    * @param {integer} questionId - The questionId of the answer that you want to deactivate
    * @returns {object} - query string
    *
    * @description This method deactivates the an formal prefferred answer in the database
    * @memberOf SqlHelper
    */
  static deactivateUserPrefferedAnswer(questionId) {
    const query = {
      text: 'UPDATE answers SET approved = false where answers.approved =true and answers.questionid= $1',
      values: [questionId]
    };
    return query;
  }

  /**
    * @static
    *
    * @param {integer} answerId - The answerId of the answer that you want to prefer.
    * @returns {object} - query string
    *
    * @description This method prefers an Answer in the database
    * @memberOf SqlHelper
    */
  static prefferAnswer(answerId) {
    const query = {
      text: 'UPDATE answers SET approved= true where answers.id =$1',
      values: [answerId]
    };
    return query;
  }

  /**
    * @static
    *
    * @param {integer} questionId - The questionId of all answers you want to fetch
    * @returns {object} - query string
    *
    * @description This method fetches all answers for a particulalr question in the database
    * @memberOf SqlHelper
    */
  static getAllAnswersForAQuestion(questionId) {
    const query = {
      text: `SELECT * FROM (SELECT answers.*, count(comments.answerid) as commentsnumber
    from answers left  join comments on (answers.id =comments.answerid) 
    group by answers.id) as c where c.questionid=$1`,
      values: [questionId]
    };
    return query;
  }

  /**
    * @static
    *
    * @param {integer} answerId - The answerId of the all the comments that you want to fetch
    * @returns {object} - query string
    *
    * @description This method gets all comments for an answer in the database
    * @memberOf SqlHelper
    */
  static getAllCommentsForAnAnswer(answerId) {
    const query = {
      text: 'SELECT * from comments where comments.answerid =$1',
      values: [answerId]
    };
    return query;
  }

  /**
    * @static
    *
    * @param {integer} userId - The id of the user that has the comment
    * @param {integer} id - The id of the comment that you want to fetch
    *
    * @returns {object} - query string
    *
    * @description This method gets an answer by the questionId in the database
    * @memberOf SqlHelper
    */
  static getAUserComment(userId, id) {
    const query = {
      text: 'SELECT * from comments where comments.id =$1 and comments.userid =$2',
      values: [id, userId]
    };
    return query;
  }

  /**
    * @static
    *
    * @returns {object} - query string
    *
    * @description This method gets all questions
    * @memberOf SqlHelper
    */
  static getAllQuestions() {
    const query = {
      text: `SELECT questions.*, count(answers.questionid) as answersnumber,
      sum(answers.upvotes) as upvotes,
      sum(answers.downvotes) as downvotes from questions
      left  join answers on (questions.id =answers.questionid)
      group by questions.id
    `
    };
    return query;
  }

  /**
    * @static
    *
    * @param {integer} userId - The userId of the the questions that you want to fetch
    * @returns {object} - query string
    *
    * @description This method gets all questions for a particular user
    * @memberOf SqlHelper
    */
  static getAllUserQuestions(userId) {
    const query = {
      text: `SELECT * FROM (SELECT questions.*, count(answers.questionid) as answersnumber,
      sum(answers.upvotes) as upvotes,
      sum(answers.downvotes) as downvotes from questions
      left  join answers on (questions.id =answers.questionid)
      group by questions.id) as c where c.userid =$1
    `,
      values: [userId]
    };
    return query;
  }

  /**
    * @static
    *
    * @param {integer} questionId - The id of the the question that you want to delete
    * @returns {object} - query string
    *
    * @description This method deletes a particular question by id.
    * @memberOf SqlHelper
    */
  static deleteAQuestion(questionId) {
    const query = {
      text: 'DELETE FROM questions where questions.id = $1',
      values: [questionId]
    };
    return query;
  }

  /**
    * @static
    *
    * @param {integer} answerId - The id of the answer that bears the vote
    * @param {integer} id - The id of the user that has the vote.
    *
    * @returns {object} - query string
    *
    * @description This method resets and deletes votes for a particular user
    * @memberOf SqlHelper
    */
  static resetVotes(answerId, id) {
    const query = {
      text: 'DELETE FROM votes where votes.answerid = $1 and votes.userid =$2',
      values: [answerId, id]
    };
    return query;
  }

  /**
    * @static
    *
    * @param {integer} answerId - The id of the the question that you want to delete
    *
    * @returns {object} - query string
    *
    * @description This method gets upvotes for a particular answer
    * @memberOf SqlHelper
    */
  static getUpvotesForAnswer(answerId) {
    const query = {
      text: 'SELECT * FROM votes where votes.answerid =$1 and votes.vote=$2',
      values: [answerId, 1]
    };
    return query;
  }

  /**
    * @static
    *
    * @param {integer} answerId - The id of the the answer that bears the downvote
    *
    * @returns {object} - query string
    *
    * @description This method gets downvotes for a particular answer
    * @memberOf SqlHelper
    */
  static getDownvotesForAnswer(answerId) {
    const query = {
      text: 'SELECT * FROM votes where votes.answerid =$1 and votes.vote=$2',
      values: [answerId, 0]
    };
    return query;
  }

  /**
    * @static
    *
    * @param {integer} upvotes - The value of the upvote
    * @param {integer} downvotes - The value of the downvote
    * @param {integer} answerId - The id of the answer that bears the vote
    * @returns {object} - query string
    *
    * @description This method persists votes to answers
    * @memberOf SqlHelper
    */
  static persistVotes(upvotes, downvotes, answerId) {
    const query = {
      text: 'UPDATE answers SET upvotes=$1, downvotes =$2 where answers.id=$3 returning *',
      values: [upvotes, downvotes, answerId]
    };
    return query;
  }

  /**
    * @static
    *
    * @param {searchQuery} searchQuery - The search string that should contain the keywords in a question
    *
    * @returns {object} - query string
    *
    * @description This method gets searches for a question using search query
    * @memberOf SqlHelper
    */
  static searchQuestion(searchQuery) {
    const query = {
      text: `SELECT * FROM (SELECT questions.*, count(answers.questionid) as answersnumber,
      sum(answers.upvotes) as upvotes,
      sum(answers.downvotes) as downvotes from questions
      left  join answers on (questions.id =answers.questionid)
      group by questions.id) as b where b.questiontitle ilike 
    '%${searchQuery}%' or b.questiondescription ilike '%${searchQuery}%'`
    };
    return query;
  }

  /**
    * @static
    *
    * @returns {object} - query string
    *
    * @description This method gets questions with most answers
    * @memberOf SqlHelper
    */
  static getQuestionsWithMostAnswers() {
    const query = {
      text: `SELECT questions.*, count(answers.questionid) as answersnumber from questions 
    left join answers on (questions.id = answers.questionid) group by questions.id order 
    by count(answers.questionid) desc `
    };
    return query;
  }

  /**
    * @static
    *
    * @param {string} id - This finds a user by an id
    *
    * @returns {object} - query string
    *
    * @description This method finds a user by id
    * @memberOf SqlHelper
    */
  static findUser(id) {
    const query = {
      text: `SELECT * FROM (SELECT users.*, count(answers.userid) as answersnumber, sum(answers.upvotes) as upvotes,
               sum(answers.downvotes) as downvotes from users left join answers on (users.id = answers.userid)
               group by users.id) as b, (SELECT users.*, count(questions.userid) as questionsnumber from users left join 
               questions on (users.id = questions.userid) group by users.id) as c where  b.id =$1 and c.id =$1
       `,
      values: [id]
    };
    return query;
  }

  /**
    * @static
    *
    *
    * @returns {object} - query string
    *
    * @description This method finds a user by id
    * @memberOf SqlHelper
    */
  static getUsers() {
    const query = {
      text: `SELECT * FROM (SELECT users.*, count(answers.userid) as answersnumber, sum(answers.upvotes) as upvotes,
      sum(answers.downvotes) as downvotes from users left join answers on (users.id = answers.userid)
      group by users.id) as b, (SELECT users.*, count(questions.userid) as questionsnumber from users left join 
      questions on (users.id = questions.userid) group by users.id) as c where  b.id = c.id
      `,
    };
    return query;
  }

  /**
    * @static
    *
    *
    * @returns {object} - query string
    *
    * @description This method finds a user by id
    * @memberOf SqlHelper
    */
  static updateUser(userId, jobRole, company, photo) {
    const query = {
      text: `UPDATE users SET jobrole = $2, company = $3, photo = $4
      WHERE users.id =$1 RETURNING *`,
      values: [userId, jobRole, company, photo]
    };
    return query;
  }
}

export default SqlHelper;
