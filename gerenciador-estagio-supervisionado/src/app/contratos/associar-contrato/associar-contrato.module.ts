import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AssociarAlunoComponent } from "./associar-aluno/associar-aluno.component";
import { AssociarEmpresaComponent } from "./associar-empresa/associar-empresa.component";

@NgModule({

    declarations:[
        AssociarAlunoComponent,
        AssociarEmpresaComponent
    ],
    exports: [ 
        AssociarAlunoComponent,
        AssociarEmpresaComponent
    ],
    imports: [
        CommonModule
    ]
})

export class AssociarContratoModule{}
