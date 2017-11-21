const centersController = require('../controllers').centers;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to EM API!',
  }));

  app.post('/api/center', centersController.test);
};
