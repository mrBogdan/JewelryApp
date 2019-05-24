import { BaseService } from './BaseService'

export class CategoryService extends BaseService {
     getCategories() {
        return this.$http.get('/api/v1/categories');
    }
}