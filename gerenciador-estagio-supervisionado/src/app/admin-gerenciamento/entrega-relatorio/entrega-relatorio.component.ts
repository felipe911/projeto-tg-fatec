import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { EntregaRelatorioService } from 'src/app/service/entregaRelatorio.service';
import { EntregaRelatorioMediator } from 'src/app/mediators/EntregaRelatorioMediator';
import { Aluno } from 'src/app/model/Aluno';
import { Empresa } from 'src/app/model/Empresa';
import { Estagio } from 'src/app/model/Estagio';
import { RelatorioFinal } from 'src/app/model/RelatorioFinal';
import { Contrato } from 'src/app/model/Contrato';
import { RelatorioParcial } from 'src/app/model/RelatorioParcial';

@Component({
  selector: 'app-entrega-relatorio',
  templateUrl: './entrega-relatorio.component.html',
  styleUrls: ['./entrega-relatorio.component.css']
})
export class EntregaRelatorioComponent implements OnInit {

  constructor(private modalService: BsModalService, private router: Router, private entregaRelatorioService: EntregaRelatorioService) { }

  idSelecionado: number;
  cabecalhoElementos = ['Nome', 'RA', 'Curso', 'Relatórios'];
  entregas: EntregaRelatorioMediator[];
  modalVis: BsModalRef;

  alunos: Aluno[];
  empresas: Empresa[];
  relatoriosParciais: RelatorioParcial[];
  relatorioFinal: RelatorioFinal;
  contrato: Contrato = new Contrato();
  aluno: Aluno = new Aluno();
  empresa: Empresa = new Empresa();

  ngOnInit() {

    this.entregaRelatorioService.listar().subscribe(

      entrega => {
        this.entregas = entrega;
      }
    )

  }

  visualizarRelatorioParcial(){
    this.router.navigate(['aluno/relatorio-parcial/1']);
    this.modalVis.hide();
  }

  openModalVisualizarRelatorios(template: TemplateRef<any>, id) {
    const config: ModalOptions = { class: 'modal-lg' }
    this.modalVis = this.modalService.show(template, config);

    this.buscaDadosAlunoEntregaRelatorio(id);
  }

  buscaDadosAlunoEntregaRelatorio(id){

    this.entregaRelatorioService.listarEntregaRelatorioPorIdAluno(id).subscribe(

      dados => {
        this.aluno = dados.estagio.aluno;
        this.empresa = dados.estagio.contrato.empresa;
        this.contrato = dados.estagio.contrato;
        this.relatorioFinal = dados.relatorioFinal;
        this.relatoriosParciais = dados.relatorioParcial;
      },
      error =>{
        alert('Erro na Requisição');
      }
    )
  }

}
