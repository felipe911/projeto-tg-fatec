import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';

import { AlunosComponent } from './cadastros/alunos/alunos.component';
import { EmpresasComponent } from './cadastros/empresas/empresas.component';
import { AlunosConsultaComponent } from './consultas/alunos-consulta/alunos-consulta.component';
import { EmpresasConsultaComponent } from './consultas/empresas-consulta/empresas-consulta.component';
import { AssociarContratoComponent } from './contratos/associar-contrato/associar-contrato.component';
import { AssociarAlunoComponent } from './contratos/associar-contrato/associar-aluno/associar-aluno.component';
import { AssociarEmpresaComponent } from './contratos/associar-contrato/associar-empresa/associar-empresa.component';
import { ContratosConsultaComponent } from './consultas/contratos-consulta/contratos-consulta.component';

@NgModule({
  declarations: [
    AppComponent,
    AlunosComponent,
    EmpresasComponent,
    AlunosConsultaComponent,
    EmpresasConsultaComponent,
    ContratosConsultaComponent,
    AssociarContratoComponent,
    AssociarAlunoComponent,
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
