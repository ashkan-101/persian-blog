import { Application } from "express";
import RouterEngine from "./RouterEngine";


export default class RouterService {
  private readonly router: RouterEngine
  private readonly app: Application

  constructor(app: Application){
    this.router = new RouterEngine()
    this.app = app

    this.bindRouter()
  }

  private bindRouter(){
    // this.router.addRouter('/api/v1/user', )
  }

  public run(){
    this.router.getRouter().forEach((router, route) => {
      this.app.use(route, router)
    })
  }
}