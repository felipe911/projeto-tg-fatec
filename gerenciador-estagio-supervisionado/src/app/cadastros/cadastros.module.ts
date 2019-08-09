import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AlunosComponent } from "./alunos/alunos.component";
import { EmpresasComponent } from './empresas/empresas.component';
import { RelatoriosComponent } from './relatorios/relatorios.component';

@NgModule({

    declarations:[
        AlunosComponent,
        EmpresasComponent,
        RelatoriosComponent,
    ],
    exports: [ 
        AlunosComponent,
        EmpresasComponent,
        RelatoriosComponent
    ],
    imports: [
        CommonModule
    ]
})

export class CadastrosModule{}
