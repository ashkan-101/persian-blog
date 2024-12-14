import { Request, Response, NextFunction } from "express"
import Unauthorized from "../exceptions/Unauthorized"
import { verify } from '../services/TokenService'
import UserPGRepository from "../modules/user/repositories/User.PG.Repository"
import IUserPG from "../modules/user/entity/contracts/IUser.PG"

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization
    
    if(!token){
      throw new Unauthorized('Unauthorized')
    }

    const tokenResult = verify(token)

    if(!tokenResult){
      throw new Unauthorized('Unauthorized')
    }

    const user = await findUser(tokenResult.userId)

    if(!user){
      throw new Unauthorized('Unauthorized')
    }

    req.user = user

    next()
  } catch (error) {
    next(error)
  }
}

const findUser = async (userId: string): Promise<IUserPG | null> => {
  const userRepository = new UserPGRepository()
  return await userRepository.findById(userId)
}