import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import dbConnect from '../connections/dbConnect';
import SqlHelper from '../helper/SqlHelper';
import CatchErrors from '../helper/CatchErrors';

const { findUser } = SqlHelper;
const { catchDatabaseConnectionError } = CatchErrors;
dotenv.config();

/**
  * @class Security
  * @description Grants authorization to users upon valid jwt tokens
  */
class Security {
/**
  * @description -This method verifies a user before accessing any protected route.
  *
  * @param {object} request - The request payload sent to the router
  * @param {object} response - The response payload sent back from the secureRoute middleware
  * @param {object} next - The request payload sent to the next middleware in the stack.
  *
  * @returns {object} - status Message and verifies a token from a user, granting access.
  * @memberOf Security
  * @static
  */
  static guardRoute(request, response, next) {
    const token = request.body.token || request.query.token || request.headers.authorization;
    if (!token) {
      return response.status(401).json({
        status: 'fail',
        message: 'Unauthorized!, please sign up or login!'
      });
    }
    jwt.verify(token, process.env.PRIVATE_KEY, (error, decoded) => {
      if (error) {
        return response.status(401).json({
          status: 'fail',
          message: 'Unauthorized!, please provide a valid token!'
        });
      }

      const { id, email } = decoded.payload;
      dbConnect.query(findUser(id))
        .then((data) => {
          if (data.rows.length === 0) {
            return response.status(401).json({
              status: 'fail',
              message: 'Please signup!'
            });
          }
          const { jobrole, photo, company } = data.rows[0];
          request.id = id;
          request.email = email;
          request.jobRole = jobrole;
          request.photo = photo;
          request.company = company;
          return next();
        })
        .catch(newError => catchDatabaseConnectionError(`error reading user table ${newError}`, response));
    });
  }
}

export default Security;
