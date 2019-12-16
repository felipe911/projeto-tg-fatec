import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { EstagioService } from '../service/estagio.service';
import { Aluno } from '../model/Aluno';
import { Empresa } from '../model/Empresa';
import { Contrato } from '../model/Contrato';
import { Estagio } from '../model/Estagio';
import { RelatorioAtividade } from '../model/RelatorioAtividade';
import { RelatoriosService } from '../service/relatorios.service';
import { RelatoriosAlunoMediator } from '../mediators/RelatoriosAlunoMediator';

@Component({
  selector: 'app-aluno-gerenciamento',
  templateUrl: './aluno-gerenciamento.component.html',
  styleUrls: ['./aluno-gerenciamento.component.css']
})
export class AlunoGerenciamentoComponent implements OnInit {

  constructor(private router: Router,
              private estagioService: EstagioService,
              private modalService: BsModalService,
              private relatorioService: RelatoriosService) { }

  alunoSelecionado: Aluno = new Aluno();      
  idSelecionado: number;      
  aluno: Aluno = new Aluno();
  empresa: Empresa = new Empresa();
  contrato: Contrato = new Contrato();
  estagios: Estagio[];
  relatoriosAtividades: RelatorioAtividade[];
  relatoriosAtividadesAlunoHistoricos: RelatorioAtividade[];
  relatorioAtividade: RelatorioAtividade = new RelatorioAtividade();
  relatorioAlunoMediator: RelatoriosAlunoMediator = new RelatoriosAlunoMediator;
  totalHorasAtuais: number;
  totalHorasFaltantes: number;

  modalRef: BsModalRef;
  modalRefChild: BsModalRef;
  modalRefHist: BsModalRef;
  modalConfirm: BsModalRef;
  modalVisualizarRef: BsModalRef;

  modalPosReq: BsModalRef;
  mensagemPosReq: String;

  openModal(template: TemplateRef<any>, aluno: Aluno) {
    const config: ModalOptions = { class: 'modal-lg' }
    this.modalRef = this.modalService.show(template, config);

    this.listaRelatoriosAtividades(aluno);

  }
  
  listaRelatoriosAtividades(aluno: Aluno){

    this.totalHorasFaltantes = 240;
    this.totalHorasAtuais = 0;

    this.alunoSelecionado = aluno;

    this.relatorioService.buscarRelatoriosAtividadePorAluno(aluno).subscribe(

      dados => {
        this.relatoriosAtividades = dados;

        this.relatoriosAtividades.forEach(element => {
          this.totalHorasAtuais+= element.qtdHoras ;
        });
        this.totalHorasFaltantes-= this.totalHorasAtuais;
      }
    )
  }

  openModalAddAtividade(template: TemplateRef<any>) {
    const config: ModalOptions = { 
      class: 'second modal-lg',
      backdrop: true
    }

    this.modalRefChild = this.modalService.show(template, config);
  }

  openModalHistorico(template: TemplateRef<any>, id) {
    const config: ModalOptions = { class: 'modal-lg' }
    this.modalRefHist = this.modalService.show(template, config);

    this.idSelecionado = id;

    this.estagioService.buscaEstagiosPorIdAluno(id).subscribe(

      dados => {
        this.estagios = dados;
      }
    )
    
  }

  openModalConfirm(template: TemplateRef<any>) {
    const config: ModalOptions = { class: 'modal-sm' }
    this.modalConfirm = this.modalService.show(template, config);
  }

  openModalVisualizar(template: TemplateRef<any>) {
    const config: ModalOptions = { class: 'modal-lg' }
    this.modalVisualizarRef = this.modalService.show(template, config);

    this.relatorioService.buscaRelatorioAtividadePorIdAluno(this.idSelecionado).subscribe(

      dados => {
        this.relatoriosAtividadesAlunoHistoricos = dados;
      }

    )
  }


  ngOnInit() {
    this.estagioService.buscaEstagioPorIdAluno(1).subscribe(

      dados => {
          this.aluno = dados.aluno;
          this.empresa = dados.contrato.empresa;
          this.contrato = dados.contrato;
      }
    )
  }

  modalPosRequisicao(template: TemplateRef<any>){
    const config: ModalOptions = { class: 'modal-md' }
    this.modalPosReq = this.modalService.show(template, config);
  }

  getTipoAtividade(){
    this.router.navigate(['estagio/tipo-atividade']);
  }

  limparRelatorioAtividadeAdd(form: NgForm){
    form.reset();
  }

  salvarRelatorioAtividade(template: TemplateRef<any>, form: NgForm){

    this.relatorioAlunoMediator.aluno = this.alunoSelecionado;
    this.relatorioAlunoMediator.relatorioAtividade = this.relatorioAtividade;

    this.relatorioService.salvarRelatorioAtividade(this.relatorioAlunoMediator).subscribe(
      sucess => {
        this.mensagemPosReq = 'Relatório de Atividade Cadastrado com sucesso.'
        this.modalPosRequisicao(template);
        
        form.reset();
        this.relatorioAtividade = new RelatorioAtividade();
        this.listaRelatoriosAtividades(this.alunoSelecionado);
      },
      err => {
        this.mensagemPosReq = err.error.message;
        this.modalPosRequisicao(template);
      }
    );
  }
}
