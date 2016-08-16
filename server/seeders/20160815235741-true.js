module.exports = {
  up: function (queryInterface) {
    return queryInterface.bulkInsert('users', [
      {
        email: 'john@gmail.com',
        password: 'secret',
        username: 'John Rogers',
        created_at: new Date(),
        updated_at: new Date()
      }, {
        email: 'rachel@gmail.com',
        password: 'secret1',
        username: 'Rachel Waters',
        created_at: new Date(),
        updated_at: new Date()
      }, {
        email: 'david@gmail.com',
        password: 'secret2',
        username: 'David Smith',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  down: function (queryInterface) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
