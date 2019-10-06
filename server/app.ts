import * as express from "express";
import * as cors from "cors";

import { Routes } from "./routes/urlRoutes";
import * as mongoose from "mongoose";

import * as bodyParser from "body-parser";

const connectOptions = {
    keepAlive: true,
    reconnectTries: Number.MAX_VALUE
   };

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
        mongoose.connect(this.mongoUrl, connectOptions, (err, db) => {
        
        if (err) console.log(`Error`, err); 
            console.log(`Connected to MongoDB`);
        });
    }

    private config(): void{
        this.app.use(bodyParser.urlencoded({
            extended: false
         }));

        this.app.use(bodyParser.json());

        // this.app.use(function(req, res, next) {
        //     res.header("Access-Control-Allow-Origin", "*");
        //     res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
        //     res.header(
        //         "Access-Control-Allow-Headers",
        //         "Content-type,Accept,x-access-token,X-Key"
        //     );
        //     if (req.method == "OPTIONS") {
        //         res.status(200).end();
        //     } else {
        //         next();
        //     }
        // });
    }
}

export default new App().app;