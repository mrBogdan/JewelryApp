import { NextFunction, Request, Response } from 'express';
import db from '../../../modules/db';
import * as sql from 'mssql';
import { HttpError } from '../../../modules/errors/http.error';
import { SearchService } from '../../../services/search.service';

const searchService = new SearchService();

export class SearchController {
    public search(req: Request, res: Response, next: NextFunction) {
        const searchPhrase = req.query.search;

        searchService.search(searchPhrase)
            .then((searchData: any) => res.send(searchData))
            .catch(next);
    }
}