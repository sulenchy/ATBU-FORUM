import dbConnect from '../connections/dbConnect';
import SqlHelper from '../helper/SqlHelper';
import CatchErrors from '../helper/CatchErrors';

const { searchVotes, resetVotes } = SqlHelper;
const { catchDatabaseConnectionError } = CatchErrors;
/**
  * @class VotesValidation
  *
  * @description Performs validations on votes
  */
class VotesValidation {
  /**
    * @static
    *
    * @param {object} request - The request payload sent to the middleware
    * @param {object} response - The response payload sent back from middleware
    * @param {object} next - The callback function to resume the next middleware
    *
    * @returns {object} - status Message
    *
    * @description This method validates upvotes to an answer
    * @memberOf VotesValidation
    */
  static validationPermissionToUpvote(request, response, next) {
    if (request.id === request.answers.userid) {
      return response.status(403).json({
        status: 'fail',
        message: 'Action forbidden!, you cannot upvote your answer!'
      });
    }
    return next();
  }

  /**
    * @static
    *
    * @param {object} request - The request payload sent to the middleware
    * @param {object} response - The response payload sent back from middleware
    * @param {object} next - The callback function to resume the next middleware
    *
    * @returns {object} - status Message
    *
    * @description This method validates downvotes to an answer
    * @memberOf VotesValidation
    */
  static validationPermissionToDownvote(request, response, next) {
    if (request.id === request.answers.userid) {
      return response.status(403).json({
        status: 'fail',
        message: 'Action forbidden!, you cannot downvote your answer!'
      });
    }
    return next();
  }

  /**
    * @static
    *
    * @param {object} request - The request payload sent to the middleware
    * @param {object} response - The response payload sent back from middleware
    * @param {object} next - The callback function to resume the next middleware
    *
    * @returns {object} - status Message
    *
    * @description This method validates upvotes entry to an answer
    * @memberOf VotesValidation
    */
  static validateUpVoteEntry(request, response, next) {
    const userId = request.id;
    const answerId = request.answers.id;

    dbConnect.query(searchVotes(answerId, userId, 1))
      .then((data) => {
        if (data.rows.length < 1) return next();
        return response.status(403).json({
          status: 'fail',
          message: 'You have already upvoted this answer'
        });
      })
      .catch(error => catchDatabaseConnectionError(`error reading votes table ${error}`, response));
  }

  /**
    * @static
    *
    * @param {object} request - The request payload sent to the middleware
    * @param {object} response - The response payload sent back from middleware
    * @param {object} next - The callback function to resume the next middleware
    *
    * @returns {object} - status Message
    *
    * @description This method validates downvote entry to an answer
    * @memberOf VotesValidation
    */
  static validateDownVoteEntry(request, response, next) {
    const userId = request.id;
    const answerId = request.answers.id;

    dbConnect.query(searchVotes(answerId, userId, 0))
      .then((data) => {
        if (data.rows.length < 1) return next();
        return response.status(403).json({
          status: 'fail',
          message: 'You have already downvoted this answer'
        });
      })
      .catch(error => catchDatabaseConnectionError(`error reading votes table ${error}`, response));
  }

  /**
    * @static
    *
    * @param {object} request - The request payload sent to the middleware
    * @param {object} response - The response payload sent back from middleware
    * @param {object} next - The callback function to resume the next middleware
    *
    * @returns {object} - status Message
    *
    * @description This method deactivates previous upvote entries to an answer by the same user
    * @memberOf VotesValidation
    */
  static checkUpvoteEntry(request, response, next) {
    const userId = request.id;
    const answerId = request.answers.id;
    dbConnect.query(searchVotes(answerId, userId, 1))
      .then(data => next())
      .catch(error => catchDatabaseConnectionError(`error reading votes table ${error}`, response));
  }

  /**
    * @static
    *
    * @param {object} request - The request payload sent to the middleware
    * @param {object} response - The response payload sent back from middleware
    * @param {object} next - The callback function to resume the next middleware
    *
    * @returns {object} - status Message
    *
    * @description This method deactivates previous downvote entries to an answer
    * @memberOf VotesValidation
    */
  static checkDownvoteEntry(request, response, next) {
    const userId = request.id;
    const answerId = request.answers.id;

    dbConnect.query(searchVotes(answerId, userId, 0))
      .then(data => next())
      .catch(error => catchDatabaseConnectionError(`error reading votes table ${error}`, response));
  }

  /**
    * @static
    *
    * @param {object} request - The request payload sent to the middleware
    * @param {object} response - The response payload sent back from middleware
    * @param {object} next - The call back function to the next middleware
    *
    * @returns {object} - status Message
    *
    * @description This method resets vote from a user to 0.
    * @memberOf VotesValidation
    */
  static resetVoteEntry(request, response, next) {
    const userId = request.id;
    const answerId = request.answers.id;
    dbConnect.query(resetVotes(answerId, userId))
      .then(data => next())
      .catch(error => catchDatabaseConnectionError(`error updating votes table ${error}`, response));
  }
}

export default VotesValidation;
