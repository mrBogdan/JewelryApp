import { NextFunction, Request, Response } from 'express';
import { SearchService } from '../../../services/search.service';
import { sqlHadler } from '../../../modules/handlers/sqlHandler';

const searchService = new SearchService();

export class SearchController {
    public search(req: Request, res: Response, next: NextFunction) {
        const searchPhrase = sqlHadler(req.query.search);

        searchService.search(searchPhrase)
            .then((searchData: any) => res.send(searchData))
            .catch(next);
    }
}