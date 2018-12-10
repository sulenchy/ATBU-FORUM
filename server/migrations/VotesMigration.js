import dbConnect from '../connections/dbConnect';
import SqlHelper from '../helper/SqlHelper';

const { createTableForVotes } = SqlHelper;
/**
  * @class
  *
  * @description Migrates votes table to database
  */
class VotesMigration {
  /**
    * @static
    *
    * @returns {object} - Message showing the result of the migration.
    *
    * @description This method migrates or creates a table in database
    * @memberOf VotesMigration
    */
  static migrateVotes() {
    return new Promise((resolve, reject) => {
      dbConnect.query(createTableForVotes())
        .then((data) => {
          const positiveMessage = 'Successfully created table votes';
          console.log(positiveMessage);
          resolve(positiveMessage);
        })
        .catch((err) => {
          const negativeMessage = new Error('error migrating table votes to database');
          reject(negativeMessage);
        });
    });
  }
}

export default VotesMigration;
