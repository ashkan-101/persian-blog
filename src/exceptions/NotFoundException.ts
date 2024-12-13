import Exception from "./Exceptions";

export default class NotFoundException extends Exception {
  constructor(message: string){
    super(404, message)
  }
}