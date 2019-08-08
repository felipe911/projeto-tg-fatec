import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';

import { AlunosComponent } from './cadastros/alunos/alunos.component';
import { EmpresasComponent } from './cadastros/empresas/empresas.component';
import { AlunosConsultaComponent } from './consultas/alunos-consulta/alunos-consulta.component';
import { EmpresasConsultaComponent } from './consultas/empresas-consulta/empresas-consulta.component';

@NgModule({
  declarations: [
    AppComponent,
    AlunosComponent,
    EmpresasComponent,
    AlunosConsultaComponent,
    EmpresasConsultaComponent
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
