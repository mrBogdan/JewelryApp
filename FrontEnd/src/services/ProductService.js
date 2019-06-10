import { BaseService } from './BaseService';

export class ProductService extends BaseService {
    getAllProducts(top = 8, offset = 0) {
        return this.$http.get(`/api/v1/product/all?top=${top}&offset=${offset}`);
    }

    getProductById(id) {
        return this.$http.get(`/api/v1/product/${id}`);
    }

    getProductsByCategoryId(idCategory) {
        return this.$http.get(`/api/v1/product/by-category/${idCategory}`);
    }

    getProductsByIds(ids) {
        return this.$http.post(`/api/v1/product/by-ids`, {
            ids
        });
    }
}