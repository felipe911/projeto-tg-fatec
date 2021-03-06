import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpEvent } from "@angular/common/http";
import { Observable } from 'rxjs';

import { EntregaRelatorioMediator } from '../mediators/EntregaRelatorioMediator';
import { RelatorioFinal } from '../model/RelatorioFinal';

@Injectable({
  providedIn: 'root'
})
export class EntregaRelatorioService {

  constructor(private http: HttpClient) { }

  private baseUrl = '/api/entrega-relatorio';


    listar(): Observable<EntregaRelatorioMediator[]>{
        return this.http.get<EntregaRelatorioMediator[]>(`${this.baseUrl}`);
    }

    listarEntregaRelatorioPorIdAluno(id): Observable<EntregaRelatorioMediator>{
      return this.http.get<EntregaRelatorioMediator>(`${this.baseUrl}` + '/buscar-por-aluno/' + id);
    }
}
