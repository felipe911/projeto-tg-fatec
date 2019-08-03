import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AlunosComponent } from "./cadastros/alunos/alunos.component";

const rotas: Routes = [

    { path: 'cadastrar/aluno', component: AlunosComponent }

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