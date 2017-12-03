import { expect } from 'chai';
import supertest from 'supertest';
import app from './../index';


let data = {};
let regularUserToken = null;
let adminUserToken = null;
const request = supertest(app);

describe('api', () => {
  it('returns HTTP response', (done) => {
    request.get('/api/v1/').end((err, res) => {
      expect(res.status).to.equal(200);
      expect(res.body.message).to.equal('Welcome to EM api');
      done();
    });
  });

  describe('user signup api', () => {
    beforeEach(() => {
      data = {
        userFirstName: 'tola',
        userLastName: 'liadi',
        userEmail: 'liadi.omotola@yahoo.com',
        userPassword: '###StupidCatJerrySaid',
        userPhoneNumber: '08181546011',
      };
    });

    it('returns first name required', (done) => {
      data.userFirstName = null;
      request.post('/api/v1/users/signup').send(data).end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('User.userFirstName cannot be null');
        expect(res.body.status).to.equal(false);
        done();
      });
    });

    it('returns user email required', (done) => {
      data.userEmail = null;
      request.post('/api/v1/users/signup').send(data).end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('email required');
        expect(res.body.status).to.equal(false);
        done();
      });
    });

    it('returns password required', (done) => {
      data.userPassword = null;
      request.post('/api/v1/users/signup').send(data).end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('password required');
        expect(res.body.status).to.equal(false);
        done();
      });
    });

    it('returns account with email already exist', (done) => {
      data.userEmail = 'liadi.omotola@gmail.com';
      request.post('/api/v1/users/signup').send(data).end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('account with email already exists');
        expect(res.body.status).to.equal(false);
        done();
      });
    });

    it('returns invalid email type', (done) => {
      data.userEmail = 'liadi.omotola@gmailcom';
      request.post('/api/v1/users/signup').send(data).end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('invalid input, email is incorrect');
        expect(res.body.status).to.equal(false);
        done();
      });
    });

    it('returns invalid password length', (done) => {
      data.userPassword = 'fatBo';
      request.post('/api/v1/users/signup').send(data).end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('password should have at least 6 characters');
        expect(res.body.status).to.equal(false);
        done();
      });
    });

    it('creates user', (done) => {
      request.post('/api/v1/users/signup').send(data).end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.message).to.equal('user created');
        expect(res.body.status).to.equal(true);
        done();
      });
    });

    it('creates user without last name', (done) => {
      data.userLastName = null;
      data.userEmail = 'a@b.com'; // unique email
      request.post('/api/v1/users/signup').send(data).end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.message).to.equal('user created');
        expect(res.body.status).to.equal(true);
        done();
      });
    });
  });

  describe('user signin api', () => {
    beforeEach(() => {
      data = {
        userEmail: 'liadi.omotola@yahoo.com',
        userPassword: '###StupidCatJerrySaid',
      };
    });

    it('returns email required', (done) => {
      data.userEmail = null;
      request.post('/api/v1/users/signin').send(data).end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('email is required');
        expect(res.body.status).to.equal(false);
        done();
      });
    });

    it('returns password required', (done) => {
      data.userPassword = null;
      request.post('/api/v1/users/signin').send(data).end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('password is required');
        expect(res.body.status).to.equal(false);
        done();
      });
    });

    it('rejects wrong email and password combination', (done) => {
      data.userEmail = 'liadi.omotola@gmailcom';
      request.post('/api/v1/users/signin').send(data).end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.message).to.equal('authentication failed: wrong email or password');
        expect(res.body.status).to.equal(false);
        done();
      });
    });

    it('rejects wrong email and password combination', (done) => {
      data.userPassword = 'fatBoy';
      request.post('/api/v1/users/signin').send(data).end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.message).to.equal('authentication failed: wrong email or password');
        expect(res.body.status).to.equal(false);
        done();
      });
    });

    it('returns signed in user (regular)', (done) => {
      request.post('/api/v1/users/signin').send(data).end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('successfully signed in');
        expect(res.body.status).to.equal(true);
        expect(res.body).to.have.property('user');
        expect(res.body).to.have.property('user').to.have.property('userType').to.equal('regular');
        expect(res.body).to.have.property('token');
        regularUserToken = res.body.token;
        done();
      });
    });

    it('returns signed in user (admin)', (done) => {
      // seeded admin
      data.userEmail = 'liadi.omotola@gmail.com';
      data.userPassword = 'fatBoy';

      request.post('/api/v1/users/signin').send(data).end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('successfully signed in');
        expect(res.body.status).to.equal(true);
        expect(res.body).to.have.property('user');
        expect(res.body).to.have.property('user').to.have.property('userType').to.equal('admin');
        expect(res.body).to.have.property('token');
        adminUserToken = res.body.token;
        done();
      });
    });
  });

  describe('create center api', () => {
    beforeEach(() => {
      data = {
        centerName: 'Ventura',
        centerAddress: '1, Ventura villa off Airport road, Joke island, Lagos, Nigeria.',
        centerCountry: 'Nigeria',
        centerState: 'Lagos',
        centerCity: 'Lagos',
        centerDescription: 'At the heart of lagos. Very classy and designed for grand occasions such as weeding, luncheon...',
        centerMantra: 'We beat the rest',
        centerCapacity: '50000',
        centerRate: '20000',
        centerStatus: 'available',
        centerAmenities: 'Toilets, parking space, fully air-conditioned...',
        token: adminUserToken,
      };
    });

    it('returns token is required,', (done) => {
      data.token = null;
      request.post('/api/v1/centers').send(data).end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.message).to.equal('You only have access, if you\'re logged in');
        expect(res.body.status).to.equal(false);
        done();
      });
    });

    it('returns invalid token,', (done) => {
      data.token = 'qKOSKoISKLkSLKSsSOKSOOloks.SLS.sjsokjssioskscaAA1343scs';
      request.post('/api/v1/centers').send(data).end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('pls, login');
        expect(res.body.status).to.equal(false);
        done();
      });
    });

    it('denies regular user', (done) => {
      data.token = regularUserToken;
      request.post('/api/v1/centers').send(data).end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body.message).to.equal('access denied');
        expect(res.body.status).to.equal(false);
        done();
      });
    });

    it('returns center name required', (done) => {
      data.centerName = null;
      request.post('/api/v1/centers').send(data).end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Center.centerName cannot be null');
        expect(res.body.status).to.equal(false);
        done();
      });
    });

    it('returns center name too long', (done) => {
      data.centerName = 'NiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceLongerThan 50';
      request.post('/api/v1/centers').send(data).end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('invalid input, center name should be of length 1-50');
        expect(res.body.status).to.equal(false);
        done();
      });
    });
  });
});

module.exports = app;
