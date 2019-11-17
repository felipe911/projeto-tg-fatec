import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { AlunosComponent } from "./alunos/alunos.component";
import { EmpresasComponent } from './empresas/empresas.component';


@NgModule({

    declarations:[
        AlunosComponent,
        EmpresasComponent,
    ],
    exports: [ 
        AlunosComponent,
        EmpresasComponent,
    ],
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        BsDropdownModule.forRoot(),
    ]
})

export class CadastrosModule{}
