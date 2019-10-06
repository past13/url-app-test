import * as express from "express";
import * as cors from "cors";
import * as mongoose from "mongoose";
import { session }  from "cookie-session";
import * as bodyParser from "body-parser";

import connectOptions from './middlewares/connectionSettings';
import { Routes } from "./routes/urlRoutes";

class App {
    public app: express.Application;
    public mongoUrl: string = 'mongodb://localhost/url-shortner';

    public routePrv: Routes = new Routes();

    constructor() {
        this.app = express();
        this.app.use(cors());
        this.config();
        this.routePrv.routes(this.app);
        this.mongoSetup();
    }

    private mongoSetup(): void{
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, connectOptions, (err: any) => {
        
        if (err) console.log(`Error`, err); 
            console.log(`Connected to MongoDB`);
        });
    }

    private config(): void{
        this.app.use(bodyParser.urlencoded({
            extended: false
         }));

        this.app.use(bodyParser.json());

        const timeValue = 30;
        var expiryDate = new Date(Date.now() + timeValue)
        this.app.use(session({
            name: 'session',
            keys: ['key1', 'key2'],
            cookie: {
              secure: true,
              httpOnly: true,
              domain: 'localhost',
              expires: expiryDate
            }
          }))
    }
}

export default new App().app;