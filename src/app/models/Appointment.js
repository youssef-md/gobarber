import { Model, DATE } from 'sequelize';

class Appointment extends Model {
  static init(sequelize) {
    super.init(
      {
        date: DATE,
        canceled_at: DATE,
      },
      { sequelize }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });

    this.belongsTo(models.User, {
      foreignKey: 'provider_id',
      as: 'provider',
    });
  }
}

export default Appointment;
