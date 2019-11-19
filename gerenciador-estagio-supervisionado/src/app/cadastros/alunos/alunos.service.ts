import { Aluno } from "./Aluno";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})

export class AlunosService{

    constructor(private http: HttpClient){}

    private baseUrl = 'https://localhost:9400/aluno/';

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    alunos = [];

    salvar(aluno: Aluno): Observable<Aluno> {
        return this.http.post<Aluno>(`${this.baseUrl}`, aluno);
    }

}