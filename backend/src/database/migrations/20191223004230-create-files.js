'use strict';

module.exports = {
  up: (queryInterface, { INTEGER, STRING, DATE }) => {
    return queryInterface.createTable('files', {
      id: {
        type: INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: STRING,
        allowNull: false,
      },
      path: {
        type: STRING,
        allowNull: false,
        unique: true,
      },
      created_at: {
        type: DATE,
        allowNull: false,
      },
      updated_at: {
        type: DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('files');
  },
};
