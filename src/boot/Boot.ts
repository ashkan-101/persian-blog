import bodyParser from "body-parser";
import { Application } from "express";
import cors from 'cors'

export default class Boot {
  private readonly app: Application

  constructor(app: Application){
    this.app = app
  }

  public init(){
    this.app.use(cors())
    this.app.use(bodyParser.json())
  }
}