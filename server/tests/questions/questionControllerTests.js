import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import dbConnect from '../../connections/dbConnect';
import SqlHelper from '../../helper/SqlHelper';

const { getAUserQuestion } = SqlHelper;

chai.use(chaiHttp);
const should = chai.should();

describe('Testing questions controller', () => {
  it('should not add question to database if user fails to provide token', (done) => {
    chai.request(app)
      .post('/api/v1/questions')
      .send({
        questionTitle: 'how do I fix my arduino?',
        questionDescription: 'My arduino is having problem, please how do I get it fixed?',
      })
      .end((error, response) => {
        should.not.exist(error);
        response.status.should.be.eql(401);
        response.body.should.have.property('status').eql('fail');
        response.body.should.have.property('message').eql('Unauthorized!, please sign up or login!');
        done();
      });
  });

  it('should not add question to database if user provides fake token', (done) => {
    chai.request(app)
      .post('/api/v1/questions')
      .send({
        questionTitle: 'how do I fix my arduino?',
        questionDescription: 'My arduino is having problem, please how do I get it fixed?',
        token: '234%#$#$T$%$T$%$#%#$'
      })
      .end((error, response) => {
        should.not.exist(error);
        response.status.should.be.eql(401);
        response.body.should.have.property('status').eql('fail');
        response.body.should.have.property('message').eql('Unauthorized!, please provide a valid token!');
        done();
      });
  });

  it('should successfully signup a user that enters all required fields correctly', (done) => {
    const newUser = {
      firstName: 'Augustine',
      lastName: 'ezinwa',
      email: 'austinezinwa@gmail.com',
      password: '5654545qa',
      confirmPassword: '5654545qa',
    };
    chai.request(app).post('/api/v1/auth/signup')
      .send(newUser).end((error, response) => {
        response.should.have.status(201);
        response.body.should.be.a('object');
        response.body.should.have.property('status').eql('success');
        response.body.should.have.property('message').eql('Augustine, you signed up successfully.');
        response.body.data.should.have.property('token');
        process.env.THIRD_USER_TOKEN = response.body.data.token;
        done();
      });
  });
  it('should add a question if signed up or logged in user enters all input data correctly', (done) => {
    chai.request(app)
      .post('/api/v1/questions')
      .send({
        questionTitle: 'how do I fix my arduino?',
        questionDescription: 'My arduino is having problem, please how do I get it fixed?',
        token: process.env.THIRD_USER_TOKEN,
      })
      .end((error, response) => {
        should.not.exist(error);
        response.status.should.be.eql(201);
        response.body.status.should.be.eql('success');
        response.body.data.newQuestion.questionTitle.should.be.eql('how do I fix my arduino?');
        response.body.data.newQuestion.questionDescription.should.be
          .eql('My arduino is having problem, please how do I get it fixed?');
        response.body.data.newQuestion.should.have.property('userId');
        process.env.THIRD_USER_ID = response.body.data.newQuestion.userId;
        process.env.questionId = response.body.data.newQuestion.id;
        done();
      });
  });

  it('should check to see question was actually added to database with the userId and questionId', (done) => {
    dbConnect.query(getAUserQuestion(process.env.THIRD_USER_ID, process.env.questionId))
      .then((data) => {
        data.rows[0].questiontitle.should.be.eql('how do I fix my arduino?');
        data.rows[0].questiondescription.should.be.eql('My arduino is having problem, please how do I get it fixed?');
        data.rows[0].userid.should.be.eql(+process.env.THIRD_USER_ID);
        data.rows[0].id.should.be.eql(+process.env.questionId);
        done();
      });
  });
  it('should return an error message if question of specified id doesnt exist', (done) => {
    chai.request(app).get('/api/v1/questions/5')
      .end((error, response) => {
        should.not.exist(error);
        response.status.should.be.eql(404);
        response.body.message.should.be.eql('No question was found!');
        done();
      });
  });
  it('should return a particular question if the question of the specified id exists', (done) => {
    chai.request(app).get('/api/v1/questions/2')
      .end((error, response) => {
        should.not.exist(error);
        response.status.should.be.eql(200);
        response.body.data.question.questionTitle.should.be.eql('how do I fix my arduino?');
        response.body.data.question.questionDescription.should.be.eql('My arduino is having problem, please how do I get it fixed?');
        response.body.data.question.answers.should.be.a('array');
        done();
      });
  });
});

describe('Testing get all questions', () => {
  it('should get all questions', (done) => {
    chai.request(app).get('/api/v1/questions')
      .end((error, response) => {
        should.not.exist(error);
        response.status.should.be.eql(200);
        response.body.status.should.be.eql('success');
        response.body.data.questions.should.be.an('array');
        response.body.data.questions.length.should.be.eql(2);
        response.body.data.questions[0].should.be.have.property('questionTitle').eql('how do I fix my arduino?');
        response.body.data.questions[0].should.be.have.property('questionDescription')
          .eql('My arduino is having problem, please how do I get it fixed?');
        done();
      });
  });
});

describe('TESTING GETTING ALL QUESTIONS FOR A USER', () => {
  it('should get all questions for a user', (done) => {
    chai.request(app).get('/api/v1/users/questions')
      .send({ token: process.env.THIRD_USER_TOKEN })
      .end((error, response) => {
        should.not.exist(error);
        response.status.should.be.eql(200);
        response.body.status.should.be.eql('success');
        response.body.data.questions.should.be.an('array');
        response.body.data.questions[0].should.be.have.property('questionTitle').eql('how do I fix my arduino?');
        response.body.data.questions[0].should.be.have.property('questionDescription')
          .eql('My arduino is having problem, please how do I get it fixed?');
        done();
      });
  });
});

describe('TESTING SEARCH A QUESTION', () => {
  it('should return no search found if search parameter matches no question', (done) => {
    chai.request(app).get('/api/v1/questions?search=donkey')
      .end((error, response) => {
        should.not.exist(error);
        response.status.should.be.eql(404);
        response.body.status.should.be.eql('fail');
        response.body.message.should.be.eql('No questions were found!');
        done();
      });
  });
  it('should search for any question by its title or description', (done) => {
    chai.request(app).get('/api/v1/questions?search=arduino')
      .end((error, response) => {
        should.not.exist(error);
        response.status.should.be.eql(200);
        response.body.status.should.be.eql('success');
        response.body.data.questions.should.be.an('array');
        response.body.data.questions[0].questionTitle.should.be
          .eql('how do I fix my arduino?');
        response.body.data.questions[0].questionDescription.should.be
          .eql('My arduino is having problem, please how do I get it fixed?');
        done();
      });
  });
});

describe('TESTING - GET MOST ANSWERED QUESTION', () => {
  it('should get most answered questions starting with a question with most answers', (done) => {
    chai.request(app).get('/api/v1/questions/mostanswers')
      .end((error, response) => {
        should.not.exist(error);
        response.status.should.be.eql(200);
        response.body.status.should.be.eql('success');
        response.body.data.questions.should.be.an('array');
        response.body.data.questions[0].questionTitle.should.be
          .eql('how do I fix my arduino?');
        response.body.data.questions[0].questionDescription.should.be
          .eql('My arduino is having problem, please how do I get it fixed?');
        response.body.data.questions[0].numberOfAnswers.should.be.eql(1);
        done();
      });
  });
});

describe('Testing delete a questions', () => {
  it('should delete a  question created by a user', (done) => {
    chai.request(app).delete('/api/v1/questions/2')
      .send({ token: process.env.THIRD_USER_TOKEN })
      .end((error, response) => {
        should.not.exist(error);
        response.status.should.be.eql(200);
        response.body.status.should.be.eql('success');
        response.body.message.should.be.eql('you have successfully deleted this question');
        done();
      });
  });
});
