import chai from 'chai';
import SqlHelper from '../../helper/SqlHelper';

const { checkEmail } = SqlHelper;

describe('testing sql querys', () => {
  it('should return an sql query string to check an email', (done) => {
    const output = checkEmail('augustineezinwa@gmail.com');
    output.should.have.property('text').eql('SELECT * FROM users WHERE users.email = $1');
    output.should.have.property('values').eql(['augustineezinwa@gmail.com']);
    done();
  });
});
