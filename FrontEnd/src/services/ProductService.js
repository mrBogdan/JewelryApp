import { BaseService } from './BaseService';
import { UserService } from './UserService';

const us = new UserService();

export class ProductService extends BaseService {
    getAllProducts(top = 8, offset = 0) {
        return this.$http.get(`/api/v1/product/all?top=${top}&offset=${offset}`);
    }

    getProductById(id) {
        return this.$http.get(`/api/v1/product/${id}`);
    }

    getDeleteById(id) {
        return this.$http.delete(`/api/v1/product/${id}`, {
            headers: {
                'Authorization': us.getUserToken(),
            }
        });
    }

    getProductsByCategoryId(idCategory) {
        return this.$http.get(`/api/v1/product/by-category/${idCategory}`);
    }

    getProductsByIds(ids) {
        return this.$http.post(`/api/v1/product/by-ids`, {
            ids
        });
    }

    createProduct(product) {
        return this.$http.post(`/api/v1/product/create`, product, {
            headers: {
                'Authorization': us.getUserToken(),
            }
        });
    }
}