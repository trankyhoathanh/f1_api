import express from 'express'
import methodOverride from 'method-override'
import compression from 'compression'
import bodyParser from 'body-parser'

import dotenv from 'dotenv'
dotenv.config()

import { AppDataSource } from './db/data-source'
import homeRouter from './app/home/route'
import raceRouter from './app/race/route'

export class ApplicationExpress {
  public app: express.Application
  public config: {
    port: number
  }

  constructor() {
    this.app = express()
    this.config = {
      port: 3000
    }
  }

  private async InitExpress(): Promise<void> {
    this.app.use(methodOverride())
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(bodyParser.json())
    this.app.use(compression())
  }

  private async InitRoute() {
    this.app.use(homeRouter)
    this.app.use(raceRouter)
  }

  private async InitDb() {
    try {
      await AppDataSource.initialize()
    } catch (error) {
      console.log(error)
    }
  }

  public async ExecuterApp(): Promise<void> {
    await this.InitExpress()
    await this.InitDb()
    await this.InitRoute()

    this.app.listen(this.config.port, () => console.log(`Server listening on port ${this.config.port}`))
  }
}
