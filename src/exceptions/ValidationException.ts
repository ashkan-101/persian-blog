import Exception from "./Exceptions";

export default class ValidationException extends Exception {
  constructor(message: string){
    super(400, message)
  }
}