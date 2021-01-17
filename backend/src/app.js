import express from "express"
import cors from "cors"
import helmet from "helmet"

import './shared/config/database'

import routes from "./shared/config/routes"

class App {
  constructor() {
    this.server = express()

    this.middlewares()
    this.routes()
  }

  routes() {
    this.server.use(routes)
  }

  middlewares() {
    this.server.use(express.json())
    this.server.use(helmet())

    this.server.use(cors({}))
  }
}

export default new App().server
