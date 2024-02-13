import express from 'express';
import config from './config/default';
import connect from "./utills/connect";
import routes from './routes';

const  app= express();
const port = config.port;

app.use(express.json());

app.listen(port, async () => {
    console.info(`Server is running on port ${port}`);
    await connect();
    routes(app);
});