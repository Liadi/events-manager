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

describe('api', () => {
  before(() => {
    data = {
      userFirstName: 'Seun',
    }
  });
  after(() => {
    data = {}
  });

  it('Should return error upon creating new user', (done) => {
    request.post('/api/v1/users')
    .send(data)
    .end((err, res) => {
      expect(res.status).to.equal(400);
      expect(res.body.message).to.equal('lastname field cannot be empty'); 
      expect(res.body.status).to.equal(false); 
      done(); 
    });

  });
});
