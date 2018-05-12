import { API_CONFIG } from './../config/api.config';
import { ClienteDto } from './../models/cliente.dto';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { StorageService } from './storage.service';
import { ImageUtilService } from './image-util.service';

@Injectable()
export class ClienteService {


    constructor(public http: HttpClient, public storage: StorageService, public imageUtilService: ImageUtilService) {}
    
    findById(id: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/clientes/${id}`);
    }
    

    findByEmail(email: string): Observable<ClienteDto> {
        return this.http.get<ClienteDto>(`${API_CONFIG.baseUrl}/clientes/email?email=${email}`);
    }

    getImageFromBucket(id: string): Observable<any> {
        return this.http.get(`${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`, {responseType: 'blob'});
    }

    insert(obj : ClienteDto) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/clientes`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

    uploadPicture(picture) {
        let pictureBlob = this.imageUtilService.dataUriToBlob(picture);
        let formData : FormData = new FormData();
        formData.set('file', pictureBlob, 'file.png');
        return this.http.post(
            `${API_CONFIG.baseUrl}/clientes/picture`, 
            formData,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }
}
