import { StorageService } from './storage.service';
import { LocalUser } from './../models/local_user';
import { API_CONFIG } from './../config/api.config';
import { Injectable } from '@angular/core';
import { CredenciasDto } from './../models/credenciais.dto';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {

    constructor(public http: HttpClient, public storage: StorageService) { }

    authenticate(creds: CredenciasDto) {
        return this.http.post(`${API_CONFIG.baseUrl}/login`, creds, {observe: 'response', responseType: 'text'})
    }

    succesfulLogin(authValue: string) {

        let tk = authValue.substring(7);

        let user: LocalUser = {
            token: tk
        }

        this.storage.setLocalUser(user);
    }

    logout() {
        this.storage.setLocalUser(null);
    }
}