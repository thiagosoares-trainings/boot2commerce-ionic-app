import { STORAGE_KEYS } from './../config/storage_keys.config';
import { Cart } from './../models/cart';
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

    getCart() : Cart {
        let str = localStorage.getItem(STORAGE_KEYS.cart);
        if (str != null) {
            return JSON.parse(str);
        }
        else {
            return null;
        }
    }
    
    setCart(obj : Cart) {
        if (obj != null) {
            localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(obj));
        } 
        else {
            localStorage.removeItem(STORAGE_KEYS.cart);
        }
    }
}