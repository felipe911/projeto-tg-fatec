import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { MenuComponent } from './menu/menu.component';
import { AlunosComponent } from "./cadastros/alunos/alunos.component";
import { EmpresasComponent } from './cadastros/empresas/empresas.component';
import { AlunosConsultaComponent } from './consultas/alunos-consulta/alunos-consulta.component';
import { EmpresasConsultaComponent } from './consultas/empresas-consulta/empresas-consulta.component';
import { AssociarContratoComponent } from "./contratos/associar-contrato/associar-contrato.component";
import { AssociarAlunoComponent } from "./contratos/associar-contrato/associar-aluno/associar-aluno.component";
import { AssociarEmpresaComponent } from "./contratos/associar-contrato/associar-empresa/associar-empresa.component";
import { ContratosConsultaComponent } from './consultas/contratos-consulta/contratos-consulta.component';
import { RelatoriosConsultaComponent } from './consultas/relatorios-consulta/relatorios-consulta.component';
import { RelatorioParcialComponent } from './estagio/relatorio-parcial/relatorio-parcial.component';
import { TipoAtividadeComponent } from './estagio/tipo-atividade/tipo-atividade.component';
import { RelatorioFinalComponent } from './estagio/relatorio-final/relatorio-final.component';
import { AlunoGerenciamentoComponent } from "./aluno-gerenciamento/aluno-gerenciamento.component";

const rotas: Routes = [

    { path: '' , component: HomeComponent},
    { path: 'menu', component: MenuComponent },
    { path: 'cadastrar/aluno', component: AlunosComponent },
    { path: 'editar/aluno/:id', component: AlunosComponent },
    { path: 'cadastrar/empresa', component: EmpresasComponent },
    { path: 'editar/empresa/:id', component: EmpresasComponent },
    { path: 'consultar/alunos', component: AlunosConsultaComponent },
    { path: 'consultar/empresas', component: EmpresasConsultaComponent },
    { path: 'consultar/contratos', component: ContratosConsultaComponent },
    { path: 'consultar/relatorios', component: RelatoriosConsultaComponent },
    { path: 'contrato/associar', component: AssociarContratoComponent },
    { path: 'contrato/associar/aluno', component: AssociarAlunoComponent },
    { path: 'contrato/associar/empresa', component: AssociarEmpresaComponent },
    { path: 'estagio/relatorio-parcial', component: RelatorioParcialComponent },
    { path: 'estagio/tipo-atividade', component: TipoAtividadeComponent },
    { path: 'estagio/relatorio-final', component: RelatorioFinalComponent },
    { path: 'aluno/gerenciar-estagios', component: AlunoGerenciamentoComponent }

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