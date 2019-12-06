import { Aluno } from "../model/Aluno";
import { RelatorioFinal } from "../model/RelatorioFinal";
import { RelatorioParcial } from "../model/RelatorioParcial";
import { RelatorioAtividade } from "../model/RelatorioAtividade";
import { TipoAtividadeEstagiario } from "../model/TipoAtividadeEstagiario";

export class RelatoriosAlunoMediator {

    aluno: Aluno;
    relatorioFinal: RelatorioFinal;
    relatorioParcial: RelatorioParcial;
    relatorioAtividade: RelatorioAtividade;
    tipoAtividadeEstagiario: TipoAtividadeEstagiario;

}