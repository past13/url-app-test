import * as mongoose from 'mongoose';
import { Request, Response } from 'express';
import { UrlSchema } from './../models/UrlSchema';

import IsValidUrl from './../middlewares/validUrl';
import ShortId from './../middlewares/shortId';

const errorUrl = 'http://localhost/error';
const Url = mongoose.model('UrlShorten', UrlSchema);

export default class UrlController {

    public async addUrl (req: Request, res: Response) {
        const { originalUrl, shortBaseUrl } = req.body;

        if (!IsValidUrl(shortBaseUrl)) {
            return res
                .status(401)
                .json(
                "Invalid Base Url"
            );
        }
        if (!IsValidUrl(originalUrl)) {
            return res
                .status(401)
                .json(
                "Invalid Original Url"
            );
        }

        const urlCode = ShortId.generate();
        const updatedAt = new Date();

        try {
            const item = await Url.findOne({ originalUrl: originalUrl });
            if (item) {
                res.status(200).json(item);
            } else {
                const shortUrl = shortBaseUrl + "/" + urlCode;
                const item = new Url({
                    originalUrl,
                    urlCode,
                    shortUrl,
                    updatedAt
                });

                await item.save();
                res.status(200).json(item);
            }
        } catch(err) {
            res.status(401).json("Invalid User Id");
        }
}

    public async getUrlById (req: Request, res: Response) {
        const urlCode = req.params.Id;
        const item = await Url.findOne({ urlCode: urlCode });
        if (item) {
            return res.redirect(item.originalUrl);
        } else {
            return res.redirect(errorUrl);
        }
    }

    public async deleteUrl (req: Request, res: Response) {
        Url.deleteOne({_id: req.params.Id}, (err) => {
            if (err) {
                res.send(err);
            }
                res.json({
                status: "success",
                message: 'Url deleted'
            });
        });
    }

    public async getUrls(req: Request, res: Response) {
        const item = await Url.find({}, (err, url) => {
            if(err){
                res.send(err);
            }
            return url;
        });

        res.json(item);
    }
}