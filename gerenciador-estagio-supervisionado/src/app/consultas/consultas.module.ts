import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlunosConsultaComponent } from './alunos-consulta/alunos-consulta.component';
import { EmpresasConsultaComponent } from './empresas-consulta/empresas-consulta.component';
import { ContratosConsultaComponent } from './contratos-consulta/contratos-consulta.component';
import { RelatoriosConsultaComponent } from './relatorios-consulta/relatorios-consulta.component';
import { VisualizarEstagiosAlunoComponent } from './alunos-consulta/visualizar-estagios-aluno/visualizar-estagios-aluno.component';
import { VisualizarDadosAlunoComponent } from './alunos-consulta/visualizar-dados-aluno/visualizar-dados-aluno.component';
import { VisualizarDadosEmpresaComponent } from './empresas-consulta/visualizar-dados-empresa/visualizar-dados-empresa.component';
import { VisualizarEstagiariosEmpresaComponent } from './empresas-consulta/visualizar-estagiarios-empresa/visualizar-estagiarios-empresa.component';
import { VisualizarContratoComponent } from './contratos-consulta/visualizar-contrato/visualizar-contrato.component';

@NgModule({

    declarations:[
        AlunosConsultaComponent,
        EmpresasConsultaComponent,
        ContratosConsultaComponent,
        RelatoriosConsultaComponent,
        VisualizarDadosAlunoComponent,
        VisualizarEstagiosAlunoComponent,
        VisualizarDadosEmpresaComponent,
        VisualizarEstagiariosEmpresaComponent,
        VisualizarContratoComponent
    ],
    exports: [ 
        AlunosConsultaComponent,
        EmpresasConsultaComponent,
        ContratosConsultaComponent,
        RelatoriosConsultaComponent
    ],
    imports: [
        CommonModule,
    ]
})

export class ConsultasModule{}