import { assert, expect } from 'chai';
import app from './../index';
import supertest from 'supertest'; 


let data = {};
const request = supertest(app);

describe('api', () => {
  it('returns HTTP response', (done) => {
    request.get('/api/v1/')
    .end((err, res) => {
      expect(res.status).to.equal(200);
      expect(res.body.message).to.equal('Welcome to EM api'); 
      expect(res.body.status).to.equal(true); 
      done(); 
    });

  });
});

describe('create user', () => {
  beforeEach(() => {
    data = {
      userFirstName: 'Muyiwa',
      userLastName: 'Ojerinde',
      userEmail: 'x@y.com',
      userPassword: 'my pass',
      userPhone: '0359693',
      userStatus: 'regular',
    }
  });

  it('Should return error if no firstname', (done) => {
    data.userFirstName = null;
    request.post('/api/v1/users')
    .send(data)
    .end((err, res) => {
      expect(res.status).to.equal(400);
      expect(res.body.message).to.equal('firstname field cannot be empty'); 
      expect(res.body.status).to.equal(false); 
      done(); 
    });

  });

  it('Should return error if no lastname', (done) => {
    data.userLastName = null;
    request.post('/api/v1/users')
    .send(data)
    .end((err, res) => {
      expect(res.status).to.equal(400);
      expect(res.body.message).to.equal('lastname field cannot be empty'); 
      expect(res.body.status).to.equal(false); 
      done(); 
    });

  });

  it('Should return error if no email', (done) => {
    data.userEmail = null;
    request.post('/api/v1/users')
    .send(data)
    .end((err, res) => {
      expect(res.status).to.equal(400);
      expect(res.body.message).to.equal('email field cannot be empty'); 
      expect(res.body.status).to.equal(false); 
      done(); 
    });

  });

  it('Should return error if no password', (done) => {
    data.userPassword = null;
    request.post('/api/v1/users')
    .send(data)
    .end((err, res) => {
      expect(res.status).to.equal(400);
      expect(res.body.message).to.equal('password field cannot be empty'); 
      expect(res.body.status).to.equal(false); 
      done(); 
    });

  });


  it('Should return error if no phone', (done) => {
    data.userPhone = null;
    request.post('/api/v1/users')
    .send(data)
    .end((err, res) => {
      expect(res.status).to.equal(201);
      expect(res.body.message).to.equal('User created'); 
      expect(res.body.status).to.equal(true); 
      done(); 
    });

  });

  // it('Should return error if no status', (done) => {
  //   data.userStatus = null;
  //   request.post('/api/v1/users')
  //   .send(data)
  //   .end((err, res) => {
  //     expect(res.status).to.equal(400);
  //     expect(res.body.message).to.equal('firstname field cannot be empty'); 
  //     expect(res.body.status).to.equal(false); 
  //     done(); 
  //   });

  // });


});
