import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskModule } from 'ngx-mask'

import { MenuComponent } from './menu/menu.component';
import { AlunosComponent } from './cadastros/alunos/alunos.component';
import { EmpresasComponent } from './cadastros/empresas/empresas.component';
import { AssociarContratoComponent } from './contratos/associar-contrato/associar-contrato.component';
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
import { LoginComponent } from './login/login.component';
import { AuthService } from './login/auth.service';
import { AuthGuard } from './guards/auth-guard';
import { AdminGerenciamentoComponent } from './admin-gerenciamento/admin-gerenciamento.component';
import { DashboardComponent } from './admin-gerenciamento/dashboard/dashboard.component';
import { GraficosComponent } from './admin-gerenciamento/dashboard/graficos/graficos.component';
import { EntregaRelatorioComponent } from './admin-gerenciamento/entrega-relatorio/entrega-relatorio.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AlunoService } from './service/aluno.service';
import { EmpresaService } from './service/empresa.service';
import { EmpresaPesquisaDatatableComponent } from './consultas/empresas-consulta/empresa-pesquisa-datatable/empresa-pesquisa-datatable.component';
import { AlunoPesquisaDatatableComponent } from './consultas/alunos-consulta/aluno-pesquisa-datatable/aluno-pesquisa-datatable.component';
import { ContratoPesquisaDatatableComponent } from './consultas/contratos-consulta/contrato-pesquisa-datatable/contrato-pesquisa-datatable.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    AlunosComponent,
    EmpresasComponent,
    AlunoPesquisaDatatableComponent,
    EmpresaPesquisaDatatableComponent,
    ContratoPesquisaDatatableComponent,
    AssociarContratoComponent,
    TipoAtividadeComponent,
    RelatorioParcialComponent,
    RelatorioFinalComponent,
    AdicionarRegistroEstagioComponent,
    HistoricoEstagioComponent,
    AlunoGerenciamentoComponent,
    DadosEstagioComponent,
    VisualizarAtividadesComponent,
    VisualizarDadosAlunoComponent,
    VisualizarEstagiosAlunoComponent,
    LoginComponent,
    GraficosComponent,
    AdminGerenciamentoComponent,
    DashboardComponent,
    EntregaRelatorioComponent
  ],
  imports: [
    ModalModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    HttpClientModule,
    NgxMaskModule.forRoot()
  ],
  providers: [
    AuthService,
    AuthGuard,
    AlunoService,
    EmpresaService
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
