import dbConnect from '../connections/dbConnect';
import SqlHelper from '../helper/SqlHelper';
import {
  formatQuestions, formatMostAnsweredQuestions, formatQuestionsWithAnswers,
  formatAllQuestions
} from '../helper/format';
import CatchErrors from '../helper/CatchErrors';

const { catchDatabaseConnectionError } = CatchErrors;
const {
  createQuestion, getAllQuestions, getAQuestion, deleteAQuestion, getAllUserQuestions,
  searchQuestion, getQuestionsWithMostAnswers
} = SqlHelper;
/**
  * @class QuestionController
  *
  * @description Performs add and delete operations on questions
  */
class QuestionController {
  /**
    * @static
    *
    * @param {object} request - The request payload sent to the controller
    * @param {object} response - The respons payload sent back from the controller
    *
    * @returns {object} - status Message and the question
    *
    * @description This method returns the question object
    * @memberOf QuestionController
    */
  static fetchQuestions(request, response) {
    dbConnect.query(getAllQuestions())
      .then((data) => {
        switch (data.rows.length) {
          case 0: response.status(404).json({
            status: 'fail',
            message: 'No questions were found!'
          });
            break;

          default: {
            response.status(200).json({
              status: 'success',
              data: { questions: formatAllQuestions(data.rows) }
            });
          }
        }
      })
      .catch(error => catchDatabaseConnectionError(`error reading from questions table ${error}`, response));
  }

  /**
    * @static
    *
    * @param {object} request - The request payload sent to the controller
    * @param {object} response - The respons payload sent back from the controller
    *
    * @returns {object} - status Message and the question
    *
    * @description This method returns all question object for a user
    * @memberOf QuestionController
    */
  static fetchUserQuestions(request, response) {
    const userId = request.id;
    dbConnect.query(getAllUserQuestions(userId))
      .then((data) => {
        switch (data.rows.length) {
          case 0: response.status(404).json({
            status: 'fail',
            message: 'No questions were found!'
          });
            break;

          default: {
            response.status(200).json({
              status: 'success',
              data: { questions: formatAllQuestions(data.rows) }
            });
          }
        }
      })
      .catch(error => catchDatabaseConnectionError(`error reading from questions table ${error}`, response));
  }

  /**
    * @static
    *
    * @param {object} request - The request payload sent to the controller
    * @param {object} response - The respons payload sent back from the controller
    * @param {object} next - The call back function to start the next controller
    *
    * @returns {object} - status Message and the question
    *
    * @description This method returns all searched question object to the user
    * @memberOf QuestionController
    */
  static fetchSearchedQuestions(request, response, next) {
    const { search } = request.query;
    if (!search) return next();
    dbConnect.query(searchQuestion(search))
      .then((data) => {
        switch (data.rows.length) {
          case 0: response.status(404).json({
            status: 'fail',
            message: 'No questions were found!'
          });
            break;

          default: {
            response.status(200).json({
              status: 'success',
              data: { questions: formatAllQuestions(data.rows) }
            });
          }
        }
      })
      .catch(error => catchDatabaseConnectionError(`error reading from questions table ${error}`, response));
  }


  /**
    * @static
    *
    * @param {object} request - The request payload sent to the controller
    * @param {object} response - The response payload sent back from the controller
    *
    * @returns {object} - status Message and the question
    *
    * @description This method returns the question object
    * @memberOf QuestionController
    */
  static fetchAQuestion(request, response) {
    const { questionId } = request.params;
    dbConnect.query(getAQuestion(questionId))
      .then((data) => {
        switch (data.rows.length) {
          case 0: response.status(404).json({
            status: 'fail',
            message: 'No question was found!'
          });
            break;

          default: {
            const reformedQuestion = formatQuestionsWithAnswers(data.rows)[0];
            reformedQuestion.answers = request.foundAnswers;
            response.status(200).json({
              status: 'success',
              data: { question: reformedQuestion }
            });
          }
        }
      })
      .catch(error => catchDatabaseConnectionError(`Error reading questions table ${error}`, response));
  }

  /**
    * @static
    *
    * @param {object} request - The request payload sent to the controller
    * @param {object} response - The response payload sent back from the controller
    *
    * @returns {object} - status Message and the question
    *
    * @description This method returns the question object
    * @memberOf QuestionController
    */
  static fetchQuestionsWithMostAnswers(request, response) {
    dbConnect.query(getQuestionsWithMostAnswers())
      .then((data) => {
        switch (data.rows.length) {
          case 0: response.status(404).json({
            status: 'fail',
            message: 'No question was found!'
          });
            break;

          default: {
            const reformedQuestion = formatMostAnsweredQuestions(data.rows);
            reformedQuestion.answers = request.foundAnswers;
            response.status(200).json({
              status: 'success',
              data: { questions: reformedQuestion }
            });
          }
        }
      })
      .catch(error => catchDatabaseConnectionError(`Error reading questions table ${error}`, response));
  }


  /**
    * @static
    *
    * @param {object} request - The request payload sent to the controller
    * @param {object} response - The response payload sent back from the controller
    *
    * @returns {object} - status Message and the added question
    *
    * @description This method returns the question object
    * @memberOf QuestionController
    */
  static addQuestion(request, response) {
    const { questionTitle, questionDescription } = request.body;
    dbConnect.query(createQuestion(questionTitle, questionDescription, request.id))
      .then(data => response.status(201).json({
        status: 'success',
        data: {
          newQuestion: formatQuestionsWithAnswers(data.rows)[0]
        }
      }))
      .catch(error => catchDatabaseConnectionError(error, response));
  }


  /**
    * @static
    *
    * @param {object} request - The request payload sent to the controller
    * @param {object} response - The response payload sent back from the controller
    *
    * @returns {object} - status Message
    *
    * @description This method deletes questions on the database
    * @memberOf QuestionController
    */
  static deleteQuestion(request, response) {
    const { questionId } = request.params;
    dbConnect.query(deleteAQuestion(questionId))
      .then(data => response.status(200).json({
        status: 'success',
        message: 'you have successfully deleted this question'
      }))
      .catch(error => catchDatabaseConnectionError(`error deleting question on questions table ${error}`, response));
  }
}
export default QuestionController;
