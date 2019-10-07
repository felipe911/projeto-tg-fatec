import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlunosConsultaComponent } from './alunos-consulta/alunos-consulta.component';
import { EmpresasConsultaComponent } from './empresas-consulta/empresas-consulta.component';
import { ContratosConsultaComponent } from './contratos-consulta/contratos-consulta.component';
import { RelatoriosConsultaComponent } from './relatorios-consulta/relatorios-consulta.component';
import { VisualizarEstagiosAlunoComponent } from './alunos-consulta/visualizar-estagios-aluno/visualizar-estagios-aluno.component';
import { VisualizarDadosAlunoComponent } from './alunos-consulta/visualizar-dados-aluno/visualizar-dados-aluno.component';

@NgModule({

    declarations:[
        AlunosConsultaComponent,
        EmpresasConsultaComponent,
        ContratosConsultaComponent,
        RelatoriosConsultaComponent,
        VisualizarDadosAlunoComponent,
        VisualizarEstagiosAlunoComponent
    ],
    exports: [ 
        AlunosConsultaComponent,
        EmpresasConsultaComponent,
        ContratosConsultaComponent,
        RelatoriosConsultaComponent
    ],
    imports: [
        CommonModule
    ]
})

export class ConsultasModule{}