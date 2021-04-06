import Sequelize, { Model } from 'sequelize';

class Appointment extends Model {
	static init(sequelize) {
		super.init(
			{
				date: Sequelize.DATE,
				canceled_at: Sequelize.DATE,
				user_id: Sequelize.NUMBER,
				provider_id: Sequelize.NUMBER,
			},
			{ sequelize }
		);
	}

	static associate(models) {
		this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
		this.belongsTo(models.User, { foreignKey: 'provider_id', as: 'provider' });
	}
}

export default Appointment;
