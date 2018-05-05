import { LocalUser } from './../models/local_user';
import { API_CONFIG } from './../config/api.config';
import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

    getLocaUser(): LocalUser {

        let user = localStorage.getItem(API_CONFIG.localUser);

        if(user == null) {
            return null;
        }

        return JSON.parse(user);
    }

    setLocalUser(user: LocalUser) {

        if(user == null) {
            localStorage.removeItem(API_CONFIG.localUser);
        }

        localStorage.setItem(API_CONFIG.localUser, JSON.stringify(user));

    }
}