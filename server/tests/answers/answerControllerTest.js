import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import { firstUser, newUser, secondUser } from '../../models/users';
import SqlHelper from '../../helper/SqlHelper';
import dbConnect from '../../connections/dbConnect';

const { getAUserAnswer } = SqlHelper;


chai.use(chaiHttp);
const should = chai.should();

describe('Testing operations on answer', () => {
  it('should successfully signup a user that before he or she can add an answer', (done) => {
    chai.request(app).post('/api/v1/auth/signup')
      .send(firstUser).end((error, response) => {
        response.should.have.status(201);
        response.body.should.be.a('object');
        response.body.should.have.property('status').eql('success');
        response.body.should.have.property('message').eql('Augustine, you signed up successfully.');
        response.body.data.should.have.property('token');
        process.env.USER_TOKEN = response.body.data.token;
        done();
      });
  });
  it('should successfully signup another user before he or she can add an answer', (done) => {
    chai.request(app).post('/api/v1/auth/signup')
      .send(newUser).end((error, response) => {
        response.should.have.status(201);
        response.body.should.be.a('object');
        response.body.should.have.property('status').eql('success');
        response.body.should.have.property('message').eql('rachel, you signed up successfully.');
        response.body.data.should.have.property('token');
        process.env.SECOND_USER_TOKEN = response.body.data.token;
        done();
      });
  });
  it('should not add an answer if user wants to add an answer to non-existent question', (done) => {
    chai.request(app)
      .post('/api/v1/questions/1/answers')
      .send({
        answer: 'The answer to your question is that you have to fix n+9 =90',
        token: process.env.USER_TOKEN
      })
      .end((error, response) => {
        should.not.exist(error);
        response.status.should.be.eql(404);
        response.body.status.should.be.eql('fail');
        response.body.message.should.be.eql('This question does not exist');

        done();
      });
  });
  it('should add a question from a random user for user to add an answer', (done) => {
    chai.request(app)
      .post('/api/v1/questions')
      .send({
        questionTitle: 'how do I fix my arduino?',
        questionDescription: 'My arduino is having problem, please how do I get it fixed?',
        token: process.env.SECOND_USER_TOKEN,
      })
      .end((error, response) => {
        should.not.exist(error);
        response.status.should.be.eql(201);
        response.body.status.should.be.eql('success');
        response.body.data.newQuestion.questionTitle.should.be.eql('how do I fix my arduino?');
        response.body.data.newQuestion.questionDescription.should.be
          .eql('My arduino is having problem, please how do I get it fixed?');
        response.body.data.newQuestion.should.have.property('userId');
        process.env.QUESTION_ID = response.body.data.newQuestion.id;
        done();
      });
  });
  it('should add an answer if user enters all input data correctly and has logged in or signed up',
    (done) => {
      chai.request(app)
        .post(`/api/v1/questions/${process.env.QUESTION_ID}/answers`)
        .send({
          answer: 'The answer to your question is that you have to fix n+9 =90',
          token: process.env.USER_TOKEN
        })
        .end((error, response) => {
          should.not.exist(error);
          response.status.should.be.eql(201);
          response.body.status.should.be.eql('success');
          response.body.data.newAnswer.answer.should.be.eql('The answer to your question is that you have to fix n+9 =90');
          process.env.USER_ID = response.body.data.newAnswer.userId;
          process.env.ANSWER_ID = response.body.data.newAnswer.id;
          done();
        });
    });
  it('should check to see answer was actually added to database with the userId and answerId', (done) => {
    dbConnect.query(getAUserAnswer(process.env.USER_ID, process.env.ANSWER_ID))
      .then((data) => {
        data.rows[0].answer.should.be.eql('The answer to your question is that you have to fix n+9 =90');
        data.rows[0].userid.should.be.eql(+process.env.USER_ID);
        data.rows[0].id.should.be.eql(+process.env.ANSWER_ID);
        done();
      });
  });
  it('should not add an answer if user want to answer his or her question', (done) => {
    chai.request(app)
      .post('/api/v1/questions/1/answers')
      .send({
        answer: 'The answer to your question is that you have to fix n+9 =90',
        token: process.env.SECOND_USER_TOKEN
      })
      .end((error, response) => {
        should.not.exist(error);
        response.status.should.be.eql(403);
        response.body.status.should.be.eql('fail');
        response.body.message.should.be.eql('you cannot answer your question');
        done();
      });
  });
  it('should return error for undefined route', (done) => {
    chai.request(app).post('/api/v1/questions/5/answerq')
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.be.eql(404);
        res.body.message.should.be.eql('This route is yet to be specified.');
        done();
      });
  });
});

describe('TESTING UPDATE ANSWERS', () => {
  it('user should update his or her answer', (done) => {
    chai.request(app)
      .put(`/api/v1/questions/${process.env.QUESTION_ID}/answers/${process.env.ANSWER_ID}`)
      .send({
        answer: 'I want to update this answer',
        token: process.env.USER_TOKEN
      })
      .end((error, response) => {
        should.not.exist(error);
        response.status.should.be.eql(200);
        response.body.status.should.be.eql('success');
        response.body.message.should.be.eql('You have successfully updated your answer');
        done();
      });
  });
  it(' check to see if answer was actually updated in the database', (done) => {
    dbConnect.query(getAUserAnswer(process.env.USER_ID, process.env.ANSWER_ID))
      .then((data) => {
        data.rows[0].answer.should.be.eql('I want to update this answer');
        data.rows[0].userid.should.be.eql(+process.env.USER_ID);
        data.rows[0].id.should.be.eql(+process.env.ANSWER_ID);
        done();
      });
  });
  it('user should not update an answer that doesnt belong to the specified question', (done) => {
    chai.request(app)
      .put(`/api/v1/questions/${process.env.QUESTION_ID}/answers/90`)
      .send({
        answer: 'I want to update this answer',
        token: process.env.USER_TOKEN
      })
      .end((error, response) => {
        should.not.exist(error);
        response.status.should.be.eql(404);
        response.body.status.should.be.eql('fail');
        response.body.message.should.be.eql('This answer does not exist for this question');
        done();
      });
  });
  it('user should choose one answer as preffered to his or her question', (done) => {
    chai.request(app)
      .put(`/api/v1/questions/${process.env.QUESTION_ID}/answers/${process.env.ANSWER_ID}`)
      .send({
        token: process.env.SECOND_USER_TOKEN
      })
      .end((error, response) => {
        should.not.exist(error);
        response.status.should.be.eql(200);
        response.body.status.should.be.eql('success');
        response.body.message.should.be
          .eql('You have successfully preffered this answer');
        done();
      });
  });
  it(' check to see if answer was actually preffered in the database', (done) => {
    dbConnect.query(getAUserAnswer(process.env.USER_ID, process.env.ANSWER_ID))
      .then((data) => {
        data.rows[0].approved.should.be.eql(true);
        data.rows[0].userid.should.be.eql(+process.env.USER_ID);
        data.rows[0].id.should.be.eql(+process.env.ANSWER_ID);
        done();
      });
  });
  it('should successfully signup a user that before he or she can update answer', (done) => {
    chai.request(app).post('/api/v1/auth/signup')
      .send(secondUser).end((error, response) => {
        response.should.have.status(201);
        response.body.should.be.a('object');
        response.body.should.have.property('status').eql('success');
        response.body.should.have.property('message').eql('Black, you signed up successfully.');
        response.body.data.should.have.property('token');
        process.env.THIRD_USER_TOKEN = response.body.data.token;
        done();
      });
  });
  it('new user should not update someone\'s answer', (done) => {
    chai.request(app)
      .put(`/api/v1/questions/${process.env.QUESTION_ID}/answers/${process.env.ANSWER_ID}`)
      .send({
        token: process.env.THIRD_USER_TOKEN
      })
      .end((error, response) => {
        should.not.exist(error);
        response.status.should.be.eql(403);
        response.body.status.should.be.eql('fail');
        response.body.message.should.be
          .eql('Access denied!, You cannot update someone\'s answer');
        done();
      });
  });
});
