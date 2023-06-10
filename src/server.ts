import * as express from "express";
import { router } from "./Routes/routes";

const app = express();



app.use(express.json());
app.use(router);

app.listen(3333, () => console.info('Server running in localhost?3333'));