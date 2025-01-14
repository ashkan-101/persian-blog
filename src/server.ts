import App from "./App";
import { config } from "dotenv";
config()

const port = process.env.APP_PORT as unknown as number
const application = new App(port)

application.start()