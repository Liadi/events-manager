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

  data = {
    userFirstName: 'tola',
    userLastName: 'liadi',
    userEmail: 'liadi.omotola@gmail.com',
    userPassword: 'fatBoy',
    userPhoneNumber: '08181546011',
  };
  describe('user signup api', () => {
    it('returns first name required', (done) => {
      request.post('/api/v1/users/signup').send(data).end((err, res) => {
        // expect(res.status).to.equal(201);
        expect(res.body.message).to.equal('user created');
        expect(res.body.status).to.equal(true);
        done();
      });
    });
  });
});

module.exports = app;
