import AuthFactory from "./AuthFactory";


export default class AuthService {
  private readonly factory: AuthFactory

  constructor(){
    this.factory = new AuthFactory()
  }
}