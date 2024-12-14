import { DataSource } from "typeorm";
import CategoryPG from "../../modules/category/entity/Category.PG";
import SubcategoryPG from "../../modules/category/entity/Subcategory.PG";
import CommentPG from "../../modules/comment/entity/Comment.PG";
import PostPG from "../../modules/post/entity/Post.PG";
import RegisterCode from "../../modules/registerCode/entity/RegisterCode";
import UserPG from "../../modules/user/entity/User.PG";
import { config } from "dotenv";
config()

const dataSource: DataSource = new DataSource({
  type: 'postgres',
  host: process.env.PG_HOST,
  port: process.env.PG_PORT as unknown as number,
  username: process.env.PG_USERNAME as string,
  password: process.env.PG_PASSWORD as string,
  database: 'persian-blog',
  synchronize: true,
  entities: [CategoryPG, SubcategoryPG, CommentPG, PostPG, RegisterCode, UserPG]
})

const postgresConnection = async () => {
  try {
    await dataSource.initialize()
    console.log('success connect to PG ...');
  } catch (error: any) {
    console.log(`connection to PG failed! : ${error.message}`);
  }
}

export default postgresConnection