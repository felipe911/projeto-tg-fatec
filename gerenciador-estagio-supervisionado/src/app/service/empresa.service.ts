import { Injectable } from '@angular/core';
import { Observable, throwError  } from "rxjs";
import { retry, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpEvent } from "@angular/common/http";
import 'rxjs/add/operator/catch';
import { Empresa } from '../cadastros/empresas/Empresa';

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

    empresas = [];

    salvar(empresa: Empresa): Observable<Empresa> {
        return this.http.post<Empresa>(`${this.baseUrl}`, empresa);
    }

    listar(){
        return this.http.get(`${this.baseUrl}`);
    }
}
