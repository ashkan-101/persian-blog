import cors from 'cors'
import { join } from "path";
import bodyParser from "body-parser";
import { uploadFile } from "./multer/multer";
import { Application, static as expressStatic } from "express";

export default class Boot {
  private readonly app: Application

  constructor(app: Application){
    this.app = app
  }

  public init(){
    this.app.use(cors())
    uploadFile(this.app)
    this.app.use(bodyParser.json())
    this.app.use('/pub', expressStatic(join(process.cwd(), 'public')))
  }
}