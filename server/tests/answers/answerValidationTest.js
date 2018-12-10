import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.use(chaiHttp);
const should = chai.should();

describe('Testing validations on answer', () => {
  it('should throw an error if user try to post an answer with an invalid url', (done) => {
    chai.request(app).post('/api/v1/questions/a/answers')
      .send({
        answer: '',
      })
      .end((error, response) => {
        should.not.exist(error);
        response.status.should.be.eql(400);
        response.body.status.should.be.eql('fail');
        response.body.message.should.be.eql('invalid url');
        done();
      });
  });
  it('should throw an error if user submits an empty answer', (done) => {
    chai.request(app).post(`/api/v1/questions/${process.env.QUESTION_ID}/answers`)
      .send({
        answer: '',
        token: process.env.SECOND_USER_TOKEN
      })
      .end((error, response) => {
        should.not.exist(error);
        response.status.should.be.eql(400);
        response.body.status.should.be.eql('fail');
        response.body.message.should.be.eql('answer cant be empty or invalid');
        done();
      });
  });
  it('should throw an error if user answer entry is too short', (done) => {
    chai.request(app).post(`/api/v1/questions/${process.env.QUESTION_ID}/answers`)
      .send({
        answer: 'ef',
      })
      .end((error, response) => {
        should.not.exist(error);
        response.status.should.be.eql(422);
        response.body.status.should.be.eql('fail');
        response.body.message.should.be.eql('answer cant be too short');
        done();
      });
  });
  it('should throw an error if answer entered contains invalid syntax', (done) => {
    chai.request(app).post('/api/v1/questions/1/answers')
      .send({
        answer: 'ef///3$#$#$$#$',
      })
      .end((error, response) => {
        should.not.exist(error);
        response.status.should.be.eql(400);
        response.body.status.should.be.eql('fail');
        response.body.message.should.be.eql('answer contains invalid syntax or spaces');
        done();
      });
  });
});
