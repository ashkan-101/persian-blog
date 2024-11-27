import { DataSource } from "typeorm";
import { config } from "dotenv";
config()

const dataSource: DataSource = new DataSource({
  type: 'postgres',
  host: process.env.PG_HOST,
  port: process.env.PG_PORT as unknown as number,
  username: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  database: 'persian-blog',
  synchronize: true,
  entities: []
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