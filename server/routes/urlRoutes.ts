import * as cors from "cors";
import UrlController from './../controller/urlController';
import corsOptionsDelegate from './../middlewares/corsOptionsDelegate';

export class Routes {
    public urlController: UrlController = new UrlController();

    public routes(app): void {

        // app.route('/urls').post(this.urlController.addUrl);
        app.post('/urls', cors(corsOptionsDelegate), this.urlController.addUrl); 

        // app.route('/urls/:Id').get(this.urlController.getUrlById);
        app.get('/urls/:id', cors(corsOptionsDelegate), this.urlController.getUrlById); 

        // app.route('/urls/:Id').delete(this.urlController.deleteUrl);
        app.delete('/urls/:id', cors(corsOptionsDelegate), this.urlController.deleteUrl); 
    }
}