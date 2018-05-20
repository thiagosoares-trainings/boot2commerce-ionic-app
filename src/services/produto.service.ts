import { ProdutoDTO } from './../models/produto.dto';
import { Observable } from 'rxjs/Rx';
import { API_CONFIG } from './../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ProdutoService {


    constructor(public http: HttpClient) {

    }

    findById(produto_id : string) {
        return this.http.get<ProdutoDTO>(`${API_CONFIG.baseUrl}/produtos/${produto_id}`);
    }
    

    findByCategoria(categoriaId: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/produtos?orderBy=id&categorias=${categoriaId}&linesPerPage=10`);
    }

    /**
     * 
     * @param id 
     */
    getSmallImage(id: string) : Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/prod${id}-small.jpg`;
        return this.http.get(url, {responseType: 'blob'});
    }

    getImageFromBucket(id : string) : Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/prod${id}.jpg`
        return this.http.get(url, {responseType : 'blob'});
    }  
}