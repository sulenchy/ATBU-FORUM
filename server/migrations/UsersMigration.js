import dbConnect from '../connections/dbConnect.js';
import SqlHelper from '../helper/SqlHelper.js';

const { createTableForUsers } = SqlHelper;

/**
  * @class
  *
  * @description Migrates user table to database
  */
class UsersMigration {
/**
  * @static
  *
  * @returns {object} - Message showing the result of the migration.
  *
  * @description This method migrates or creates a table in database
  * @memberOf UsersMigration
  */
  static migrateUsers() {
    return new Promise((resolve, reject) => {
      dbConnect.query(createTableForUsers())
        .then((data) => {
          const positiveMessage = 'Successfully created table users';
          console.log(positiveMessage);
          resolve(positiveMessage);
        })
        .catch((err) => {
          const negativeMessage = new Error('error migrating table users to database');
          reject(negativeMessage);
        });
    });
  }
}

export default UsersMigration;
