require('dotenv').config();

module.exports = {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  define: {
    timestamps: true, // created_at, updated_at
    underscored: true, // Entity: UserGroup -> user_group
    underscoredAll: true, // same as above, but for columns and relationships
  },
};
