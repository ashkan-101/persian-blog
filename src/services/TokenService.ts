import jwt  from "jsonwebtoken";
import { config } from "dotenv";
config()

const sign = (data: any) => {
  return jwt.sign(data, process.env.APP_SECRETKEY as string)
}

const verify = (token: string): false | jwt.JwtPayload => {
  try {
    return jwt.verify(token, process.env.APP_SECRETKEY as string) as jwt.JwtPayload
  } catch (error) {
    return false
  }
}

export {
  sign,
  verify
}