import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import SqlHelper from '../../helper/SqlHelper';
import dbConnect from '../../connections/dbConnect';

const { getAUserComment } = SqlHelper;

chai.use(chaiHttp);
const should = chai.should();

describe('TESTING ADD COMMENTS', () => {
  it('user should add comments to an answer', (done) => {
    chai.request(app)
      .post(`/api/v1/questions/${process.env.QUESTION_ID}/answers/${process.env.ANSWER_ID}/comments`)
      .send({
        comment: 'how do i get that device fixed?',
        token: process.env.USER_TOKEN
      })
      .end((error, response) => {
        response.status.should.be.eql(201);
        response.body.status.should.be.eql('success');
        response.body.data.newComment.comment.should.be.eql('how do i get that device fixed?');
        response.body.data.newComment.answerId.should.be.eql(+process.env.ANSWER_ID);
        response.body.data.newComment.questionId.should.be.eql(+process.env.QUESTION_ID);
        response.body.data.newComment.id.should.be.eql(1);
        process.env.COMMENT_ID = response.body.data.newComment.id;
        done();
      });
  });
  it('check to see if comment was actually added to the database', (done) => {
    dbConnect.query(getAUserComment(process.env.USER_ID, process.env.COMMENT_ID))
      .then((data) => {
        data.rows[0].comment.should.be.eql('how do i get that device fixed?');
        data.rows[0].userid.should.be.eql(+process.env.USER_ID);
        data.rows[0].id.should.be.eql(+process.env.COMMENT_ID);
        done();
      });
  });
});

describe('TESTING GET COMMENTS', () => {
  it('user should get comments to an answer', (done) => {
    chai.request(app)
      .get(`/api/v1/questions/${process.env.QUESTION_ID}/answers/${process.env.ANSWER_ID}/`)
      .send({
        token: process.env.USER_TOKEN
      })
      .end((error, response) => {
        response.status.should.be.eql(200);
        response.body.status.should.be.eql('success');
        response.body.data.answer.comments[0].comment.should.be.eql('how do i get that device fixed?');
        response.body.data.answer.comments[0].answerId.should.be.eql(+process.env.ANSWER_ID);
        response.body.data.answer.comments[0].questionId.should.be.eql(+process.env.QUESTION_ID);
        response.body.data.answer.comments[0].id.should.be.eql(1);
        process.env.COMMENT_ID = response.body.data.answer.comments[0].id;
        done();
      });
  });
});
