import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { AlunosComponent } from "./cadastros/alunos/alunos.component";
import { EmpresasComponent } from './cadastros/empresas/empresas.component';
import { AlunosConsultaComponent } from './consultas/alunos-consulta/alunos-consulta.component';
import { EmpresasConsultaComponent } from './consultas/empresas-consulta/empresas-consulta.component';
import { AssociarContratoComponent } from "./contratos/associar-contrato/associar-contrato.component";
import { ContratosConsultaComponent } from './consultas/contratos-consulta/contratos-consulta.component';
import { RelatoriosConsultaComponent } from './consultas/relatorios-consulta/relatorios-consulta.component';
import { RelatorioParcialComponent } from './estagio/relatorio-parcial/relatorio-parcial.component';
import { TipoAtividadeComponent } from './estagio/tipo-atividade/tipo-atividade.component';
import { RelatorioFinalComponent } from './estagio/relatorio-final/relatorio-final.component';
import { AlunoGerenciamentoComponent } from "./aluno-gerenciamento/aluno-gerenciamento.component";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "./guards/auth-guard";

const rotas: Routes = [

    { path: '' , component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'cadastrar/aluno', component: AlunosComponent, canActivate: [AuthGuard] },
    { path: 'editar/aluno/:id', component: AlunosComponent, canActivate: [AuthGuard] },
    { path: 'cadastrar/empresa', component: EmpresasComponent, canActivate: [AuthGuard] },
    { path: 'editar/empresa/:id', component: EmpresasComponent, canActivate: [AuthGuard] },
    { path: 'consultar/alunos', component: AlunosConsultaComponent, canActivate: [AuthGuard] },
    { path: 'consultar/empresas', component: EmpresasConsultaComponent, canActivate: [AuthGuard] },
    { path: 'consultar/contratos', component: ContratosConsultaComponent, canActivate: [AuthGuard] },
    { path: 'consultar/relatorios', component: RelatoriosConsultaComponent, canActivate: [AuthGuard] },
    { path: 'contrato/associar', component: AssociarContratoComponent, canActivate: [AuthGuard] },
    { path: 'contrato/editar/:id', component: AssociarContratoComponent, canActivate: [AuthGuard] },
    { path: 'estagio/relatorio-parcial', component: RelatorioParcialComponent, canActivate: [AuthGuard] },
    { path: 'estagio/tipo-atividade', component: TipoAtividadeComponent, canActivate: [AuthGuard] },
    { path: 'estagio/relatorio-final', component: RelatorioFinalComponent, canActivate: [AuthGuard] },
    { path: 'aluno/gerenciar-estagios', component: AlunoGerenciamentoComponent, canActivate: [AuthGuard] }

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