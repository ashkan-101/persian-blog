import { Application, NextFunction, Request, Response } from "express";
import Exception from "../../exceptions/Exceptions";


export default function ExceptionHandler(app: Application) {
  app.use((error: Exception, req: Request, res: Response, next: NextFunction) => {
    let status
    if(!error.status){
      status = 500
    }else {
      status = error.status
    }
    res.status(error.status).send({
      status: status,
      message: error.message,
      code: error.name
    })
  })
}