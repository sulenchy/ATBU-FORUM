import dbConnect from '../connections/dbConnect';
import SqlHelper from '../helper/SqlHelper';

const { createTableForComments } = SqlHelper;
/**
  * @class
  *
  * @description Migrates comments table to database
  */
class CommentsMigration {
  /**
    * @static
    *
    * @returns {object} - Message showing the result of the migration.
    *
    * @description This method migrates or creates a table in database
    * @memberOf CommentsMigration
    */
  static migrateComments() {
    return new Promise((resolve, reject) => {
      dbConnect.query(createTableForComments())
        .then((data) => {
          const positiveMessage = 'Successfully created table comments';
          console.log(positiveMessage);
          resolve(positiveMessage);
        })
        .catch((err) => {
          const negativeMessage = new Error('error migrating table comments to database');
          reject(negativeMessage);
        });
    });
  }
}

export default CommentsMigration;
