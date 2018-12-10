import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import dbConnect from '../../connections/dbConnect';
import SqlHelper from '../../helper/SqlHelper';

const { getAUserAnswer } = SqlHelper;

const should = chai.should();

describe('TESTING UPVOTING ANSWERS', () => {
  it('user should not upvote his or her answer', (done) => {
    chai.request(app)
      .put(`/api/v1/questions/${process.env.QUESTION_ID}/answers/${process.env.ANSWER_ID}/upvote`)
      .send({
        token: process.env.USER_TOKEN
      })
      .end((error, response) => {
        should.not.exist(error);
        response.status.should.be.eql(403);
        response.body.status.should.be.eql('fail');
        response.body.message.should.be.eql('Action forbidden!, you cannot upvote your answer!');
        done();
      });
  });
  it('user should upvote another answer', (done) => {
    chai.request(app)
      .put(`/api/v1/questions/${process.env.QUESTION_ID}/answers/${process.env.ANSWER_ID}/upvote`)
      .send({
        token: process.env.SECOND_USER_TOKEN
      })
      .end((error, response) => {
        should.not.exist(error);
        response.status.should.be.eql(200);
        response.body.status.should.be.eql('success');
        response.body.message.should.be.eql('You have successfully upvoted this answer');
        done();
      });
  });
  it('user should not upvote an answer twice', (done) => {
    chai.request(app)
      .put(`/api/v1/questions/${process.env.QUESTION_ID}/answers/${process.env.ANSWER_ID}/upvote`)
      .send({
        token: process.env.SECOND_USER_TOKEN
      })
      .end((error, response) => {
        should.not.exist(error);
        response.status.should.be.eql(403);
        response.body.status.should.be.eql('fail');
        response.body.message.should.be.eql('You have already upvoted this answer');
        done();
      });
  });
  it('user should get an answer with all upvotes answer', (done) => {
    chai.request(app)
      .get(`/api/v1/questions/${process.env.QUESTION_ID}/answers/${process.env.ANSWER_ID}`)
      .send({
        token: process.env.SECOND_USER_TOKEN
      })
      .end((error, response) => {
        should.not.exist(error);
        response.status.should.be.eql(200);
        response.body.status.should.be.eql('success');
        response.body.data.answer.upvotes.should.be.eql(1);
        done();
      });
  });
  it('check to see if upvotes was actually added to the database', (done) => {
    dbConnect.query(getAUserAnswer(process.env.ANSWER_ID, process.env.USER_ID))
      .then((data) => {
        data.rows[0].userid.should.be.eql(1);
        done();
      });
  });
});


describe('TESTING DOWNVOTING ANSWERS', () => {
  it('user should not upvote his or her answer', (done) => {
    chai.request(app)
      .put(`/api/v1/questions/${process.env.QUESTION_ID}/answers/${process.env.ANSWER_ID}/downvote`)
      .send({
        token: process.env.USER_TOKEN
      })
      .end((error, response) => {
        should.not.exist(error);
        response.status.should.be.eql(403);
        response.body.status.should.be.eql('fail');
        response.body.message.should.be.eql('Action forbidden!, you cannot downvote your answer!');
        done();
      });
  });
  it('user should downvote another answer', (done) => {
    chai.request(app)
      .put(`/api/v1/questions/${process.env.QUESTION_ID}/answers/${process.env.ANSWER_ID}/downvote`)
      .send({
        token: process.env.SECOND_USER_TOKEN
      })
      .end((error, response) => {
        should.not.exist(error);
        response.status.should.be.eql(200);
        response.body.status.should.be.eql('success');
        response.body.message.should.be.eql('You have successfully downvoted this answer');
        done();
      });
  });
  it('user should not downvote an answer twice', (done) => {
    chai.request(app)
      .put(`/api/v1/questions/${process.env.QUESTION_ID}/answers/${process.env.ANSWER_ID}/downvote`)
      .send({
        token: process.env.SECOND_USER_TOKEN
      })
      .end((error, response) => {
        should.not.exist(error);
        response.status.should.be.eql(403);
        response.body.status.should.be.eql('fail');
        response.body.message.should.be.eql('You have already downvoted this answer');
        done();
      });
  });
  it('user should get an answer showing it was downvoted', (done) => {
    chai.request(app)
      .get(`/api/v1/questions/${process.env.QUESTION_ID}/answers/${process.env.ANSWER_ID}`)
      .send({
        token: process.env.SECOND_USER_TOKEN
      })
      .end((error, response) => {
        should.not.exist(error);
        response.status.should.be.eql(200);
        response.body.status.should.be.eql('success');
        response.body.data.answer.upvotes.should.be.eql(0);
        response.body.data.answer.downvotes.should.be.eql(1);
        done();
      });
  });
  it('check to see if downvotes was actually added to the database', (done) => {
    dbConnect.query(getAUserAnswer(process.env.ANSWER_ID, process.env.USER_ID))
      .then((data) => {
        data.rows[0].userid.should.be.eql(1);
        data.rows[0].upvotes.should.be.eql(0);
        data.rows[0].downvotes.should.be.eql(1);
        done();
      });
  });
});
