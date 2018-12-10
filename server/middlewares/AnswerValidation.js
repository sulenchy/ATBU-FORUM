import Helper from '../helper/Helper';
import CatchErrors from '../helper/CatchErrors';
import AnswerController from '../controllers/AnswerController';
import dbConnect from '../connections/dbConnect';
import SqlHelper from '../helper/SqlHelper';

const { getAnAnswer } = SqlHelper;
const { catchDatabaseConnectionError } = CatchErrors;
const { validateField } = Helper;
const { deactivatePrefferedAnswers } = AnswerController;
/**
  * @class AnswerValidation
  *
  * @description Validates input fields on the answer object
  */
class AnswerValidation {
  /**
    * @static
    *
    * @param {object} request - The request payload sent to the middleware
    * @param {object} response - The response payload sent back from the middleware
    * @param {object} next - The call back function to resume the next middleware
    *
    * @returns {object} - status Message and the answer
    *
    * @description This method validates the answer
    * @memberOf AnswerValidation
    */
  static validateAnswer(request, response, next) {
    const { answer } = request.body;
    validateField('answer', answer, response, next);
  }


  /**
    * @static
    *
    * @param {object} request - The request payload sent to the middleware
    * @param {object} response - The response payload sent back from the middleware
    * @param {object} next - The call back function to resume the next middleware
    *
    * @returns {object} - status Message and the answer
    *
    * @description This method checks if a user wants to answer his or question
    * @memberOf AnswerValidation
    */
  static validatePermissionToEditAnswer(request, response, next) {
    if (request.id === request.data.userid) {
      return response.status(403).json({
        status: 'fail',
        message: 'you cannot answer your question'
      });
    }
    return next();
  }

  /**
    * @static
    *
    * @param {object} request - The request payload sent to the middleware
    * @param {object} response - The response payload sent back from the middleware
    * @param {object} next - The call back function to resume the next middleware
    *
    * @returns {object} - status Message and the answer
    *
    * @description This method checks if a user wants to update his answer
    * @memberOf AnswerValidation
    */
  static validatePermissionToUpdateAnswer(request, response, next) {
    if (request.id === request.answers.userid) return next();
    if (request.id === request.data.userid) {
      return deactivatePrefferedAnswers(request, response);
    }
    return response.status(403).json({
      status: 'fail',
      message: 'Access denied!, You cannot update someone\'s answer'
    });
  }

  /**
    * @static
    *
    * @param {object} request - The request payload sent to the middleware
    * @param {object} response - The response payload sent back from the middleware
    * @param {object} next - The call back function to resume the next middleware
    *
    * @returns {object} - status Message and the question
    *
    * @description This method validates the existence of an answer
    * @memberOf AnswerValidation
    */
  static validateAnswerExistence(request, response, next) {
    const { answerId, questionId } = request.params;
    dbConnect.query(getAnAnswer(answerId, questionId))
      .then((data) => {
        if (data.rows.length < 1) {
          return response.status(404).json({
            status: 'fail',
            message: 'This answer does not exist for this question'
          });
        }
        const [neededData, ...remnant] = data.rows;
        request.answers = neededData;
        return next();
      })
      .catch(error => catchDatabaseConnectionError(`error reading answer table ${error}`, response));
  }
}

export default AnswerValidation;
