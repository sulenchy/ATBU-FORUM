import bcrypt from 'bcrypt';
import CatchErrors from '../helper/CatchErrors';
import dbConnect from '../connections/dbConnect';
import SqlHelper from '../helper/SqlHelper';
import Helper from '../helper/Helper';

const { checkEmail } = SqlHelper;
const { catchDatabaseConnectionError } = CatchErrors;
const { validateField } = Helper;
/**
  * @class UserValidation
  *
  * @description Validates input fields on the user input
  */
class UserValidation {
  /**
    * @static
    *
    * @param {object} request - The request payload sent to the middleware
    * @param {object} response - The response payload sent back from the middleware
    * @param {object} next - The call back function to resume the next middleware
    *
    * @returns {object} - status Message and the response object
    *
    * @description This method validates the user input
    * @memberOf UserValidation
    */
  static validateLogin(request, response, next) {
    const { email, password } = request.body;
    if (!email) {
      return response.status(400).json({
        status: 'fail',
        message: 'please provide an email to login'

      });
    }
    if (!password) {
      return response.status(400).json({
        status: 'fail',
        message: 'please provide password to login'

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
    * @returns {object} - status Message and the response object
    *
    * @description This method validates the user input
    * @memberOf UserValidation
    */
  static validateUser(request, response, next) {
    const {
      firstName, lastName, email, password, confirmPassword
    } = request.body;
    const sendErrorResponse = message => response.status(422).json({
      status: 'fail',
      message
    });
    if (!firstName || !/^[a-zA-Z]+$/.test(firstName.toString().trim())) { return sendErrorResponse('enter a valid first name'); }
    if (!lastName || !/^[a-zA-Z]+$/.test(lastName.toString().trim())) { return sendErrorResponse('enter a valid last name'); }
    if (!email
      || !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email.toString().trim())) {
      return sendErrorResponse('enter a valid email-address');
    }
    if (!password) return sendErrorResponse('password cant be empty');
    if (!/^((?=.*\d)|(?=.*[!@#\$%\^&\*]))(?=.*[a-zA-Z])/.test(password.toString())) { return sendErrorResponse('password must contain a number or special character', 'password'); }
    if (password.toString().trim().length < 6) return sendErrorResponse('password must contain at least six characters');
    if (!confirmPassword) return sendErrorResponse('confirm password cant be empty');
    if (confirmPassword !== request.body.password) return sendErrorResponse('confirm password does not match');
    request.body.password = bcrypt.hashSync(request.body.password, 10);
    return next();
  }

  /**
    * @static
    *
    * @param {object} request - The request payload sent to the middleware
    * @param {object} response - The response payload sent back from the middleware
    * @param {object} next - The call back function to resume the next middleware
    *
    * @returns {object} - status Message and the response object
    *
    * @description This method checks if the a user's email is already in use
    * @memberOf UserValidation
    */
  static checkEmailReuse(request, response, next) {
    const { email } = request.body;
    dbConnect.query(checkEmail(email))
      .then((data) => {
        if (data.rows.length === 0) {
          return next();
        }
        return response.status(409).json({
          status: 'fail',
          message: 'email is already in use'
        });
      })
      .catch(error => catchDatabaseConnectionError(error, response));
  }

  /**
    * @static
    *
    * @param {object} request - The request payload sent to the middleware
    * @param {object} response - The response payload sent back from the middleware
    * @param {object} next - The call back function to resume the next middleware
    *
    * @returns {object} - status Message and the response object
    *
    * @description This method validates the user input
    * @memberOf UserValidation
    */
  static validateJobRole(request, response, next) {
    const { jobRole } = request.body;
    validateField('jobRole', jobRole, response, next);
  }

  /**
    * @static
    *
    * @param {object} request - The request payload sent to the middleware
    * @param {object} response - The response payload sent back from the middleware
    * @param {object} next - The call back function to resume the next middleware
    *
    * @returns {object} - status Message and the response object
    *
    * @description This method validates the user input
    * @memberOf UserValidation
    */
  static validateProfileUpdate(request, response, next) {
    const oldUpdates = {
      jobRole: request.jobRole,
      company: request.company,
      photo: request.photo
    };
    const newUpdates = { ...oldUpdates, ...request.body };
    request.body = newUpdates;
    return next();
  }


  /**
    * @static
    *
    * @param {object} request - The request payload sent to the middleware
    * @param {object} response - The response payload sent back from the middleware
    * @param {object} next - The call back function to resume the next middleware
    *
    * @returns {object} - status Message and the response object
    *
    * @description This method validates the user input
    * @memberOf UserValidation
    */
  static validateCompanyName(request, response, next) {
    const { company } = request.body;
    validateField('company', company, response, next);
  }
}

export default UserValidation;
