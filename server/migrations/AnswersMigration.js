import dbConnect from '../connections/dbConnect';
import SqlHelper from '../helper/SqlHelper';

const { createTableForAnswers } = SqlHelper;
/**
  * @class
  *
  * @description Migrates answers table to database
  */
class AnswersMigration {
  /**
    * @static
    *
    * @returns {object} - Message showing the result of the migration.
    *
    * @description This method migrates or creates answer table in database
    * @memberOf AnswersMigration
    */
  static migrateAnswers() {
    return new Promise((resolve, reject) => {
      dbConnect.query(createTableForAnswers())
        .then((data) => {
          const positiveMessage = 'Successfully created table answers';
          console.log(positiveMessage);
          resolve(positiveMessage);
        })
        .catch((err) => {
          const negativeMessage = new Error('error migrating table answers to database');
          reject(negativeMessage);
        });
    });
  }
}

export default AnswersMigration;
