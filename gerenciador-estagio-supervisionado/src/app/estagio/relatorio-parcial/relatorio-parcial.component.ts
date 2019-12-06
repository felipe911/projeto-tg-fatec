import { Component, OnInit, TemplateRef} from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import jsPDF from 'jspdf';
import * as moment from 'moment'

import { Aluno } from 'src/app/model/Aluno';
import { Contrato } from 'src/app/model/Contrato';
import { RelatorioParcial } from 'src/app/model/RelatorioParcial';
import { ContratoService } from 'src/app/service/contrato.service';
import { AlunoService } from 'src/app/service/aluno.service';
import { RelatoriosAlunoMediator } from 'src/app/mediators/RelatoriosAlunoMediator';
import { RelatoriosService } from 'src/app/service/relatorios.service';

@Component({
  selector: 'app-relatorio-parcial',
  templateUrl: './relatorio-parcial.component.html',
  styleUrls: ['./relatorio-parcial.component.css']
})
export class RelatorioParcialComponent implements OnInit {

  constructor(private contratoService: ContratoService, private alunoService: AlunoService, private relatorioService: RelatoriosService, private modalService: BsModalService) { }

  teste1: String = 'ola';

  seisMeses: number = 182;
  aluno: Aluno = new Aluno();
  contrato: Contrato = new Contrato();
  relatorioParcial: RelatorioParcial = new RelatorioParcial();
  relatoriosAlunoMediator: RelatoriosAlunoMediator = new RelatoriosAlunoMediator();
  modalPosReq: BsModalRef;
  mensagemPosReq: String;

  dataAtual = new Date();
  dataPeriodoInicio: string;
  dataPeriodoFim: string;

  ngOnInit() {
    this.dataPeriodoInicio = moment(this.dataAtual).format('DD/MM/YYYY');
    this.dataPeriodoFim = moment(this.dataAtual.setDate(this.dataAtual.getDate() + this.seisMeses)).format('DD/MM/YYYY');

    this.alunoService.buscaPorId().subscribe(
      aluno => {
        this.aluno = aluno;

        this.carregaContratoDoAluno();

      },
      err =>{
        alert(err.error.message);
      }
    );
  }

  carregaContratoDoAluno(){
    this.contratoService.buscaPorAluno(this.aluno).subscribe(
      contrato => {
        this.contrato = contrato;
      },
      err =>{
        alert(err.error.message);
      }

    );
  }

  salvarRelatorioParcial(template: TemplateRef<any>, form: NgForm){

    this.relatoriosAlunoMediator.aluno = this.aluno;
    this.relatoriosAlunoMediator.relatorioParcial = this.relatorioParcial;
    this.relatoriosAlunoMediator.relatorioParcial.periodoDe = new Date();

    this.relatorioService.salvarRelatorioParcial(this.relatoriosAlunoMediator).subscribe(

      sucess => {
        this.mensagemPosReq = 'Relatório Parcial cadastrado com sucesso.'
        this.modalPosRequisicao(template);
        
      },
      err => {
        this.mensagemPosReq = err.error.message;
        this.modalPosRequisicao(template);
      });

  }

  modalPosRequisicao(template: TemplateRef<any>){
    const config: ModalOptions = { class: 'modal-md' }
    this.modalPosReq = this.modalService.show(template, config);
  }

  limpar(form: NgForm){
    form.reset();
  }

  imprimirRelatorioParcial(){
    let documento = new jsPDF();
    documento.setFont("Courier");
    documento.setFontStyle("bold");
    documento.setFontSize(20);
    documento.text(this.teste1, 65, 15);

    documento.rect(20, 20, 10, 10); 



    documento.output("dataurlnewwindow");
  }
}
