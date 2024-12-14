import Exception from "./Exceptions";

export default class Unauthorized extends Exception {
  constructor(message: string){
    super(401, message)
  }
}