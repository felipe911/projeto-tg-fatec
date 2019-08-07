import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AlunosComponent } from "./cadastros/alunos/alunos.component";
import { EmpresasComponent } from './cadastros/empresas/empresas.component';

const rotas: Routes = [

    { path: 'cadastrar/aluno', component: AlunosComponent },
    { path: 'cadastrar/empresa', component: EmpresasComponent }
]

@NgModule({

    imports: [ 
        RouterModule.forRoot(rotas) 
    ],
    exports: [ 
        RouterModule 
    ]

})

export class AppRoutingModule{ }