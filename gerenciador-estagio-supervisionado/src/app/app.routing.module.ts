import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthGuard } from "./guards/auth-guard";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { AlunosComponent } from "./cadastros/alunos/alunos.component";
import { EmpresasComponent } from './cadastros/empresas/empresas.component';
import { AssociarContratoComponent } from "./contratos/associar-contrato/associar-contrato.component";
import { RelatoriosConsultaComponent } from './consultas/relatorios-consulta/relatorios-consulta.component';
import { RelatorioParcialComponent } from './estagio/relatorio-parcial/relatorio-parcial.component';
import { TipoAtividadeComponent } from './estagio/tipo-atividade/tipo-atividade.component';
import { RelatorioFinalComponent } from './estagio/relatorio-final/relatorio-final.component';
import { AlunoGerenciamentoComponent } from "./aluno-gerenciamento/aluno-gerenciamento.component";
import { DashboardComponent } from "./admin-gerenciamento/dashboard/dashboard.component";
import { EntregaRelatorioComponent } from './admin-gerenciamento/entrega-relatorio/entrega-relatorio.component';
import { EmpresaPesquisaDatatableComponent } from "./consultas/empresas-consulta/empresa-pesquisa-datatable/empresa-pesquisa-datatable.component";
import { AlunoPesquisaDatatableComponent } from "./consultas/alunos-consulta/aluno-pesquisa-datatable/aluno-pesquisa-datatable.component";
import { ContratoPesquisaDatatableComponent } from "./consultas/contratos-consulta/contrato-pesquisa-datatable/contrato-pesquisa-datatable.component";

const rotas: Routes = [

    { path: '' , component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'cadastrar/aluno', component: AlunosComponent, canActivate: [AuthGuard] },
    { path: 'editar/aluno/:id', component: AlunosComponent, canActivate: [AuthGuard] },
    { path: 'cadastrar/empresa', component: EmpresasComponent, canActivate: [AuthGuard] },
    { path: 'editar/empresa/:id', component: EmpresasComponent, canActivate: [AuthGuard] },
    { path: 'consultar/alunos', component: AlunoPesquisaDatatableComponent, canActivate: [AuthGuard] },
    { path: 'consultar/empresas', component: EmpresaPesquisaDatatableComponent, canActivate: [AuthGuard] },
    { path: 'consultar/contratos', component: ContratoPesquisaDatatableComponent, canActivate: [AuthGuard] },
    { path: 'consultar/relatorios', component: RelatoriosConsultaComponent, canActivate: [AuthGuard] },
    { path: 'associar/contrato', component: AssociarContratoComponent, canActivate: [AuthGuard] },
    { path: 'contrato/editar/:id', component: AssociarContratoComponent, canActivate: [AuthGuard] },
    { path: 'aluno/relatorio-parcial', component: RelatorioParcialComponent, canActivate: [AuthGuard] },
    { path: 'aluno/relatorio-parcial/:id', component: RelatorioParcialComponent, canActivate: [AuthGuard] },
    { path: 'aluno/validar-horas-estagio', component: TipoAtividadeComponent, canActivate: [AuthGuard] },
    { path: 'aluno/relatorio-final', component: RelatorioFinalComponent, canActivate: [AuthGuard] },
    { path: 'aluno/visualizar-estagio', component: AlunoGerenciamentoComponent, canActivate: [AuthGuard] },
    { path: 'gerenciar-estagios/estatisticas', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'gerenciar-estagios/entrega-relatorio', component: EntregaRelatorioComponent, canActivate: [AuthGuard] }

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