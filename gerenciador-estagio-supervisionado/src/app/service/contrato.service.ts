import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpEvent } from "@angular/common/http";
import { AssociarContratoMediator } from '../mediators/AssociarContratoMediator';
import { Observable } from 'rxjs';
import { Aluno } from '../model/Aluno';
import { Contrato } from '../model/Contrato';
import { ContratoConsultaMediator } from '../mediators/ContratoConsultaMediator';
import { Estagio } from '../model/Estagio';

@Injectable({
  providedIn: 'root'
})
export class ContratoService {

    constructor(private http: HttpClient) { }

    private baseUrl = '/api/contrato';

    salvar(associarContratoMediator: AssociarContratoMediator): Observable<AssociarContratoMediator> {
      return this.http.post<AssociarContratoMediator>(`${this.baseUrl}`, associarContratoMediator);
    }

    buscaPorAluno(aluno: Aluno): Observable<Contrato>{
      return this.http.post<Contrato>(`${this.baseUrl}` + '/busca-por-aluno', aluno);
    }

    listar(): Observable<ContratoConsultaMediator[]>{
      return this.http.get<ContratoConsultaMediator[]>(`${this.baseUrl}` + '/contratos-consulta');
    }

    deletar(id){
      return this.http.delete(`${this.baseUrl}` + '/' + id)
    }

    buscaPorIdEditarContrato(id){
      return this.http.get<Estagio>('/api/estagio/' + id);
  }
}
