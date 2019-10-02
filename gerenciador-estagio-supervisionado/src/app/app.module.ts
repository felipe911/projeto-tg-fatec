import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { ModalModule } from 'ngx-bootstrap/modal';

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
import { RelatorioParcialComponent } from './estagio/relatorio-parcial/relatorio-parcial.component';
import { RelatorioFinalComponent } from './estagio/relatorio-final/relatorio-final.component';
import { AdicionarRegistroEstagioComponent } from './estagio/relatorio-final/adicionar-registro-estagio/adicionar-registro-estagio.component';
import { HistoricoEstagioComponent } from './estagio/relatorio-final/historico-estagio/historico-estagio.component';

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
    RelatorioParcialComponent,
    RelatorioFinalComponent,
    AssociarEmpresaComponent,
    AdicionarRegistroEstagioComponent,
    HistoricoEstagioComponent
  ],
  imports: [
    ModalModule.forRoot(),
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
