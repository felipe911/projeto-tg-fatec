import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpEvent } from "@angular/common/http";
import { AssociarContratoMediator } from '../mediators/AssociarContratoMediator';
import { Observable } from 'rxjs';
import { Aluno } from '../model/Aluno';
import { Contrato } from '../model/Contrato';

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
}
