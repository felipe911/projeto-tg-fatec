import { Empresa } from "./Empresa";

export class Contrato {
    id: number;
    dataInicio: Date;
    dataFim: Date;
    prorrogadoAte: Date;
    valorBolsa: number;
    agenteIntegracao: String;
    supervisorEstagio: String;
    cargoSupervisorEstagio: String;
    emailSupervisor: String;
    observacao: String;
    empresa: Empresa;
}