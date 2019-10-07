import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlunosConsultaComponent } from './alunos-consulta/alunos-consulta.component';
import { EmpresasConsultaComponent } from './empresas-consulta/empresas-consulta.component';
import { ContratosConsultaComponent } from './contratos-consulta/contratos-consulta.component';
import { RelatoriosConsultaComponent } from './relatorios-consulta/relatorios-consulta.component';
import { VisualizarComponent } from './alunos-consulta/visualizar/visualizar.component';

@NgModule({

    declarations:[
        AlunosConsultaComponent,
        EmpresasConsultaComponent,
        ContratosConsultaComponent,
        RelatoriosConsultaComponent,
        VisualizarComponent
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