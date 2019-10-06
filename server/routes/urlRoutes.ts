import * as cors from "cors";
import UrlController from './../controller/urlController';
import corsOptionsDelegate from './../middlewares/corsOptionsDelegate';

export class Routes {
    public urlController: UrlController = new UrlController();

    public routes(app): void {

        app.post('/urls', cors(corsOptionsDelegate), this.urlController.addUrl); 

        app.get('/urls/:id', cors(corsOptionsDelegate), this.urlController.getUrlById); 

        app.delete('/urls/:id', cors(corsOptionsDelegate), this.urlController.deleteUrl); 
    }
}