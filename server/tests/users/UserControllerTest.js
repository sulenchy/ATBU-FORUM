import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import dbConnect from '../../connections/dbConnect';
import SqlHelper from '../../helper/SqlHelper';

const { checkEmail } = SqlHelper;

chai.use(chaiHttp);
const should = chai.should();

describe('testing signup feature', () => {
  it('should successfully signup a user that enters all required fields correctly', (done) => {
    const newUser = {
      firstName: 'Augustine',
      lastName: 'ezinwa',
      email: 'jet55591a@gmail.com',
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
        done();
      });
  });


  it('should return an error message if a user tries to sign up with an already used email', (done) => {
    const newUser = {
      firstName: 'Augustine',
      lastName: 'ezinwa',
      email: 'jet55591a@gmail.com',
      password: '5654545q',
      confirmPassword: '5654545q',
    };
    chai.request(app).post('/api/v1/auth/signup')
      .send(newUser).end((error, response) => {
        response.should.have.status(409);
        response.body.should.be.a('object');
        response.body.should.have.property('status').eql('fail');
        response.body.message.should.be.eql('email is already in use');

        done();
      });
  });

  it('should check to see if user details is actually in database', (done) => {
    dbConnect.query(checkEmail('jet55591a@gmail.com'))
      .then((data) => {
        data.rows[0].email.should.be.eql('jet55591a@gmail.com');
        data.rows[0].firstname.should.be.eql('Augustine');
        data.rows[0].lastname.should.be.eql('ezinwa');
        done();
      });
  });
});

describe('testing login feature', () => {
  it('should successfully login a user if he or she provides his/her email and password', (done) => {
    const newUser = {
      email: 'jet55591a@gmail.com',
      password: '5654545qa'
    };
    chai.request(app).post('/api/v1/auth/login')
      .send(newUser).end((error, response) => {
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.property('status').eql('success');
        response.body.should.have.property('message').eql('Augustine, you are logged in');
        response.body.data.should.have.property('token');
        done();
      });
  });

  it('should check to see if user actually logged in with data in database', (done) => {
    dbConnect.query(checkEmail('jet55591a@gmail.com'))
      .then((data) => {
        data.rows[0].email.should.be.eql('jet55591a@gmail.com');
        data.rows[0].firstname.should.be.eql('Augustine');
        data.rows[0].lastname.should.be.eql('ezinwa');
        done();
      });
  });
  it('should return an error message if a user tries to login with an unknown email', (done) => {
    const newUser = {
      email: 'augustineezinwa@gmail.com',
      password: 'fishandddoneky334'
    };
    chai.request(app).post('/api/v1/auth/login')
      .send(newUser).end((error, response) => {
        response.should.have.status(404);
        response.body.should.be.a('object');
        response.body.should.have.property('status').eql('fail');
        response.body.should.have.property('message').eql('Invalid email or password');

        done();
      });
  });
  it('should return an error message if a user tries to login with an incorrect password', (done) => {
    const newUser = {
      email: 'jet55591a@gmail.com',
      password: 'fishandddoneky334'
    };
    chai.request(app).post('/api/v1/auth/login')
      .send(newUser).end((error, response) => {
        response.should.have.status(401);
        response.body.should.be.a('object');
        response.body.should.have.property('status').eql('fail');
        response.body.should.have.property('message').eql('Invalid email or password');

        done();
      });
  });
});
