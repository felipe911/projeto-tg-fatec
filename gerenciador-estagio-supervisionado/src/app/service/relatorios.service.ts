import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpEvent } from "@angular/common/http";
import { RelatoriosAlunoMediator } from '../mediators/RelatoriosAlunoMediator';
import { Observable } from 'rxjs';
import { RelatorioParcial } from '../model/RelatorioParcial';

@Injectable({
  providedIn: 'root'
})
export class RelatoriosService {

  constructor(private http: HttpClient) { }

  private baseUrl = '/api/';

  salvarRelatorioParcial(relatoriosAlunoMediator: RelatoriosAlunoMediator): Observable<RelatorioParcial> {
    return this.http.post<RelatorioParcial>(`${this.baseUrl}` + 'relatorio-parcial', relatoriosAlunoMediator);
  }

  salvarRelatorioFinal(relatoriosAlunoMediator: RelatoriosAlunoMediator): Observable<RelatorioParcial> {
    return this.http.post<RelatorioParcial>(`${this.baseUrl}` + 'relatorio-final', relatoriosAlunoMediator);
  }
}
