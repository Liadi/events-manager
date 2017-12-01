module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Users', [{
      userFirstName: 'Tola',
      userLastName: 'Liadi',
      userEmail: 'liadiomotola@gmailcom',
      userPassword: 'fatBoy',
      userPhoneNumber: '08181546011',
      userType: 'regular',
      createdAt: '2016-08-09 04:05:02',
      updatedAt: '2016-08-09 04:05:02',
    }], {}),

  down: queryInterface =>
    queryInterface.bulkDelete('Users', null, {}),
};
