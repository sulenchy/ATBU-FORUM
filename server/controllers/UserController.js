import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dbConnect from '../connections/dbConnect';
import SqlHelper from '../helper/SqlHelper';
import CatchErrors from '../helper/CatchErrors';
import { formatUsers, formatUserUpdate } from '../helper/format';

const { catchDatabaseConnectionError } = CatchErrors;
const {
  createUser, checkEmail, getUsers, findUser, updateUser
} = SqlHelper;
dotenv.config();
/**
  * @class UserController
  *
  * @description Performs login and signup operations on users
  */
class UserController {
  /**
  * @description -This method signs up users into StackOverFlow-Lite
  *
  * @param {object} request - The request payload sent to the router
  * @param {object} response - The response payload sent back from the controller
  *
  * @returns {object} - status Message and signs up user
  *
  * @description This controller authenticates a user during signup using jwt token.
  * @memberOf UserController
  * @static
  */
  static registerUser(request, response) {
    const {
      firstName,
      lastName,
      email,
      password
    } = request.body;
    dbConnect.query(createUser(firstName, lastName, email, password))
      .then((data) => {
        const {
          id,
          email,
          firstname
        } = data.rows[0];
        const payload = {
          id,
          email
        };
        const token = jwt.sign({ payload }, process.env.PRIVATE_KEY, { expiresIn: 777 * 70 });
        return response.status(201).json({
          status: 'success',
          message: `${firstname}, you signed up successfully.`,
          data: {
            token, id
          }
        });
      })
      .catch(error => catchDatabaseConnectionError(`Error writing to user table ${error}`, response));
  }

  /**
    * @description -This method logins users into StackOverFlow-Lite
    *
    * @param {object} request - The requestuest payload sent to the router
    * @param {object} response - The responseponse payload sent back from the controller
    *
    * @returns {object} - responseponse object and message
    *
    * @description This controller authenticates a user during login using jwt token.
    * @memberOf UserController
    * @static
    */
  static loginUser(request, response) {
    dbConnect.query(checkEmail(request.body.email))
      .then((data) => {
        if (data.rows.length < 1) {
          return response.status(404).json({
            status: 'fail',
            message: 'Invalid email or password'
          });
        }
        const {
          id, email, password
        } = data.rows[0];
        const payload = {
          id,
          email
        };

        if (bcrypt.compareSync(request.body.password, password)) {
          const token = jwt.sign({ payload }, process.env.PRIVATE_KEY, { expiresIn: 777 * 70 });
          const { firstname } = data.rows[0];
          return response.status(200).json({
            status: 'success',
            message: `${firstname}, you are logged in`,
            data: { token, id }
          });
        }
        return response.status(401).json({
          status: 'fail',
          message: 'Invalid email or password'
        });
      }).catch(error => catchDatabaseConnectionError(`Error reading user table ${error} `, response));
  }

  /**
    * @static
    *
    * @param {object} request - The request payload sent to the controller
    * @param {object} response - The respons payload sent back from the controller
    *
    * @returns {object} - status Message and the question
    *
    * @description This method returns all users in the database
    * @memberOf UserController
    */
  static fetchUsers(request, response) {
    dbConnect.query(getUsers())
      .then((data) => {
        switch (data.rows.length) {
          case 0: response.status(404).json({
            status: 'fail',
            message: 'No user has registered!'
          });
            break;

          default: {
            response.status(200).json({
              status: 'success',
              data: { users: formatUsers(data.rows) }
            });
          }
        }
      })
      .catch(error => catchDatabaseConnectionError(`error reading users table ${error}`, response));
  }

  /**
    * @static
    *
    * @param {object} request - The request payload sent to the controller
    * @param {object} response - The respons payload sent back from the controller
    *
    * @returns {object} - status Message and the question
    *
    * @description This method returns all users in the database
    * @memberOf UserController
    */
  static fetchUserProfile(request, response) {
    const userId = request.id || request.params.userId;
    dbConnect.query(findUser(userId))
      .then((data) => {
        switch (data.rows.length) {
          case 0: response.status(404).json({
            status: 'fail',
            message: 'This user has not registered!'
          });
            break;

          default: {
            response.status(200).json({
              status: 'success',
              data: { users: formatUsers(data.rows)[0] }
            });
          }
        }
      })
      .catch(error => catchDatabaseConnectionError(`error reading users table ${error}`, response));
  }

  /**
    * @static
    *
    * @param {object} request - The request payload sent to the controller
    * @param {object} response - The respons payload sent back from the controller
    *
    * @returns {object} - status Message and the question
    *
    * @description This method updates user's profile
    * @memberOf UserController
    */
  static updateUserProfile(request, response) {
    const userId = request.id;
    const { jobRole, company, photo } = request.body;
    dbConnect.query(updateUser(userId, jobRole, company, photo))
      .then(data => response.status(200).json({
        status: 'success',
        message: 'profile update was successful',
        data: { user: formatUserUpdate(data.rows)[0] }
      }))
      .catch(error => catchDatabaseConnectionError(`error updating users table ${error}`, response));
  }
}

export default UserController;
