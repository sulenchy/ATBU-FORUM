
/**
 * @class CatchErrors
 *
 * @description catches 500 errors across StackOverFlow-Lite.
 */
class CatchErrors {
  /**
    * @description -This method takes care of any error resulting from connecting to a database
    *
    * @param {object} message - The error object catched by this handler
    * @param {object} response - The response object sent back to the client
    *
    * @returns {object} - returns the response object
    *
    * @memberOf CatchErrors class
    * @static
    */
  static catchDatabaseConnectionError(message, response) {
    return response.status(500).json({
      status: 'fail',
      message

    });
  }
}

export default CatchErrors;
