'use strict';

module.exports = {
  up: (queryInterface, { INTEGER, STRING, BOOLEAN, DATE }) => {
    return queryInterface.createTable('users', {
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
      email: {
        type: STRING,
        allowNull: false,
        unique: true,
      },
      password_hash: {
        type: STRING,
        allowNull: false,
      },
      provider: {
        type: BOOLEAN,
        defaultValue: false,
        allowNull: false,
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
    return queryInterface.dropTable('users');
  },
};
