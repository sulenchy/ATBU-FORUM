import Helper from '../helper/Helper';
import CatchErrors from '../helper/CatchErrors';
import SqlHelper from '../helper/SqlHelper';
import dbConnect from '../connections/dbConnect';

const { getAQuestion } = SqlHelper;
const { catchDatabaseConnectionError } = CatchErrors;
const { validateField } = Helper;
/**
  * @class QuestionValidation
  *
  * @description Validates input fields on the question object
  */
class QuestionValidation {
  /**
    * @static
    *
    * @param {object} request - The request payload sent to the middleware
    * @param {object} response - The response payload sent back from the middleware
    * @param {object} next - The call back function to resume the next middleware
    *
    * @returns {object} - status Message and the question
    *
    * @description This method validates the question Title of the question object
    * @memberOf QuestionValidation
    */
  static validateQuestionTitle(request, response, next) {
    const { questionTitle } = request.body;
    validateField('questionTitle', questionTitle, response, next);
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
    * @description This method validates the question description  of the input
    * @memberOf QuestionValidation
    */
  static validateQuestionDescription(request, response, next) {
    const { questionDescription } = request.body;
    validateField('questionDescription', questionDescription, response, next);
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
    * @description This method validates the existence of a question
    * @memberOf QuestionValidation
    */
  static validateQuestionExistence(request, response, next) {
    const { questionId } = request.params;
    dbConnect.query(getAQuestion(questionId))
      .then((data) => {
        if (data.rows.length < 1) {
          return response.status(404).json({
            status: 'fail',
            message: 'This question does not exist'
          });
        }
        const [neededData, ...remnant] = data.rows;
        request.data = neededData;
        return next();
      })
      .catch(error => catchDatabaseConnectionError(`error reading question table ${error}`, response));
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
    * @description This method validates if a user can delete a question
    * @memberOf QuestionValidation
    */
  static validatePermissionToDeleteQuestion(request, response, next) {
    if (request.id === request.data.userid) return next();
    return response.status(403).json(
      {
        status: 'fail',
        message: 'You dont have permission to delete this question'
      }
    );
  }

  /**
    * @static
    *
    * @param {object} request - The request payload sent to the middleware
    * @param {object} response - The response payload sent back from the middleware
    * @param {object} next - The call back function to resume the next middleware
    *
    * @returns {object} - status Message or next
    *
    * @description This method validates the req url
    * @memberOf QuestionValidation
    */
  static validateUrl(request, response, next) {
    if (Number.parseInt(request.params.questionId, 10) === +request.params.questionId) return next();
    return response.status(400).json({
      status: 'fail',
      message: 'invalid url'
    });
  }

  /**
    * @static
    *
    * @param {object} request - The request payload sent to the middleware
    * @param {object} response - The response payload sent back from the middleware
    * @param {object} next - The call back function to resume the next middleware
    *
    * @returns {object} - status Message or next
    *
    * @description This method validates the req url
    * @memberOf QuestionValidation
    */
  static validateUserUrl(request, response, next) {
    if (Number.parseInt(request.params.userId, 10) === +request.params.userId) return next();
    return response.status(400).json({
      status: 'fail',
      message: 'invalid url'
    });
  }

  /**
    * @static
    *
    * @param {object} request - The request payload sent to the middleware
    * @param {object} response - The response payload sent back from the middleware
    * @param {object} next - The call back function to resume the next middleware
    *
    * @returns {object} - status Message or next
    *
    * @description This method validates the req url
    * @memberOf QuestionValidation
    */
  static reValidateUrl(request, response, next) {
    if (Number.parseInt(request.params.answerId, 10) === +request.params.answerId) return next();
    return response.status(400).json({
      status: 'fail',
      message: 'invalid url'
    });
  }
}

export default QuestionValidation;
