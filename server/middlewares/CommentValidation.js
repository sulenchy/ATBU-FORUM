import Helper from '../helper/Helper';

const { validateField } = Helper;

/**
  * @class CommentValidation
  *
  * @description Validates input fields on the comment object
  */
class CommentValidation {
  /**
    * @static
    *
    * @param {object} request - The request payload sent to the middleware
    * @param {object} response - The response payload sent back from the middleware
    * @param {object} next - The call back function to resume the next middleware
    *
    * @returns {object} - status Message and the comment
    *
    * @description This method validates the comment
    * @memberOf Comment
    */
  static validateComment(request, response, next) {
    const { comment } = request.body;
    validateField('comment', comment, response, next);
  }
}

export default CommentValidation;
