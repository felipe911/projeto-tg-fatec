import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AlunosComponent } from "./cadastros/alunos/alunos.component";
import { EmpresasComponent } from './cadastros/empresas/empresas.component';
import { AlunosConsultaComponent } from './consultas/alunos-consulta/alunos-consulta.component';
import { EmpresasConsultaComponent } from './consultas/empresas-consulta/empresas-consulta.component';
import { AssociarContratoComponent } from "./contratos/associar-contrato/associar-contrato.component";

const rotas: Routes = [

    { path: 'cadastrar/aluno', component: AlunosComponent },
    { path: 'cadastrar/empresa', component: EmpresasComponent },
    { path: 'consultar/alunos', component: AlunosConsultaComponent },
    { path: 'consultar/empresas', component: EmpresasConsultaComponent },
    { path: 'contrato/associar', component: AssociarContratoComponent }
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