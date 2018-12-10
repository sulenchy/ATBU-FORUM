import UsersMigration from './UsersMigration';
import QuestionsMigration from './QuestionsMigration';
import AnswersMigration from './AnswersMigration';
import CommentsMigration from './CommentsMigration';
import VotesMigration from './VotesMigration';

const { migrateUsers } = UsersMigration;
const { migrateQuestions } = QuestionsMigration;
const { migrateAnswers } = AnswersMigration;
const { migrateComments } = CommentsMigration;
const { migrateVotes } = VotesMigration;

migrateUsers()
  .then(data => migrateQuestions()
    .then(data => migrateAnswers()
      .then(data => migrateComments()
        .then(data => migrateVotes())
        .catch(err => console.log(err)))
      .catch(err => console.log(err)))
    .catch(err => console.log(err)))
  .catch(err => console.log(err));
