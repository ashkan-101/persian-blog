import express from 'express'
import { Application } from 'express'
import RouterService from './router/RouterService'


export default class App {
  private readonly app: Application
  private readonly port: number
  private readonly router: RouterService

  constructor(port: number){
    this.app = express()
    this.port = port
    this.router = new RouterService(this.app)
  }

  public start(){
    this.router.run()
    this.app.listen(this.port, () => {
      console.log('Application is running ...');
    })
  }
}