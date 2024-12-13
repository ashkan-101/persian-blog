import express from 'express'
import { Application } from 'express'
import RouterService from './router/RouterService'
import postgresConnection from './Infrastructures/connections/postgreSQL'
import Boot from './boot/Boot'


export default class App {
  private readonly app: Application
  private readonly port: number
  private readonly router: RouterService
  private readonly boot: Boot

  constructor(port: number){
    this.app = express()
    this.port = port
    this.router = new RouterService(this.app)
    this.boot = new Boot(this.app)
  }

  public start(){
    this.boot.init()
    this.router.run()
    this.app.listen(this.port, () => {
      console.log('Application is running ...');
      postgresConnection()
    })
  }
}