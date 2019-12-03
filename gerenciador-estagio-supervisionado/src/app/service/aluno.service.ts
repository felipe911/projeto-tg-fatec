import { Injectable } from '@angular/core';
import { Observable, throwError  } from "rxjs";
import { retry, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpEvent, HttpParams } from "@angular/common/http";
import { Aluno } from '../cadastros/alunos/Aluno';
import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  constructor(private http: HttpClient){}

    private baseUrl = '/api/aluno';

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    alunos = [];

    salvar(aluno: Aluno): Observable<Aluno> {
        return this.http.post<Aluno>(`${this.baseUrl}`, aluno);
    }

    listar(){
        return this.http.get(`${this.baseUrl}`);
    }

    buscaPorRa(aluno: Aluno): Observable<Aluno>{
        return this.http.post<Aluno>(`${this.baseUrl}` + '/busca-por-ra', aluno);
    }
}