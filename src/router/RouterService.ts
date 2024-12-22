import { Application } from "express";
import RouterEngine from "./RouterEngine";
//client
import authRouter from "../modules/auth/AuthRouter";
import categoryClientRouter from "../modules/category/client/CategoryRouter";
import subcategoryClientRouter from "../modules/subcategory/client/SubcategoryRouter";
import userClientRouter from "../modules/user/client/UserRouter";
//admin
import categoryAdminRouter from "../modules/category/admin/CategoryRouter";
import subcategoryAdminRouter from "../modules/subcategory/admin/SubcategoryRouter";


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
    this.router.addRouter('/category', categoryClientRouter)
    this.router.addRouter('/subcategory', subcategoryClientRouter)
    this.router.addRouter('/user', userClientRouter)
    //admin
    this.router.addRouter('/admin-category', categoryAdminRouter)
    this.router.addRouter('/admin-subcategory', subcategoryAdminRouter)
  }

  public run(){
    this.router.getRouter().forEach((router, route) => {
      this.app.use(route, router)
    })
  }
}