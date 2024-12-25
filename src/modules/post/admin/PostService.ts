import PostFactory from "./PostFactory"


export default class PostService {
  private readonly factory

  constructor(){
    this.factory = new PostFactory()
  }
}