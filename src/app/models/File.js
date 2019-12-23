import { Model, STRING, VIRTUAL } from 'sequelize';

class File extends Model {
  static init(sequelize) {
    super.init(
      {
        name: STRING,
        path: STRING,
        url: {
          type: VIRTUAL,
          get() {
            return `http://localhost:3333/files/${this.path}`;
          },
        },
      },
      { sequelize }
    );

    return this;
  }
}

export default File;
