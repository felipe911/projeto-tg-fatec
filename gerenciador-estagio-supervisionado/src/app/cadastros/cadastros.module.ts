import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AlunosComponent } from "./alunos/alunos.component";
import { EmpresasComponent } from './empresas/empresas.component';

@NgModule({

    declarations:[
        AlunosComponent,
        EmpresasComponent,
    ],
    exports: [ 
        AlunosComponent,
        EmpresasComponent
    ],
    imports: [
        CommonModule
    ]
})

export class CadastrosModule{}
