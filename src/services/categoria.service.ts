import { API_CONFIG } from './../config/api.config';
import { CategoriDto } from './../models/categoria.dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Rx';

@Injectable()
export class CategoriaService {

    constructor(public http: HttpClient) { }

    findAll(): Observable<CategoriDto[]> {
        return this.http.get<CategoriDto[]>(`${API_CONFIG.baseUrl}/categorias`);
    }
}