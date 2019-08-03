import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AlunosComponent } from "./alunos/alunos.component";

@NgModule({

    declarations:[
        AlunosComponent
    ],
    exports: [ 
        AlunosComponent
    ],
    imports: [
        CommonModule
    ]
})

export class CadastrosModule{}
