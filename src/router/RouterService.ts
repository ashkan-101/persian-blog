import { Application } from "express";
import RouterEngine from "./RouterEngine";
//client
import authRouter from "../modules/auth/AuthRouter";
//admin
import categoryAdminRouter from "../modules/category/admin/CategoryRouter";


export default class RouterService {
  private readonly router: RouterEngine
  private readonly app: Application

  constructor(app: Application){
    this.router = new RouterEngine()
    this.app = app

    this.bindRouter()
  }

  private bindRouter(){
    //client
    this.router.addRouter('/auth', authRouter)
    //admin
    this.router.addRouter('/admin-category', categoryAdminRouter)
  }

  public run(){
    this.router.getRouter().forEach((router, route) => {
      this.app.use(route, router)
    })
  }
}