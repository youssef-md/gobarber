import { Model, STRING, BOOLEAN, VIRTUAL } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: STRING,
        email: STRING,
        password: VIRTUAL,
        password_hash: STRING,
        provider: BOOLEAN,
      },
      { sequelize }
    );

    this.addHook('beforeSave', async user => {
      if (user.password)
        user.password_hash = await bcrypt.hash(user.password, 8);
    });

    return this;
  }
}

export default User;
