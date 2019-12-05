import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpEvent } from "@angular/common/http";
import { AssociarContratoMediator } from '../mediators/AssociarContratoMediator';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContratoService {

  constructor(private http: HttpClient) { }

  private baseUrl = '/api/contrato';

  salvar(associarContratoMediator: AssociarContratoMediator): Observable<AssociarContratoMediator> {
    return this.http.post<AssociarContratoMediator>(`${this.baseUrl}`, associarContratoMediator);
}
}
