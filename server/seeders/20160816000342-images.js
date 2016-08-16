module.exports = {
  up: function (queryInterface) {
    return queryInterface.bulkInsert('images', [
      {
        user_id: 1,
        url: 'http://1.bp.blogspot.com/-KhiJ6WYQn8Q/T7ZXxb_KHxI/AAAAAAAABvM/_l134PCuEcA/s1600/dog+photos+3.jpg',
        comment: 'This dog sure looks proud of himself!',
        created_at: new Date(),
        updated_at: new Date()
      }, {
        user_id: 2,
        url: 'http://3.bp.blogspot.com/-aViuCJ43CWw/TV-O7ORb8TI/AAAAAAAAA2M/qZbMsZc2kQ8/s1600/cowd.jpg',
        comment: 'Nice cow!',
        created_at: new Date(),
        updated_at: new Date()
      }, {
        user_id: 3,
        url: 'http://3.bp.blogspot.com/-WHW5J1uTTCY/UERgSSUImII/AAAAAAAAAMk/JrIBdXHajj0/s1600/Cat+Pictures+8.jpg',
        comment: 'This cat is scaring me',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  down: function (queryInterface) {
    return queryInterface.bulkDelete('images', null, {});
  }
};
