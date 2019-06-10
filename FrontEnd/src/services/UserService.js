import { BaseService } from './BaseService';
import axios from 'axios';
import { UserService } from '../settings/services';

export class UserService extends BaseService {
    constructor() {
        super();
        this.$http = axios.create({
            baseURL: UserService
        });
    }

    async login(email, password) {

    }

    logout() {
    }

    refreshToken() {
    }

    registration() {
    }
}
