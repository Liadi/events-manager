const Center = require('./../models').Center;

module.exports = {
  test(req, res) {
    res.status(201).send({
      1: 'a',
    });
  },
};
