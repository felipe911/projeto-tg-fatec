import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';

import { MenuComponent } from './menu/menu.component';
import { AlunosComponent } from './cadastros/alunos/alunos.component';
import { EmpresasComponent } from './cadastros/empresas/empresas.component';
import { RelatoriosComponent } from './cadastros/relatorios/relatorios.component';
import { AlunosConsultaComponent } from './consultas/alunos-consulta/alunos-consulta.component';
import { EmpresasConsultaComponent } from './consultas/empresas-consulta/empresas-consulta.component';
import { ContratosConsultaComponent } from './consultas/contratos-consulta/contratos-consulta.component';
import { RelatoriosConsultaComponent } from './consultas/relatorios-consulta/relatorios-consulta.component';
import { AssociarContratoComponent } from './contratos/associar-contrato/associar-contrato.component';
import { AssociarAlunoComponent } from './contratos/associar-contrato/associar-aluno/associar-aluno.component';
import { AssociarEmpresaComponent } from './contratos/associar-contrato/associar-empresa/associar-empresa.component';
import { RelatorioPesquisaAlunoComponent } from './cadastros/relatorios/relatorio-pesquisa-aluno/relatorio-pesquisa-aluno.component';
import { RelatorioAdicionarComponent } from './cadastros/relatorios/relatorio-adicionar/relatorio-adicionar.component';
import { RelatorioExibicaoComponent } from './cadastros/relatorios/relatorio-exibicao/relatorio-exibicao.component';
import { TipoAtividadeComponent } from './estagio/tipo-atividade/tipo-atividade.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    AlunosComponent,
    EmpresasComponent,
    RelatoriosComponent,
    RelatorioPesquisaAlunoComponent,
    RelatorioAdicionarComponent,
    RelatorioExibicaoComponent,
    AlunosConsultaComponent,
    EmpresasConsultaComponent,
    ContratosConsultaComponent,
    RelatoriosConsultaComponent,
    AssociarContratoComponent,
    AssociarAlunoComponent,
    TipoAtividadeComponent,
    AssociarEmpresaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
