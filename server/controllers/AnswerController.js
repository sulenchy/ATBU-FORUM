import dbConnect from '../connections/dbConnect';
import SqlHelper from '../helper/SqlHelper';
import { formatAnswers } from '../helper/format';
import CatchErrors from '../helper/CatchErrors';

const { catchDatabaseConnectionError } = CatchErrors;
const {
  createAnswer, getAllAnswersForAQuestion, updateAnAnswer, deactivateUserPrefferedAnswer,
  prefferAnswer
} = SqlHelper;
/**
  * @class AnswerController
  *
  * @description Performs add operations on answers
  */
class AnswerController {
  /**
    * @static
    *
    * @param {object} request - The request payload sent to the controller
    * @param {object} response - The response payload sent back from the controller
    *
    * @returns {object} - status Message and the added answer
    *
    * @description This method returns the answer object
    * @memberOf AnswerController
    */
  static addAnswer(request, response) {
    const { answer } = request.body;
    const questionId = request.data.id;
    dbConnect.query(createAnswer(answer, request.id, questionId))
      .then(data => response.status(201).json({
        status: 'success',
        data: { newAnswer: formatAnswers(data.rows)[0] }
      }))
      .catch(error => catchDatabaseConnectionError(`error writing to answers table ${error}`, response));
  }

  /**
    * @static
    *
    * @param {object} request - The request payload sent to the controller
    * @param {object} response - The response payload sent back from the controller
    *
    * @returns {object} - status Message and the updated answer
    *
    * @description This method updates the answer object
    * @memberOf AnswerController
    */
  static updateAnswer(request, response) {
    const { answer } = request.body;
    const { answerId } = request.params;
    dbConnect.query(updateAnAnswer(answer, answerId))
      .then(data => response.status(200).json({
        status: 'success',
        message: 'You have successfully updated your answer'
      }))
      .catch(error => catchDatabaseConnectionError(`Error updating database table ${error}`, response));
  }

  /**
    * @static
    *
    * @param {object} request - The request payload sent to the controller
    * @param {object} response - The response payload sent back from the controller
    *
    * @returns {object} - status Message and the updated answer
    *
    * @description This method searches and deactivates any preffered answer
    * @memberOf AnswerController
    */
  static deactivatePrefferedAnswers(request, response) {
    const { questionId } = request.params;
    dbConnect.query(deactivateUserPrefferedAnswer(questionId))
      .then(data => AnswerController.preferAnswer(request, response))
      .catch(error => catchDatabaseConnectionError(`Error reverting prefferred answers on answers table, ${error}`, response));
  }

  /**
    * @static
    *
    * @param {object} request - The request payload sent to the controller
    * @param {object} response - The response payload sent back from the controller
    *
    * @returns {object} - status Message and the updated answer
    *
    * @description This method allows a user to prefer an answer
    * @memberOf AnswerController
    */
  static preferAnswer(request, response) {
    const { answerId } = request.params;
    dbConnect.query(prefferAnswer(answerId))
      .then((data) => {
        response.status(200).json({
          status: 'success',
          message: 'You have successfully preffered this answer'
        });
      })
      .catch(error => catchDatabaseConnectionError(`Error preffering an answer on answers table,
       ${error}`, response));
  }

  /**
    * @static
    *
    * @param {object} request - The request payload sent to the controller
    * @param {object} response - The response payload sent back from the controller
    * @param {object} next - The callback function to resume the next middleware.
    *
    * @returns {object} - status Message and all answers
    *
    * @description This method returns all answers object
    * @memberOf AnswerController
    */
  static fetchAnswersForAQueston(request, response, next) {
    const { questionId } = request.params;
    dbConnect.query(getAllAnswersForAQuestion(questionId))
      .then((data) => {
        const foundAnswers = formatAnswers(data.rows);
        request.foundAnswers = foundAnswers;
        return next();
      })
      .catch(error => catchDatabaseConnectionError(`error reading answers table ${error}`, response));
  }

  /**
    * @static
    *
    * @param {object} request - The request payload sent to the controller
    * @param {object} response - The response payload sent back from the controller
    *
    * @returns {object} - status Message and returned  answer object
    *
    * @description This method returns the answer object
    * @memberOf AnswerController
    */
  static fetchAnswer(request, response) {
    request.answers.comments = request.foundComments;
    request.answers.upvotes = request.upvotes;
    request.answers.downvotes = request.downvotes;
    return response.status(200).json({
      status: 'success',
      data: {
        answer: request.answers
      }
    });
  }
}

export default AnswerController;
