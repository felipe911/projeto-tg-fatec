import { TipoAtividade } from "./TipoAtividade";

export class RelatorioFinal{
    id: number;
    totalHorasCumpridas: number;
    tipoAtividade: TipoAtividade;
    local: String;
    periodoDe: Date;
    periodoAte: Date;
    areaAtividade: String;
    relatorioEntregue: boolean;
}