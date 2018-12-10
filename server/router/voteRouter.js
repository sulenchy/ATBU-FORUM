import express from 'express';
import VotesController from '../controllers/VotesController';
import VotesValidation from '../middlewares/VotesValidation';
import Security from '../middlewares/Security';
import QuestionValidation from '../middlewares/QuestionValidation';
import AnswerValidation from '../middlewares/AnswerValidation';

const { validateQuestionExistence, validateUrl, reValidateUrl } = QuestionValidation;
const { validateAnswerExistence } = AnswerValidation;
const {
  upvote, downvote, countDownvotesForAnAnswer, countUpvotesForAnAnswer, persistVotesToAnswers,
  finalizeDownvote, finalizeUpvote
} = VotesController;
const {
  validationPermissionToUpvote, validationPermissionToDownvote, validateDownVoteEntry,
  validateUpVoteEntry, checkUpvoteEntry, checkDownvoteEntry, resetVoteEntry
} = VotesValidation;
const { guardRoute } = Security;
const voteRouter = express.Router();
voteRouter.put('/questions/:questionId/answers/:answerId/upvote', validateUrl, reValidateUrl,
  guardRoute, validateQuestionExistence, validateAnswerExistence, validationPermissionToUpvote,
  validateUpVoteEntry, checkDownvoteEntry, resetVoteEntry, checkUpvoteEntry, resetVoteEntry, upvote,
  countUpvotesForAnAnswer, countDownvotesForAnAnswer, persistVotesToAnswers, finalizeUpvote);
voteRouter.put('/questions/:questionId/answers/:answerId/downvote', validateUrl, reValidateUrl,
  guardRoute, validateQuestionExistence, validateAnswerExistence, validationPermissionToDownvote,
  validateDownVoteEntry, checkUpvoteEntry, resetVoteEntry, checkDownvoteEntry, resetVoteEntry, downvote,
  countUpvotesForAnAnswer, countDownvotesForAnAnswer, persistVotesToAnswers, finalizeDownvote);
export default voteRouter;
