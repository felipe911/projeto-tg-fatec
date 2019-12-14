import { Contrato } from "./Contrato";
import { Aluno } from "./Aluno";
import { StatusEstagio } from "./StatusEstagio";

export class Estagio {

    id: number;
    contrato: Contrato;
    aluno: Aluno;
    statusEstagio: StatusEstagio;

}