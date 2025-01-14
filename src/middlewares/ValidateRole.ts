import ForbiddenException from "../exceptions/ForbiddenException"
import { Request, Response, NextFunction } from "express"

export const validateRole = (roles: ('user' | 'admin' | 'superadmin')[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userRole = req.user!.role
      const validateRole = roles.includes(userRole)

      if(!validateRole){
        throw new ForbiddenException('You do not have access to this endpoint')
      }

      next()
    } catch (error) {
      next(error)
    }
  }
}