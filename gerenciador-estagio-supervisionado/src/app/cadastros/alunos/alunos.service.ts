import { Aluno } from "./Aluno";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})

export class AlunosService{

    constructor(private http: HttpClient){}

    private baseUrl = '/api/aluno';

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    alunos = [];

    salvar(aluno: Aluno): Observable<Aluno> {
        debugger


        return this.http.post<Aluno>(`${this.baseUrl}`, this.formataParaApi(aluno));
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

}