import dbConnect from '../connections/dbConnect';
import SqlHelper from '../helper/SqlHelper';
import { formatComments } from '../helper/format';
import CatchErrors from '../helper/CatchErrors';

const { catchDatabaseConnectionError } = CatchErrors;
const { createComment, getAllCommentsForAnAnswer } = SqlHelper;
/**
  * @class CommentController
  *
  * @description Performs add operations on comments
  */
class CommentController {
  /**
    * @static
    *
    * @param {object} request - The request payload sent to the controller
    * @param {object} response - The response payload sent back from the controller
    *
    * @returns {object} - status Message and the added comment
    *
    * @description This method returns the comment object
    * @memberOf CommentController
    */
  static addComment(request, response) {
    const { comment } = request.body;
    const answerId = request.answers.id;
    const questionId = request.data.id;
    dbConnect.query(createComment(comment, request.id, questionId, answerId))
      .then(data => response.status(201).json({
        status: 'success',
        data: { newComment: formatComments(data.rows)[0] }
      }))
      .catch(error => catchDatabaseConnectionError(`error writing to comments table ${error}`, response));
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
    * @memberOf CommentController
    */
  static fetchCommentsForAnAnswer(request, response, next) {
    const { answerId } = request.params;
    dbConnect.query(getAllCommentsForAnAnswer(answerId))
      .then((data) => {
        const foundComments = formatComments(data.rows);
        request.foundComments = foundComments;
        return next();
      })
      .catch(error => catchDatabaseConnectionError(`error reading answers table ${error}`, response));
  }
}

export default CommentController;
