import Exception from "./Exceptions";

export default class ServerException extends Exception {
  constructor(message: string){
    super(500, message)
  }
}