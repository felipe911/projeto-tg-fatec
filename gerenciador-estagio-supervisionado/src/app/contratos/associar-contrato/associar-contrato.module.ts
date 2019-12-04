import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AssociarAlunoComponent } from "./associar-aluno/associar-aluno.component";
import { AssociarEmpresaComponent } from "./associar-empresa/associar-empresa.component";
import { AssociarContratoEstagioComponent } from './associar-contrato-estagio/associar-contrato-estagio.component';

@NgModule({

    declarations:[
        AssociarAlunoComponent,
        AssociarEmpresaComponent,
        AssociarContratoEstagioComponent
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
