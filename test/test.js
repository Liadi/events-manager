import { expect } from 'chai';
import supertest from 'supertest';
import app from './../index';


let data = {};
const request = supertest(app);

describe('api', () => {
  it('returns HTTP response', (done) => {
    request.get('/api/v1/')
      .end((err, res) => {
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
      data.userFirstName = '';
      request.post('/api/v1/users/signup').send(data).end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('User.userFirstName cannot be null, pls fill in the fields appropriately');
        expect(res.body.status).to.equal(false);
        done();
      });
    });

    it('returns user email required', (done) => {
      data.userEmail = '';
      request.post('/api/v1/users/signup').send(data).end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('email required');
        expect(res.body.status).to.equal(false);
        done();
      });
    });

    it('returns password required', (done) => {
      data.userPassword = '';
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
        expect(res.body.message).to.equal('invalid input, email is incorrect, pls fill in the fields appropriately');
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
  });
});

module.exports = app;
