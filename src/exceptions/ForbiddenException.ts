import Exception from "./Exceptions";


export default class ForbiddenException extends Exception {
  constructor(message: string){
    super(403, message)
  }
}