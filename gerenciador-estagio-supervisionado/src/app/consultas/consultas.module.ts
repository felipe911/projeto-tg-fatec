import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlunosConsultaComponent } from './alunos-consulta/alunos-consulta.component';
import { EmpresasConsultaComponent } from './empresas-consulta/empresas-consulta.component';
import { ContratosConsultaComponent } from './contratos-consulta/contratos-consulta.component';

@NgModule({

    declarations:[
        AlunosConsultaComponent,
        EmpresasConsultaComponent,
        ContratosConsultaComponent
    ],
    exports: [ 
        AlunosConsultaComponent,
        EmpresasConsultaComponent
    ],
    imports: [
        CommonModule
    ]
})

export class ConsultasModule{}