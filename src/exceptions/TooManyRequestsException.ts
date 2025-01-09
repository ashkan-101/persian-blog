import Exception from "./Exceptions";

export default class TooManyRequestsException extends Exception{
  constructor(message: string){
    super(429, message)
  }
}