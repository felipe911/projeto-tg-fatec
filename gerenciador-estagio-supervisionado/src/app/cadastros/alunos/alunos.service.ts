import { Aluno } from "./Aluno";

export class AlunosService{

    id = 1;

    alunos = [];

    salvar(aluno: Aluno){
        aluno.id = this.id ++;
        this.alunos.push(aluno);
        console.log(JSON.stringify(this.alunos));
    }

}