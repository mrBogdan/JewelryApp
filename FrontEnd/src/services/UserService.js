import { BaseService } from './BaseService';
import axios from 'axios';
import { UserService as UserServiceUrl } from '../settings/services';

const USER = 'USER';
const AUTH_TOKEN = 'AUTH_TOKEN';
const REFRESH_TOKEN = 'REFRESH_TOKEN';

export class UserService extends BaseService {
    constructor() {
        super();
        this.$http = axios.create({
            baseURL: UserServiceUrl
        });
    }

    login(email, password) {
        return this.$http.post('/api/v1/user/signin', {
                email,
                password
            })
            .then((auth) => {
                this.setUserToken(auth.data.access_token);
                this.setRefreshToken(auth.data.refresh_token);
                console.log('AUTH', auth);

                return auth.data.user;
            });
    }

    getUserWithToken() {
        return this.$http.get('/api/v1/user/get-user', {
            headers: { 'Authorization': `Bearer ${this.getUserToken()}` }
        })
    }

    setUser(user) {
        localStorage.setItem(USER, JSON.stringify(user));
    }

    getUserToken() {
        return localStorage.getItem(AUTH_TOKEN);
    }

    getRefreshToken() {
        return localStorage.getItem(REFRESH_TOKEN);
    }

    setUserToken(token) {
        localStorage.setItem(AUTH_TOKEN, token);
    }

    setRefreshToken(token) {
        localStorage.setItem(REFRESH_TOKEN, token);
    }

    logout() {
        localStorage.setItem(AUTH_TOKEN, '');
        localStorage.setItem(REFRESH_TOKEN, '');
    }

    refreshToken() {
        return this.$http.post('/api/v1/user/refresh');
    }

    registration(userFormData) {
        return this.$http.post('/api/v1/user/signup', userFormData,
            {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
    }
}
