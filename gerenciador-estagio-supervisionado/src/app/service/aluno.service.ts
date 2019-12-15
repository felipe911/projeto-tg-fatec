import { Injectable } from '@angular/core';
import { Observable, throwError  } from "rxjs";
import { retry, catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpEvent, HttpParams } from "@angular/common/http";
import 'rxjs/add/operator/catch';
import { Aluno } from '../model/Aluno';
import { AlunoEstagioMediator } from '../mediators/AlunoEstagiosMediator';

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

    salvar(aluno: Aluno): Observable<Aluno> {
        return this.http.post<Aluno>(`${this.baseUrl}`, aluno);
    }

    atualizar(aluno: Aluno): Observable<Aluno> {
        return this.http.put<Aluno>(`${this.baseUrl}` + '/' + aluno.id, aluno);
    }

    listar(): Observable<Aluno[]>{
        return this.http.get<Aluno[]>(`${this.baseUrl}`);
    }

    buscaPorRa(aluno: Aluno): Observable<Aluno>{
        return this.http.post<Aluno>(`${this.baseUrl}` + '/busca-por-ra', aluno);
    }

    buscaPorId(): Observable<Aluno>{
        return this.http.get<Aluno>(`${this.baseUrl}` + '/1');
    }

    buscaPorIdEditarAluno(id): Observable<Aluno>{
        return this.http.get<Aluno>(`${this.baseUrl}` + '/' + id);
    }

    deletar(id){
        return this.http.delete(`${this.baseUrl}` + '/' + id)
    }

    buscarDadosAlunoEstagio(id): Observable<AlunoEstagioMediator>{
        return this.http.get<AlunoEstagioMediator>(`${this.baseUrl}` + '/busca-estagios-do-aluno/' + id);
    }
}
