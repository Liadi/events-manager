import { expect } from 'chai';
import supertest from 'supertest';
import app from '../server';
import db from './../server/models';

const { Center, User, Event } = db;
const request = supertest(app);

let [regularUserToken, adminUserToken, centerId, eventId, data] = [null, null, null, null, {}];
const [eventIdArray, centerIdArray] = [[], []];

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

    it('checks for created user in database', () => {
      return User.findOne({
        where: { userEmail: 'a@b.com' },
      }).then((user) => {
        expect(user).to.not.equal(null);
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

  describe('create (add) admin', () => {
    beforeEach(() => {
      data = {
        userFirstName: 'tola',
        userLastName: 'liadi',
        userEmail: 'liadi.rilwan@yahoo.com',
        userPassword: '###StupidCatJerrySaid',
        userPhoneNumber: '08181546011',
      };
    });

    it('creates admin', (done) => {
      data.token = adminUserToken;
      request.post('/api/v1/users/admin').send(data).end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.message).to.equal('user created');
        expect(res.body.status).to.equal(true);
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
      data.centerName = 'NiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceLongerThan 30';
      request.post('/api/v1/centers').send(data).end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('invalid input, center name should not be more than 30 characters');
        expect(res.body.status).to.equal(false);
        done();
      });
    });

    it('returns center address required', (done) => {
      data.centerAddress = null;
      request.post('/api/v1/centers').send(data).end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Center.centerAddress cannot be null');
        expect(res.body.status).to.equal(false);
        done();
      });
    });

    it('returns center address too long', (done) => {
      data.centerAddress = '1, Ventura villa off Airport road, Joke island, Lagos, NigeriaNigeriaNigeriaNigeriaNigeriaNigeriaNigeriaNigeriaNigeriaNigeriaNigeriaNigeria.';
      request.post('/api/v1/centers').send(data).end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('invalid input, center addrress should not be more than 120 characters');
        expect(res.body.status).to.equal(false);
        done();
      });
    });

    it('returns center country reuired', (done) => {
      data.centerCountry = null;
      request.post('/api/v1/centers').send(data).end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Center.centerCountry cannot be null');
        expect(res.body.status).to.equal(false);
        done();
      });
    });

    it('returns center country too long', (done) => {
      data.centerCountry = 'NigeriaNigeriaNigeriaNigeriaNigeriaNigeriaNigeriaNigeria';
      request.post('/api/v1/centers').send(data).end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('invalid input, center country should not be more than 30 characters');
        expect(res.body.status).to.equal(false);
        done();
      });
    });

    it('returns center state required', (done) => {
      data.centerState = null;
      request.post('/api/v1/centers').send(data).end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Center.centerState cannot be null');
        expect(res.body.status).to.equal(false);
        done();
      });
    });

    it('returns center state too long', (done) => {
      data.centerState = 'LagosLagosLagosLagosLagosLagosLagosLagosLagosLagosLagos';
      request.post('/api/v1/centers').send(data).end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('invalid input, center state should not be more than 30 characters');
        expect(res.body.status).to.equal(false);
        done();
      });
    });

    it('returns center city too long', (done) => {
      data.centerCity = 'LagosLagosLagosLagosLagosLagosLagosLagosLagosLagosLagos';
      request.post('/api/v1/centers').send(data).end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('invalid input, center city should not be more than 30 characters');
        expect(res.body.status).to.equal(false);
        done();
      });
    });

    it('returns center mantra too long', (done) => {
      data.centerMantra = 'just do it!just do it!just do it!just do it!just do it!just do it!just do it!just do it!just do it!just do it!';
      request.post('/api/v1/centers').send(data).end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('invalid input, center mantra should not be more than 50 characters');
        expect(res.body.status).to.equal(false);
        done();
      });
    });

    it('returns center capacity required', (done) => {
      data.centerCapacity = null;
      request.post('/api/v1/centers').send(data).end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Center.centerCapacity cannot be null');
        expect(res.body.status).to.equal(false);
        done();
      });
    });

    it('returns center capacity should be valid number', (done) => {
      data.centerCapacity = 'abc123';
      request.post('/api/v1/centers').send(data).end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('invalid input, center capacity should be a positive whole number');
        expect(res.body.status).to.equal(false);
        done();
      });
    });

    it('returns center capacity should be positive number', (done) => {
      data.centerCapacity = '-1234';
      request.post('/api/v1/centers').send(data).end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('invalid input, center capacity should be a positive whole number');
        expect(res.body.status).to.equal(false);
        done();
      });
    });

    it('returns center capacity should be positive number', (done) => {
      data.centerCapacity = '12.34';
      request.post('/api/v1/centers').send(data).end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('invalid input, center capacity should be a positive whole number');
        expect(res.body.status).to.equal(false);
        done();
      });
    });

    it('returns center capacity minimum (5)', (done) => {
      data.centerCapacity = '4';
      request.post('/api/v1/centers').send(data).end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('invalid input, center capacity should not be less than five (5)');
        expect(res.body.status).to.equal(false);
        done();
      });
    });

    it('returns center capacity maximum (1000000000)', (done) => {
      data.centerCapacity = '1000000001';
      request.post('/api/v1/centers').send(data).end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('invalid input, center capacity should not be more than a billion (1000000000)');
        expect(res.body.status).to.equal(false);
        done();
      });
    });

    it('returns center rate required', (done) => {
      data.centerRate = null;
      request.post('/api/v1/centers').send(data).end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Center.centerRate cannot be null');
        expect(res.body.status).to.equal(false);
        done();
      });
    });

    it('returns center rate should be valid number', (done) => {
      data.centerRate = 'abc123';
      request.post('/api/v1/centers').send(data).end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('invalid input, center rate should be a positive whole number');
        expect(res.body.status).to.equal(false);
        done();
      });
    });

    it('returns center rate should be positive number', (done) => {
      data.centerRate = '-1234';
      request.post('/api/v1/centers').send(data).end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('invalid input, center rate should be a positive whole number');
        expect(res.body.status).to.equal(false);
        done();
      });
    });

    it('returns center rate should be positive number', (done) => {
      data.centerRate = '1234.56';
      request.post('/api/v1/centers').send(data).end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('invalid input, center rate should be a positive whole number');
        expect(res.body.status).to.equal(false);
        done();
      });
    });

    it('returns center rate minimum (5)', (done) => {
      data.centerRate = '419';
      request.post('/api/v1/centers').send(data).end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('invalid input, center rate should not be less than five hundred naira (#500)');
        expect(res.body.status).to.equal(false);
        done();
      });
    });

    it('returns center rate maximum (1000000000)', (done) => {
      data.centerRate = '1000000001';
      request.post('/api/v1/centers').send(data).end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('invalid input, center rate should not be more than 1 billion naira (#1000000000)');
        expect(res.body.status).to.equal(false);
        done();
      });
    });

    it('returns \'available\' as center status default', (done) => {
      data.centerStatus = null;
      request.post('/api/v1/centers').send(data).end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.message).to.equal('center created');
        expect(res.body.status).to.equal(true);
        expect(res.body).to.have.property('center');
        expect(res.body).to.have.property('center').to.have.property('centerStatus').to.equal('available');
        centerIdArray.push(res.body.center.id);
        done();
      });
    });

    it('returns \'available\' as center status default', (done) => {
      data.centerStatus = 'I am not sure';
      request.post('/api/v1/centers').send(data).end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.message).to.equal('center created');
        expect(res.body.status).to.equal(true);
        expect(res.body).to.have.property('center');
        expect(res.body).to.have.property('center').to.have.property('centerStatus').to.equal('available');
        centerIdArray.push(res.body.center.id);
        done();
      });
    });

    it('returns \'unavailable\' as center status when set', (done) => {
      data.centerStatus = 'unavailable';
      request.post('/api/v1/centers').send(data).end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.message).to.equal('center created');
        expect(res.body.status).to.equal(true);
        expect(res.body).to.have.property('center');
        expect(res.body).to.have.property('center').to.have.property('centerStatus').to.equal('unavailable');
        centerIdArray.push(res.body.center.id);
        done();
      });
    });

    it('accepts center amenities as null', (done) => {
      data.centerAmenities = null;
      request.post('/api/v1/centers').send(data).end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.message).to.equal('center created');
        expect(res.body.status).to.equal(true);
        expect(res.body).to.have.property('center');
        expect(res.body).to.have.property('center').to.have.property('centerAmenities').to.equal(null);
        centerIdArray.push(res.body.center.id);
        done();
      });
    });

    centerIdArray.forEach((id) => {
      it('checks for created center in database', () => {
        return Center.findById(id).then((center) => {
          expect(center).to.not.equal(null);
        });
      });
    });
  });

  describe('modify center api', () => {
    beforeEach(() => {
      data = {
        token: adminUserToken,
      };
    });

    it('denies \'not signed in\' user access', (done) => {
      data.token = null;
      request.put('/api/v1/centers/aa').send(data).end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.message).to.equal('You only have access, if you\'re logged in');
        expect(res.body.status).to.equal(false);
        done();
      });
    });

    it('denies user with invalid token', (done) => {
      data.token = 'iiuohaog78981whenjns.jhvztuvsbuA7389gbhwdiuBe3';
      request.put('/api/v1/centers/aa').send(data).end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('pls, login');
        expect(res.body.status).to.equal(false);
        done();
      });
    });

    it('rejects regular user', (done) => {
      data.token = regularUserToken;
      request.put('/api/v1/centers/aa').send(data).end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body.message).to.equal('access denied');
        expect(res.body.status).to.equal(false);
        done();
      });
    });

    it('rejects invalid param', (done) => {
      request.put('/api/v1/centers/aa').send(data).end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('invalid centerId param');
        expect(res.body.status).to.equal(false);
        done();
      });
    });

    it('center does not exist', (done) => {
      request.put(`/api/v1/centers/${1000000}`).send(data).end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('center does not exist');
        expect(res.body.status).to.equal(false);
        done();
      });
    });

    it('updates center name', (done) => {
      data.centerName = 'New Ventura';
      centerId = centerIdArray[centerIdArray.length - 1];
      request.put(`/api/v1/centers/${centerId}`).send(data).end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('center updated');
        expect(res.body.status).to.equal(true);
        expect(res.body).to.have.property('center').to.have.property('centerName').to.equal('New Ventura');
        done();
      });
    });

    it('updates center address', (done) => {
      data.centerAddress = '1, New Ventura villa off Airport road, Joke island, Lagos, Nigeria.';
      request.put(`/api/v1/centers/${centerId}`).send(data).end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('center updated');
        expect(res.body.status).to.equal(true);
        expect(res.body).to.have.property('center').to.have.property('centerAddress').to.equal('1, New Ventura villa off Airport road, Joke island, Lagos, Nigeria.');
        done();
      });
    });

    it('updates center country', (done) => {
      data.centerCountry = 'New Nigeria';
      request.put(`/api/v1/centers/${centerId}`).send(data).end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('center updated');
        expect(res.body.status).to.equal(true);
        expect(res.body).to.have.property('center').to.have.property('centerCountry').to.equal('New Nigeria');
        done();
      });
    });

    it('updates center state', (done) => {
      data.centerState = 'New Lagos';
      request.put(`/api/v1/centers/${centerId}`).send(data).end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('center updated');
        expect(res.body.status).to.equal(true);
        expect(res.body).to.have.property('center').to.have.property('centerState').to.equal('New Lagos');
        done();
      });
    });

    it('updates center city', (done) => {
      data.centerCity = 'New Lagos city';
      request.put(`/api/v1/centers/${centerId}`).send(data).end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('center updated');
        expect(res.body.status).to.equal(true);
        expect(res.body).to.have.property('center').to.have.property('centerCity').to.equal('New Lagos city');
        done();
      });
    });

    it('updates center description', (done) => {
      data.centerDescription = 'New descrip. At the heart of lagos. Very classy and designed for grand occasions such as weeding, luncheon...';
      request.put(`/api/v1/centers/${centerId}`).send(data).end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('center updated');
        expect(res.body.status).to.equal(true);
        expect(res.body).to.have.property('center').to.have.property('centerDescription').to.equal('New descrip. At the heart of lagos. Very classy and designed for grand occasions such as weeding, luncheon...');
        done();
      });
    });

    it('updates center mantra', (done) => {
      data.centerMantra = 'New mantra. We beat the rest';
      request.put(`/api/v1/centers/${centerId}`).send(data).end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('center updated');
        expect(res.body.status).to.equal(true);
        expect(res.body).to.have.property('center').to.have.property('centerMantra').to.equal('New mantra. We beat the rest');
        done();
      });
    });

    it('updates center capacity', (done) => {
      data.centerCapacity = '50002';
      request.put(`/api/v1/centers/${centerId}`).send(data).end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('center updated');
        expect(res.body.status).to.equal(true);
        expect(res.body).to.have.property('center').to.have.property('centerCapacity').to.equal('50002');
        done();
      });
    });

    it('updates center rate', (done) => {
      data.centerRate = '20001';
      request.put(`/api/v1/centers/${centerId}`).send(data).end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('center updated');
        expect(res.body.status).to.equal(true);
        expect(res.body).to.have.property('center').to.have.property('centerRate').to.equal('20001');
        done();
      });
    });

    it('updates center amenities', (done) => {
      data.centerAmenities = 'New Toilets,New parking space,New fully air-conditioned...';
      request.put(`/api/v1/centers/${centerId}`).send(data).end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('center updated');
        expect(res.body.status).to.equal(true);
        expect(res.body).to.have.property('center').to.have.property('centerAmenities').to.equal('New Toilets,New parking space,New fully air-conditioned...');
        done();
      });
    });

    it('updates center status', (done) => {
      data.centerStatus = 'unavailable';
      request.put(`/api/v1/centers/${centerId}`).send(data).end((err, res) => {
        expect(res.status).to.equal(200);  
        expect(res.body.message).to.equal('center updated');
        expect(res.body.status).to.equal(true);
        expect(res.body).to.have.property('center').to.have.property('centerStatus').to.equal('unavailable');
        done();
      });
    });

    it('updates center status to default', (done) => {
      data.centerStatus = 'closed'; // defaults to 'available'. status type=ENUM('available', 'unavailable')
      request.put(`/api/v1/centers/${centerId}`).send(data).end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('center updated');
        expect(res.body.status).to.equal(true);
        expect(res.body).to.have.property('center').to.have.property('centerStatus').to.equal('available');
        done();
      });
    });

    it('validates entries', (done) => {
      data.centerName = 'NewNameNewNameNewNameNewNameNewNameNewNameNewNameNewNameNewNameNewName'; 
      request.put(`/api/v1/centers/${centerId}`).send(data).end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('invalid input, center name should not be more than 30 characters');
        expect(res.body.status).to.equal(false);
        expect(res.body).to.not.have.property('center');
        done();
      });
    });
  });

  describe('get center', () => {
    before(() => {
      data = {};
    });

    it('rejects invalid param', (done) => {
      request.get('/api/v1/centers/aa').send(data).end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('invalid centerId param');
        expect(res.body.status).to.equal(false);
        done();
      });
    });

    it('center does not exist', (done) => {
      request.get('/api/v1/centers/1000000').send(data).end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('center does not exist');
        expect(res.body.status).to.equal(false);
        done();
      });
    });

    it('returns center', (done) => {
      centerId = centerIdArray[centerIdArray.length - 1];
      request.get(`/api/v1/centers/${centerId}`).send(data).end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('center found');
        expect(res.body.status).to.equal(true);
        expect(res.body).to.have.property('center').to.not.have.property('events');
        done();
      });
    });

    it('returns center with slated events for user', (done) => {
      data.token = regularUserToken;
      centerId = centerIdArray[centerIdArray.length - 1];
      request.get(`/api/v1/centers/${centerId}`).send(data).end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('center found');
        expect(res.body.status).to.equal(true);
        expect(res.body).to.have.property('center').to.have.property('events');
        done();
      });
    });
  });

  describe('delete center', () => {
    before(() => {
      centerId = centerIdArray[centerIdArray.length - 1];
    });

    after(() => {
      centerIdArray.pop();
      centerId = centerIdArray[centerIdArray.length - 1];
    });

    beforeEach(() => {
      data = {
        token: adminUserToken,
      };
    });

    it('denies \'not signed in\' user access', (done) => {
      data.token = null;
      request.delete('/api/v1/centers/aa').send(data).end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.message).to.equal('You only have access, if you\'re logged in');
        expect(res.body.status).to.equal(false);
        done();
      });
    });

    it('denies user with invalid token', (done) => {
      data.token = 'iiuohaog78981whenjns.jhvztuvsbuA7389gbhwdiuBe3';
      request.delete('/api/v1/centers/aa').send(data).end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('pls, login');
        expect(res.body.status).to.equal(false);
        done();
      });
    });

    it('rejects regular user', (done) => {
      data.token = regularUserToken;
      request.delete('/api/v1/centers/aa').send(data).end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body.message).to.equal('access denied');
        expect(res.body.status).to.equal(false);
        done();
      });
    });

    it('rejects invalid param', (done) => {
      request.delete('/api/v1/centers/aa').send(data).end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('invalid centerId param');
        expect(res.body.status).to.equal(false);
        done();
      });
    });

    it('center does not exist', (done) => {
      request.delete(`/api/v1/centers/${1000000}`).send(data).end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('center does not exist');
        expect(res.body.status).to.equal(false);
        done();
      });
    });

    it('deletes center', (done) => {
      centerId = centerIdArray[centerIdArray.length - 1];
      request.delete(`/api/v1/centers/${centerId}`).send(data).end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('center deleted');
        expect(res.body.status).to.equal(true);
        done();
      });
    });

    it('checks if center is deleted', () => {
      return Center.findById(centerId).then((center) => {
        expect(center).to.equal(null);
      });
    });
  });

  describe('get all centers', () => {
    beforeEach(() => {
      data = {
        token: regularUserToken,
      };
    });

    it('returns centers', (done) => {
      request.get('/api/v1/centers').send(data).end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('centers found');
        expect(res.body.status).to.equal(true);
        done();
      });
    });
  });

  describe('create event', () => {
    const today = new Date();
    const [year, month, date] = [today.getFullYear(), today.getMonth() + 1, today.getDate()];
    let [tempYear, tempMonth, tempDate] = [year, month, date];

    beforeEach(() => {
      data = {
        token: regularUserToken,
        centerId: centerIdArray[centerIdArray.length - 1].toString(),
        eventName: 'My birthday party',
      };
    });

    it('rejects null token', (done) => {
      data.token = null;
      request.post('/api/v1/events').send(data).end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.message).to.equal('You only have access, if you\'re logged in');
        expect(res.body.status).to.equal(false);
        done();
      });
    });

    it('rejects invalid token', (done) => {
      data.token = 'invalidTokenwomp2ps1jnno2.wioj2oiiunj0I9hbjJNJnbn2iubbK0';
      request.post('/api/v1/events').send(data).end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('pls, login');
        expect(res.body.status).to.equal(false);
        done();
      });
    });

    it('rejects null eventTime', (done) => {
      data.eventTime = null;
      request.post('/api/v1/events').send(data).end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('invalid eventTime. eventTime should not be null');
        expect(res.body.status).to.equal(false);
        done();
      });
    });

    it('rejects invalid eventTime', (done) => {
      data.eventTime = 'Wed 2, Jan 2017';
      request.post('/api/v1/events').send(data).end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('invalid eventTime. Year, month and date should be numbers. Date format: yyyy-mm-dd (2050-06-30)');
        expect(res.body.status).to.equal(false);
        done();
      });
    });

    it('rejects invalid eventTime (zero)', (done) => {
      data.eventTime = `${year}-0-${date}`;
      request.post('/api/v1/events').send(data).end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('invalid eventTime. Year, month and date should be numbers. Date format: yyyy-mm-dd (2050-06-30). Zero (0) is not a valid input');
        expect(res.body.status).to.equal(false);
        done();
      });
    });

    it('rejects invalid eventTime (month exceeds 12)', (done) => {
      data.eventTime = `${year}-13-${date}`;
      request.post('/api/v1/events').send(data).end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('invalid eventTime month');
        expect(res.body.status).to.equal(false);
        done();
      });
    });

    it('rejects leap year with more than 29 days in feb', (done) => {
      data.eventTime = '2020-02-30';
      request.post('/api/v1/events').send(data).end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal(`invalid eventTime. For leap year 2020, february should not exceed 29 days`);
        expect(res.body.status).to.equal(false);
        done();
      });
    });

    it('rejects year (not leap year) with more than 28 days in feb', (done) => {
      data.eventTime = '2017-02-29';
      request.post('/api/v1/events').send(data).end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('invalid eventTime. For year 2017, february should not exceed 28 days');
        expect(res.body.status).to.equal(false);
        done();
      });
    });

    // Sept, Apr, Jun, Nov
    [4, 6, 9, 11].forEach ((monthInstance) => {
      it(`rejects ${monthInstance}th month with more than 30 days`, (done) => {
        data.eventTime = `${year}-${monthInstance}-31`;
        request.post('/api/v1/events').send(data).end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal(`invalid eventTime. For month ${monthInstance}, date should not exceed 30 days`);
          expect(res.body.status).to.equal(false);
          done();
        });
      });
    });

    // Jan, Mar, May, Jul, Aug, Oct, Dec
    [1, 3, 5, 7, 8, 10, 12].forEach ((tempMonth) =>  {
      it(`rejects ${tempMonth}th month with more than 31 days`, (done) => {
        data.eventTime = `${year}-${tempMonth}-32`;
        request.post('/api/v1/events').send(data).end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal(`invalid eventTime. For month ${tempMonth}, date should not exceed 31 days`);
          expect(res.body.status).to.equal(false);
          done();
        });
      });
    });

    it('rejects too far in future (2 years or more)', (done) => {
      data.eventTime = `${year + 3}-${month}-${date}`;
      request.post('/api/v1/events').send(data).end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('cannot book an event 2 years before eventTime');
        expect(res.body.status).to.equal(false);
        done();
      });
    });

    it('rejects eventTime in past', (done) => {
      data.eventTime = `${year - 1}-${month}-${date}`;
      request.post('/api/v1/events').send(data).end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('invalid eventTime. Time in the past');
        expect(res.body.status).to.equal(false);
        done();
      });
    });

    it('rejects eventTime in 3 days or less', (done) => {
      let tempTime = new Date (year, month - 1, (date + 2)); 
      data.eventTime = `${tempTime.getFullYear()}-${tempTime.getMonth() + 1}-${tempTime.getDate()}`;
      request.post('/api/v1/events').send(data).end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('invalid eventTime. Event cannot be scheduled in 3 days or less');
        expect(res.body.status).to.equal(false);
        done();
      });
    });

    it('rejects center not found', (done) => {
      let tempTime = new Date (year, month - 1, (date + 4)); 
      data.eventTime = `${tempTime.getFullYear()}-${tempTime.getMonth() + 1}-${tempTime.getDate()}`;
      data.centerId = (centerIdArray[centerIdArray.length - 1] + 3).toString();
      request.post('/api/v1/events').send(data).end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('center does not exist');
        expect(res.body.status).to.equal(false);
        done();
      });
    });

    it('rejects null eventName', (done) => {
      let tempTime = new Date (year, month - 1, (date + 4)); 
      data.eventTime = `${tempTime.getFullYear()}-${tempTime.getMonth() + 1}-${tempTime.getDate()}`;
      data.eventName = null;
      request.post('/api/v1/events').send(data).end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Event.eventName cannot be null');
        expect(res.body.status).to.equal(false);
        done();
      });
    });

    it('rejects too long eventName', (done) => {
      let tempTime = new Date (year, month - 1, (date + 4)); 
      data.eventTime = `${tempTime.getFullYear()}-${tempTime.getMonth() + 1}-${tempTime.getDate()}`;
      data.eventName = 'My birthday partyMy birthday partyMy birthday partyMy birthday partyMy birthday partyMy birthday partyMy birthday partyMy birthday party';
      request.post('/api/v1/events').send(data).end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('invalid input, event name should have at most 120 characters');
        expect(res.body.status).to.equal(false);
        done();
      });
    });

    // creates 2 events
    for (let i = 0; i < 2; i = i + 1) {
      it('creates event', (done) => {
        let tempTime = new Date (year, month - 1, (date + 4 + i)); 
        data.eventTime = `${tempTime.getFullYear()}-${tempTime.getMonth() + 1}-${tempTime.getDate()}`;
        request.post('/api/v1/events').send(data).end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.message).to.equal('event created');
          expect(res.body.status).to.equal(true);
          expect(res.body).to.have.property('event').to.have.property('id');
          eventIdArray.push(res.body.event.id);
          done();
        });
      });
    }

    // check for (2) events created
    for (let i = 0; i < eventIdArray.length; i = i + 1) {
      it('checks for created event in database', () => {
        return Event.findOne({
          where: { id: eventIdArray[i] },
          attributes: [ 'eventName' ],
        }).then((event) => {
          expect(event).to.not.equal(null);
        });
      });
    }

    it('rejects event with taken time', (done) => {
      let tempTime = new Date (year, month - 1, (date + 4)); 
      data.eventTime = `${tempTime.getFullYear()}-${tempTime.getMonth() + 1}-${tempTime.getDate()}`;
      request.post('/api/v1/events').send(data).end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('date taken');
        expect(res.body.status).to.equal(false);
        expect(res.body).to.have.not.property('event');
        done();
      });
    });
  });

  describe('modify event', () => {
    beforeEach(() => {
      eventId = eventIdArray[eventIdArray.length - 1];
      data = {
        token: regularUserToken,
      };
    });

    it('modifies event', (done) => {
      data.eventName = 'Mothers birthday';
      request.put(`/api/v1/events/${eventId}`).send(data).end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('event updated');
        expect(res.body.status).to.equal(true);
        done();
      });
    });
  });

  describe('get event', () => {
    beforeEach(() => {
      eventId = eventIdArray[eventIdArray.length - 1];
      data = {
        token: regularUserToken,
      };
    });

    it('returns event', (done) => {
      request.get(`/api/v1/events/${eventId}`).send(data).end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('event found');
        expect(res.body.status).to.equal(true);
        expect(res.body).to.have.property('event');
        done();
      });
    });
  });

  describe('get all events', () => {
    beforeEach(() => {
      data = {
        token: adminUserToken,
      };
    });

    it('returns events', (done) => {
      request.get('/api/v1/events').send(data).end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('events found');
        expect(res.body.status).to.equal(true);
        expect(res.body).to.have.property('events');
        done();
      });
    });
  });

  describe('delete event', () => {
    beforeEach(() => {
      eventId = eventIdArray[eventIdArray.length - 1];
      data = {
        token: regularUserToken,
      };
    });

    it('deletes event', (done) => {
      request.delete(`/api/v1/events/${eventId}`).send(data).end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('event deleted');
        expect(res.body.status).to.equal(true);
        done();
      });
    });
  });
});

module.exports = app;
