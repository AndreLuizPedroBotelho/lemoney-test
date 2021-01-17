import Sequelize from 'sequelize'

import Offer from '../../modules/offer/model/Offer'

const models = [Offer]

class Database {
  constructor() {
    this.init()
  }

  connectionOption() {
    const connectionsOptions = {
      postgres: {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        logging: false,

        define: {
          timestamps: true,
          underscored: true,
          underscoredAll: true,
        },
      },
      sqlite: {
        dialect: 'sqlite',
        storage: './database.sqlite',
        logging: false,

      },
    }

    return connectionsOptions[process.env.DB_DIALECT]
  }

  init() {
    this.connection = new Sequelize(this.connectionOption())

    Promise.resolve(new Promise(async (resolve, reject) => {
      models
        .map(model => model.init(this.connection))
        .map(model => model.associate && model.associate(this.connection.models))
      resolve(true)
    }))

    this.connection.sync({
      force: false
    })

  }
}
export default new Database()