import Sequelize, { Model } from 'sequelize'
import { getState } from '../utils/function'

class Offer extends Model {

  static init(sequelize) {
    super.init(
      {
        advertiser_name: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        url: {
          type: Sequelize.STRING,
          allowNull: false
        },
        description: {
          type: Sequelize.STRING(500),
          allowNull: false,
        },
        starts_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        ends_at: Sequelize.DATE,
        premium: Sequelize.BOOLEAN,
        active: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
        },
        state: {
          type: Sequelize.VIRTUAL,
          get() {
            return getState({
              starts_at: this.getDataValue('starts_at'),
              ends_at: this.getDataValue('ends_at'),
              active: this.getDataValue('active')
            })
          }
        },
      },
      {
        sequelize,
      }
    )

    return this
  }
}

export default Offer