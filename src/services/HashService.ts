import { hash, compare } from "bcrypt";

const hashData = async(data: string) => {
  return await hash(data, 10)
}

const compareHash = async(data: string, hashedData: string) => {
  return await compare(data, hashedData)
}

export {
  hashData,
  compareHash
}