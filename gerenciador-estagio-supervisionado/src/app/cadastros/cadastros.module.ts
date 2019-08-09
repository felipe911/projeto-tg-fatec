import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AlunosComponent } from "./alunos/alunos.component";
import { EmpresasComponent } from './empresas/empresas.component';
import { RelatoriosComponent } from './relatorios/relatorios.component';
import { RelatorioPesquisaAlunoComponent } from './relatorios/relatorio-pesquisa-aluno/relatorio-pesquisa-aluno.component';
import { RelatorioAdicionarComponent } from './relatorios/relatorio-adicionar/relatorio-adicionar.component';
import { RelatorioExibicaoComponent } from './relatorios/relatorio-exibicao/relatorio-exibicao.component';

@NgModule({

    declarations:[
        AlunosComponent,
        EmpresasComponent,
        RelatoriosComponent,
        RelatorioPesquisaAlunoComponent,
        RelatorioAdicionarComponent,
        RelatorioExibicaoComponent,
    ],
    exports: [ 
        AlunosComponent,
        EmpresasComponent,
        RelatoriosComponent
    ],
    imports: [
        CommonModule
    ]
})

export class CadastrosModule{}
