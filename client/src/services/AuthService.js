import $api from '../http';
import { AxiosResponse } from 'axios';

export default class AuthService {
    static async login(email, password) {
        return $api.post('/auth/login', { email, password });
    }

    static async registration(data) {
        return $api.post('/auth/registration', data);
    }
    static async update(data) {
        return $api.put('/auth/update', data);
    }
    static async logout() {
        return $api.post('/auth/logout');
    }
}
