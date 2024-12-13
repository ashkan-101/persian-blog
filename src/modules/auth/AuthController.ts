import AuthService from "./AuthService";


export default class AuthController {
  private readonly service: AuthService

  constructor(){
    this.service = new AuthService()
  }
}