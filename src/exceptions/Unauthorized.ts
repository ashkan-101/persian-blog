import Exception from "./Exceptions";

export default class Unathorized extends Exception {
  constructor(message: string){
    super(401, message)
  }
}