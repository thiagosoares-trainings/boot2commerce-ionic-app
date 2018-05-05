import { API_CONFIG } from './../config/api.config';
import { ClienteDto } from './../models/cliente.dto';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { StorageService } from './storage.service';

@Injectable()
export class ClienteService {


    constructor(public http: HttpClient, public storage: StorageService) {}


    findByEmail(email: string): Observable<ClienteDto> {
        return this.http.get<ClienteDto>(`${API_CONFIG.baseUrl}/clientes/email?email=${email}`);
    }

    getImageFromBucket(id: string): Observable<any> {
        return this.http.get(`${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`, {responseType: 'blob'});
    }
}
