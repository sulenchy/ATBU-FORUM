import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.use(chaiHttp);
const should = chai.should();

describe('Testing validations on question', () => {
  it('should throw an error if user fails to enter question title', (done) => {
    chai.request(app).post('/api/v1/questions')
      .send({
        questionTitle: '',
        questionDescription: 'how do I fix my arduino?'
      })
      .end((error, response) => {
        console.log(response.body);
        should.not.exist(error);
        response.status.should.be.eql(400);
        response.body.status.should.be.eql('fail');
        response.body.message.should.be.eql('questionTitle cant be empty or invalid');
        done();
      });
  });
  it('should throw an error if user question title entry is too short', (done) => {
    chai.request(app).post('/api/v1/questions')
      .send({
        questionTitle: 'ef',
        questionDescription: 'how do I fix my arduino?'
      })
      .end((error, response) => {
        should.not.exist(error);
        response.status.should.be.eql(422);
        response.body.status.should.be.eql('fail');
        response.body.message.should.be.eql('questionTitle cant be too short');
        done();
      });
  });
  it('should throw an error if question title entered contains invalid syntax', (done) => {
    chai.request(app).post('/api/v1/questions')
      .send({
        questionTitle: 'ef///3$#$#$$#$',
        questionDescription: 'how do I fix my arduino?'
      })
      .end((error, response) => {
        should.not.exist(error);
        response.status.should.be.eql(400);
        response.body.status.should.be.eql('fail');
        response.body.message.should.be.eql('questionTitle contains invalid syntax or spaces');
        done();
      });
  });
  it('should throw an error if user fails to enter question description', (done) => {
    chai.request(app).post('/api/v1/questions')
      .send({
        questionDescription: '',
        questionTitle: 'how do I fix my arduino?'
      })
      .end((error, response) => {
        should.not.exist(error);
        response.status.should.be.eql(400);
        response.body.status.should.be.eql('fail');
        response.body.message.should.be.eql('questionDescription cant be empty or invalid');
        done();
      });
  });
  it('should throw an error if user enters a very short question description', (done) => {
    chai.request(app).post('/api/v1/questions')
      .send({
        questionDescription: 'ho',
        questionTitle: 'how do I fix my arduino?'
      })
      .end((error, response) => {
        should.not.exist(error);
        response.status.should.be.eql(422);
        response.body.status.should.be.eql('fail');
        response.body.message.should.be.eql('questionDescription cant be too short');
        done();
      });
  });
  it('should throw an error if user enters a questionDescription that contains some hazardous syntax', (done) => {
    chai.request(app).post('/api/v1/questions')
      .send({
        questionDescription: '4545|$%$%##@##@',
        questionTitle: 'how do I fix my arduino?'
      })
      .end((error, response) => {
        should.not.exist(error);
        response.status.should.be.eql(400);
        response.body.status.should.be.eql('fail');
        response.body.message.should.be.eql('questionDescription contains invalid syntax or spaces');
        done();
      });
  });
});
