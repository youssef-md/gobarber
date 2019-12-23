import { Model, STRING } from 'sequelize';

class File extends Model {
  static init(sequelize) {
    super.init(
      {
        name: STRING,
        path: STRING,
      },
      { sequelize }
    );

    return this;
  }
}

export default File;
