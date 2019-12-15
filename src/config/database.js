module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'you',
  database: 'chavoso',
  define: {
    timestamps: true, // created_at, updated_at
    underscored: true, // Entity: UserGroup -> user_group
    underscoredAll: true, // same as above, but for columns and relationships
  },
};
