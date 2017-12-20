const bcryptjs = require('bcryptjs');

const password = bcryptjs.hashSync('fatBoy', 8);

module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Users', [{
      userFirstName: 'tola',
      userLastName: 'liadi',
      userEmail: 'liadi.omotola@gmail.com',
      userPassword: password,
      userPhoneNumber: '08181546011',
      userType: 'admin',
      createdAt: '2016-08-09 04:05:02',
      updatedAt: '2016-08-09 04:05:02',
    }], {}),

  down: queryInterface =>
    queryInterface.bulkDelete('Users', null, {}),
};
