import { BaseService } from './BaseService';

export class SearchService extends BaseService{
    search(searchParam) {
        return this.$http.get(`/api/v1/search?search=${searchParam}`);
    }
}