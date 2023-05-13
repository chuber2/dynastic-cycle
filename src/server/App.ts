import * as dotenv from 'dotenv';
import express, {Express, Request, Response} from 'express';

dotenv.config();

const app: Express = express();
const port = process.env.API_PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World! Express and Typescript are working hand in hand!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
