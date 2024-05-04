require("dotenv").config();

import express from "express";
import initWebRoutes from "./routes/web";
import initApiRoutes from "./routes/api";
import configViewEngine from "./config/viewEngine";
import connectDb from './config/connectDB'
import configCors from './config/configCors'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 8080;

configCors(app);

configViewEngine(app);

//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

connectDb();

initWebRoutes(app);
initApiRoutes(app);

app.use((req, res) => {
    return res.send('404 Not Found !');
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});