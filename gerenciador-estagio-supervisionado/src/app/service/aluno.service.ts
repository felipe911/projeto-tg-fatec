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
        return this.http.post<Aluno>(`${this.baseUrl}`, this.formataParaApi(aluno));
    }

    listar(){
        return this.http.get(`${this.baseUrl}`);
    }

    formataParaApi(aluno: Aluno): Aluno{

        aluno.semestre = Number((aluno.semestre).toString().substr(0,1));

        if(aluno.periodo.toString() == 'Manhã'){
            aluno.periodo = 1;
        } else if(aluno.periodo.toString() == 'Tarde'){
            aluno.periodo = 2;
        } else if(aluno.periodo.toString() == 'Noite'){
            aluno.periodo = 3;
        }

        return aluno;
    }

    buscaPorRa(aluno: Aluno): Observable<Aluno> {

        debugger

        let paramsAluno = new HttpParams().set("requestData", encodeURIComponent(JSON.stringify(aluno)));
        return this.http.get<Aluno>(`${this.baseUrl}` + '/busca-por-ra', {params: paramsAluno});
    }
}
