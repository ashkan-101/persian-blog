import { Application } from "express";
import RouterEngine from "./RouterEngine";
import authRouter from "../modules/auth/AuthRouter";


export default class RouterService {
  private readonly router: RouterEngine
  private readonly app: Application

  constructor(app: Application){
    this.router = new RouterEngine()
    this.app = app

    this.bindRouter()
  }

  private bindRouter(){
    this.router.addRouter('/auth', authRouter)
  }

  public run(){
    this.router.getRouter().forEach((router, route) => {
      this.app.use(route, router)
    })
  }
}