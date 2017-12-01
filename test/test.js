import { assert, expect } from 'chai';
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
});
