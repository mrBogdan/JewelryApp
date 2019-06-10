import { Router } from 'express'
import { SearchController } from '../controllers';

const searchController: SearchController = new SearchController();

const searchRouter: Router = Router();

searchRouter
    .get('/', searchController.search.bind(searchController));

export default searchRouter;
