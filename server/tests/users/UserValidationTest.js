import chai from 'chai';
import app from '../../app';

const should = chai.should();
describe('Testing user validation', () => {
  it('should return an eror if user enters an invalid firstname ', (done) => {
    const newUser = {
      firstName: 'Augustin(_)()',
      lastName: 'ezinwa',
      email: 'augustineezinwa@gmail.com',
      password: '5654545q',
      confirmPassword: '5654545q',
    };
    chai.request(app).post('/api/v1/auth/signup')
      .send(newUser).end((error, response) => {
        response.should.have.status(422);
        response.body.should.be.a('object');
        response.body.should.have.property('status').eql('fail');
        response.body.message.should.be.eql('enter a valid first name');
        done();
      });
  });
  it('should return an eror if user enters an invalid lastname ', (done) => {
    const newUser = {
      firstName: 'Augustine',
      lastName: 'ezinwa**',
      email: 'augustineezinwa@gmail.com',
      password: '5654545q',
      confirmPassword: '5654545q',
    };
    chai.request(app).post('/api/v1/auth/signup')
      .send(newUser).end((error, response) => {
        response.should.have.status(422);
        response.body.should.be.a('object');
        response.body.should.have.property('status').eql('fail');
        response.body.message.should.be.eql('enter a valid last name');
        done();
      });
  });
  it('should return an eror if user enters an invalid email ', (done) => {
    const newUser = {
      firstName: 'Augustine',
      lastName: 'ezinwa',
      email: 'augustineezinwa@@gmail.com',
      password: '5654545q',
      confirmPassword: '5654545q',
    };
    chai.request(app).post('/api/v1/auth/signup')
      .send(newUser).end((error, response) => {
        response.should.have.status(422);
        response.body.should.be.a('object');
        response.body.should.have.property('status').eql('fail');
        response.body.message.should.be.eql('enter a valid email-address');
        done();
      });
  });
  it('should return an eror if user enters an invalid password ', (done) => {
    const newUser = {
      firstName: 'Augustine',
      lastName: 'ezinwa',
      email: 'augustineezinwa@gmail.com',
      password: '5654545',
      confirmPassword: '5654545q',
    };
    chai.request(app).post('/api/v1/auth/signup')
      .send(newUser).end((error, response) => {
        response.should.have.status(422);
        response.body.should.be.a('object');
        response.body.should.have.property('status').eql('fail');
        response.body.message.should.be.eql('password must contain a number or special character');
        done();
      });
  });
  it('should return an eror if user fails to enter a matching password', (done) => {
    const newUser = {
      firstName: 'Augustine',
      lastName: 'ezinwa',
      email: 'augustineezinwa@gmail.com',
      password: '5654545q',
      confirmPassword: '5654545',
    };
    chai.request(app).post('/api/v1/auth/signup')
      .send(newUser).end((error, response) => {
        response.should.have.status(422);
        response.body.should.be.a('object');
        response.body.should.have.property('status').eql('fail');
        response.body.message.should.be.eql('confirm password does not match');
        done();
      });
  });
});

describe('Testing for empty fields on signup', () => {
  it('should return an error if user enters an empty firstname ', (done) => {
    const newUser = {
      firstName: '',
      lastName: 'ezinwa',
      email: 'augustineezinwa@gmail.com',
      password: '5654545q',
      confirmPassword: '5654545q',
    };
    chai.request(app).post('/api/v1/auth/signup')
      .send(newUser).end((error, response) => {
        response.should.have.status(422);
        response.body.should.be.a('object');
        response.body.should.have.property('status').eql('fail');
        response.body.message.should.be.eql('enter a valid first name');
        done();
      });
  });
  it('should return an eror if user enters an invalid lastname ', (done) => {
    const newUser = {
      firstName: 'Augustine',
      lastName: '',
      email: 'augustineezinwa@gmail.com',
      password: '5654545q',
      confirmPassword: '5654545q',
    };
    chai.request(app).post('/api/v1/auth/signup')
      .send(newUser).end((error, response) => {
        response.should.have.status(422);
        response.body.should.be.a('object');
        response.body.should.have.property('status').eql('fail');
        response.body.message.should.be.eql('enter a valid last name');
        done();
      });
  });
  it('should return an eror if user enters an invalid email ', (done) => {
    const newUser = {
      firstName: 'Augustine',
      lastName: 'ezinwa',
      email: '',
      password: '5654545q',
      confirmPassword: '5654545q',
    };
    chai.request(app).post('/api/v1/auth/signup')
      .send(newUser).end((error, response) => {
        response.should.have.status(422);
        response.body.should.be.a('object');
        response.body.should.have.property('status').eql('fail');
        response.body.message.should.be.eql('enter a valid email-address');
        done();
      });
  });
  it('should return an error if user enters no password ', (done) => {
    const newUser = {
      firstName: 'Augustine',
      lastName: 'ezinwa',
      email: 'augustineezinwa@gmail.com',

      confirmPassword: '5654545q',
    };
    chai.request(app).post('/api/v1/auth/signup')
      .send(newUser).end((error, response) => {
        response.should.have.status(422);
        response.body.should.be.a('object');
        response.body.should.have.property('status').eql('fail');
        response.body.message.should.be.eql('password cant be empty');
        done();
      });
  });
  it('should return an eror if user fails to enter confirm password', (done) => {
    const newUser = {
      firstName: 'Augustine',
      lastName: 'ezinwa',
      email: 'augustineezinwa@gmail.com',
      password: '5654545q',

    };
    chai.request(app).post('/api/v1/auth/signup')
      .send(newUser).end((error, response) => {
        response.should.have.status(422);
        response.body.should.be.a('object');
        response.body.should.have.property('status').eql('fail');
        response.body.message.should.be.eql('confirm password cant be empty');
        done();
      });
  });
});
