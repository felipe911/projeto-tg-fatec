import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpEvent } from "@angular/common/http";

import { Observable } from 'rxjs';
import { Estagio } from '../model/Estagio';

@Injectable({
  providedIn: 'root'
})
export class EstagioService {

    constructor(private http: HttpClient) { }

    private baseUrl = '/api/estagio';

    buscaEstagioPorIdAluno(id){
      return this.http.get<Estagio>(`${this.baseUrl}` + '/busca-por-aluno/' + id);
    }
}
