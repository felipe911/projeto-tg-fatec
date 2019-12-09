import { TipoAtividade } from "./TipoAtividade";
import { TipoAtividadeEstagiario } from "./TipoAtividadeEstagiario";

export class RelatorioFinal{
    id: number;
    totalHorasCumpridas: number;
    tipoAtividade: TipoAtividade;
    tipoAtividadeEstagiario: TipoAtividadeEstagiario;
    local: String;
    periodoDe: Date;
    periodoAte: Date;
    areaAtividade: String;
    relatorioEntregue: boolean;
    especificacaoOutros: String;
}