import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlunosConsultaComponent } from './alunos-consulta/alunos-consulta.component';
import { EmpresasConsultaComponent } from './empresas-consulta/empresas-consulta.component';

@NgModule({

    declarations:[
        AlunosConsultaComponent,
        EmpresasConsultaComponent
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