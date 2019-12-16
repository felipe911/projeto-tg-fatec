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
import { RelatoriosService } from 'src/app/service/relatorios.service';

@Component({
  selector: 'app-entrega-relatorio',
  templateUrl: './entrega-relatorio.component.html',
  styleUrls: ['./entrega-relatorio.component.css']
})
export class EntregaRelatorioComponent implements OnInit {

  constructor(private modalService: BsModalService, private router: Router, private entregaRelatorioService: EntregaRelatorioService, private relatorioService: RelatoriosService) { }

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

  relatorioFinalEntregue: Boolean;
  objectRelatorioFinalEntregue: RelatorioFinal;

  modalPosReq: BsModalRef;
  mensagemPosReq: String;

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

    this.idSelecionado = id;
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

        console.log(this.relatorioFinal);
      },
      error =>{
        alert('Erro na Requisição');
      }
    )
  }

  relatorioEntregue(valor, relatorioFinal: RelatorioFinal){
    
    this.relatorioFinalEntregue = (valor.srcElement.value);
    this.objectRelatorioFinalEntregue = relatorioFinal;
  }

  salvarRelatorioEntregue(template: TemplateRef<any>){

    if(this.relatorioFinalEntregue == undefined){

      alert("Selecione o Relatório Final para finalizar o estágio.")

    } else {
      
      if(this.relatorioFinalEntregue = true){
        this.relatorioService.salvarEntregaRelatorioFinal(this.objectRelatorioFinalEntregue).subscribe(

          sucess =>{
            this.mensagemPosReq = 'Entrega de relatório final registrada com sucesso, este estágio foi Finalizado.'
            this.modalPosRequisicao(template);

            this.buscaDadosAlunoEntregaRelatorio(this.idSelecionado);
          },

          err => {
            err = alert(err.error.message);
          }

        )
      }
    }
  }

  modalPosRequisicao(template: TemplateRef<any>){
    const config: ModalOptions = { class: 'modal-md' }
    this.modalPosReq = this.modalService.show(template, config);
  }

}
