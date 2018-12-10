import dbConnect from '../connections/dbConnect';
import SqlHelper from '../helper/SqlHelper';

const { createTableForQuestions } = SqlHelper;
/**
  * @class
  *
  * @description Migrates questions table to database
  */
class QuestionsMigration {
  /**
    * @static
    *
    * @returns {object} - Message showing the result of the migration.
    *
    * @description This method migrates or creates a question table in database
    * @memberOf QuestionsMigration
    */
  static migrateQuestions() {
    return new Promise((resolve, reject) => {
      dbConnect.query(createTableForQuestions())
        .then((data) => {
          const positiveMessage = 'Successfully created table questions';
          console.log(positiveMessage);
          resolve(positiveMessage);
        })
        .catch((err) => {
          const negativeMessage = new Error('error migrating table questions to database');
          reject(negativeMessage);
        });
    });
  }
}

export default QuestionsMigration;
