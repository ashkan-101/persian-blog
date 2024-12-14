import { Request } from "express"
import IUserPG from "./modules/user/entity/contracts/IUser.PG"

declare global {
  namespace Express {
    interface Request {
      user?: IUserPG
    }
  }
}