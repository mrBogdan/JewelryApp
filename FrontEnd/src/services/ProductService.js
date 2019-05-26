import { BaseService } from './BaseService';

export class ProductService extends BaseService {
    getAllProducts() {
        return this.$http.get('/api/v1/product/all');
    }
}