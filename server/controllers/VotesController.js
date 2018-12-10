import dbConnect from '../connections/dbConnect';
import SqlHelper from '../helper/SqlHelper';
import CatchErrors from '../helper/CatchErrors';

const {
  createUpvote, createDownvote, getDownvotesForAnswer, getUpvotesForAnswer,
  persistVotes
} = SqlHelper;

const { catchDatabaseConnectionError } = CatchErrors;
/**
  * @class VotesController
  *
  * @description Performs add and update operations on votes.
  */
class VotesController {
  /**
    * @static
    *
    * @param {object} request - The request payload sent to the controller
    * @param {object} response - The response payload sent back from the controller
    * @param {object} next - The next middleware
    *
    * @returns {object} - status Message and the added upvote
    *
    * @description This method increases the upvotes to an answer
    * @memberOf VotesController
    */
  static upvote(request, response, next) {
    const answerId = request.answers.id;
    const questionId = request.data.id;
    const userId = request.id;
    dbConnect.query(createUpvote(questionId, answerId, userId))
      .then(data => next())
      .catch(error => catchDatabaseConnectionError(`error updating upvotes table ${error}`, response));
  }


  /**
    * @static
    *
    * @param {object} request - The request payload sent to the controller
    * @param {object} response - The response payload sent back from the controller
    * @param {object} next - The next middleware
    *
    * @returns {object} - status Message and the added upvote
    *
    * @description This method increases the upvotes to an answer
    * @memberOf VotesController
    */
  static downvote(request, response, next) {
    const answerId = request.answers.id;
    const questionId = request.data.id;
    const userId = request.id;
    dbConnect.query(createDownvote(questionId, answerId, userId))
      .then(data => next())
      .catch(error => catchDatabaseConnectionError(`error updating upvotes table ${error}`, response));
  }

  /**
    * @static
    *
    * @param {object} request - The request payload sent to the controller
    * @param {object} response - The response payload sent back from the controller
    *
    * @returns {object} - status Message and the added upvote
    *
    * @description This method increases the upvotes to an answer
    * @memberOf VotesController
    */
  static finalizeDownvote(request, response) {
    return response.status(200).json({
      status: 'success',
      message: 'You have successfully downvoted this answer'
    });
  }


  /**
    * @static
    *
    * @param {object} request - The request payload sent to the controller
    * @param {object} response - The response payload sent back from the controller
    *
    * @returns {object} - status Message and the added upvote
    *
    * @description This method increases the upvotes to an answer
    * @memberOf VotesController
    */
  static finalizeUpvote(request, response) {
    return response.status(200).json({
      status: 'success',
      message: 'You have successfully upvoted this answer'
    });
  }

  /**
    * @static
    *
    * @param {object} request - The request payload sent to the controller
    * @param {object} response - The response payload sent back from the controller.
    * @param {object} next - The call back function to resume the next middleware.
    *
    * @returns {object} - status Message and the added upvote
    *
    * @description This method fetches upvotes for an answer
    * @memberOf VotesController
    */
  static countUpvotesForAnAnswer(request, response, next) {
    const answerId = request.answers.id;
    dbConnect.query(getUpvotesForAnswer(answerId))
      .then((data) => {
        request.upvotes = data.rows.length;
        return next();
      })
      .catch(error => catchDatabaseConnectionError(`error reading votes table ${error}`, response));
  }

  /**
    * @static
    *
    * @param {object} request - The request payload sent to the controller
    * @param {object} response - The response payload sent back from the controller.
    * @param {object} next - The call back function to resume the next middleware.
    *
    * @returns {object} - status Message and the added upvote
    *
    * @description This method counts the number of downvotes for an answer
    * @memberOf VotesController
    */
  static countDownvotesForAnAnswer(request, response, next) {
    const answerId = request.answers.id;
    dbConnect.query(getDownvotesForAnswer(answerId))
      .then((data) => {
        request.downvotes = data.rows.length;
        return next();
      })
      .catch(error => catchDatabaseConnectionError(`error reading votes table ${error}`, response));
  }

  /**
    * @static
    *
    * @param {object} request - The request payload sent to the controller
    * @param {object} response - The response payload sent back from the controller.
    * @param {object} next - The call back function to resume the next middleware.
    *
    * @returns {object} - status Message and the added upvote
    *
    * @description This method persists votes to answers table
    * @memberOf VotesController
    */
  static persistVotesToAnswers(request, response, next) {
    const answerId = request.answers.id;
    dbConnect.query(persistVotes(request.upvotes, request.downvotes, answerId))
      .then(data => next())
      .catch(error => catchDatabaseConnectionError(`error persisting votes to answer table ${error}`, response));
  }
}
export default VotesController;
