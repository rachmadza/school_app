'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('StudentSubjects', [{
      StudentId: 6,
      SubjectId: 1,
      createdAt: new Date(),
      updatedAt: new Date()

    },
    {
      StudentId: 7,
      SubjectId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      StudentId: 8,
      SubjectId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkInsert('StudentSubjects', null, {});
  }
};
