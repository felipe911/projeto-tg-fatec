import { RelatorioFinal } from "../model/RelatorioFinal";
import { RelatorioParcial } from "../model/RelatorioParcial";
import { RelatorioAtividade } from "../model/RelatorioAtividade";
import { Estagio } from "../model/Estagio";

export class EntregaRelatorioMediator{

    estagio: Estagio;
    relatorioFinal: RelatorioFinal;
    relatorioParcial: RelatorioParcial[];
    relatorioAtividade: RelatorioAtividade[];

}