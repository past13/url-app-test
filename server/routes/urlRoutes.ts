import UrlController from './../controller/urlController';

export class Routes {
    public urlController: UrlController = new UrlController();

    public routes(app): void {

        app.route('/urls')
        .post(this.urlController.addUrl);

        app.route('/urls')
        .get(this.urlController.getUrls);

        app.route('/urls/:Id')
        .get(this.urlController.getUrlById);

        app.route('/urls/:Id')
        .delete(this.urlController.deleteUrl);
    }
}