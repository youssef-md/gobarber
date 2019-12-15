import { Model, STRING, BOOLEAN } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: STRING,
        email: STRING,
        password_hash: STRING,
        provider: BOOLEAN,
      },
      { sequelize }
    );
  }
}

export default User;
