import { Injectable } from '@angular/core';
import { Observable, throwError  } from "rxjs";
import { retry, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpEvent } from "@angular/common/http";

import 'rxjs/add/operator/catch';
import { Empresa } from '../model/Empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private http: HttpClient){}

    private baseUrl = '/api/empresa';

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    salvar(empresa: Empresa): Observable<Empresa> {
        return this.http.post<Empresa>(`${this.baseUrl}`, empresa);
    }

    listar(): Promise<any>{
        return this.http.get<Empresa[]>(`${this.baseUrl}`).toPromise();
    }

    buscaPorRazaoSocial(empresa: Empresa): Observable<Empresa>{
        return this.http.post<Empresa>(`${this.baseUrl}` + '/busca-por-razao-social', empresa);
    }
}
