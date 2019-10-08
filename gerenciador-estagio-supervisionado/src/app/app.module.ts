import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';

import { MenuComponent } from './menu/menu.component';
import { AlunosComponent } from './cadastros/alunos/alunos.component';
import { EmpresasComponent } from './cadastros/empresas/empresas.component';
import { AlunosConsultaComponent } from './consultas/alunos-consulta/alunos-consulta.component';
import { EmpresasConsultaComponent } from './consultas/empresas-consulta/empresas-consulta.component';
import { ContratosConsultaComponent } from './consultas/contratos-consulta/contratos-consulta.component';
import { RelatoriosConsultaComponent } from './consultas/relatorios-consulta/relatorios-consulta.component';
import { AssociarContratoComponent } from './contratos/associar-contrato/associar-contrato.component';
import { AssociarAlunoComponent } from './contratos/associar-contrato/associar-aluno/associar-aluno.component';
import { AssociarEmpresaComponent } from './contratos/associar-contrato/associar-empresa/associar-empresa.component';
import { TipoAtividadeComponent } from './estagio/tipo-atividade/tipo-atividade.component';
import { RelatorioParcialComponent } from './estagio/relatorio-parcial/relatorio-parcial.component';
import { RelatorioFinalComponent } from './estagio/relatorio-final/relatorio-final.component';
import { AdicionarRegistroEstagioComponent } from './estagio/relatorio-final/adicionar-registro-estagio/adicionar-registro-estagio.component';
import { HistoricoEstagioComponent } from './estagio/relatorio-final/historico-estagio/historico-estagio.component';
import { AlunoGerenciamentoComponent } from './aluno-gerenciamento/aluno-gerenciamento.component';
import { HomeComponent } from './home/home.component';
import { DadosEstagioComponent } from './estagio/relatorio-final/historico-estagio/dados-estagio/dados-estagio.component';
import { VisualizarAtividadesComponent } from './estagio/relatorio-final/historico-estagio/visualizar-atividades/visualizar-atividades.component';
import { VisualizarEstagiosAlunoComponent } from './consultas/alunos-consulta/visualizar-estagios-aluno/visualizar-estagios-aluno.component';
import { VisualizarDadosAlunoComponent } from './consultas/alunos-consulta/visualizar-dados-aluno/visualizar-dados-aluno.component';
import { VisualizarDadosEmpresaComponent } from './consultas/empresas-consulta/visualizar-dados-empresa/visualizar-dados-empresa.component';
import { VisualizarEstagiariosEmpresaComponent } from './consultas/empresas-consulta/visualizar-estagiarios-empresa/visualizar-estagiarios-empresa.component';
import { VisualizarContratoComponent } from './consultas/contratos-consulta/visualizar-contrato/visualizar-contrato.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './login/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    AlunosComponent,
    EmpresasComponent,
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
    HistoricoEstagioComponent,
    AlunoGerenciamentoComponent,
    DadosEstagioComponent,
    VisualizarAtividadesComponent,
    VisualizarDadosAlunoComponent,
    VisualizarEstagiosAlunoComponent,
    VisualizarDadosEmpresaComponent,
    VisualizarEstagiariosEmpresaComponent,
    VisualizarContratoComponent,
    LoginComponent
  ],
  imports: [
    ModalModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    AuthService
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
