<<<<<<< HEAD
import { Empresa } from './Empresa';
=======
import { Empresa } from "./Empresa";
>>>>>>> 7e7654bc45b5f9da94afd71209477d88ee773805

export class Contrato {
    id: number;
    dataInicio: Date;
    dataFim: Date;
    prorrogadoAte: Date;
    valorBolsa: number;
    agenteIntegracao: String;
    supervisorEstagio: String;
<<<<<<< HEAD
=======
    cargoSupervisorEstagio: String;
>>>>>>> 7e7654bc45b5f9da94afd71209477d88ee773805
    emailSupervisor: String;
    observacao: String;
    empresa: Empresa;
}