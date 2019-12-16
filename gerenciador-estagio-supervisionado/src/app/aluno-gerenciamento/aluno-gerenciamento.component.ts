import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';

import { EstagioService } from '../service/estagio.service';
import { Aluno } from '../model/Aluno';
import { Empresa } from '../model/Empresa';
import { Contrato } from '../model/Contrato';
import { Estagio } from '../model/Estagio';

@Component({
  selector: 'app-aluno-gerenciamento',
  templateUrl: './aluno-gerenciamento.component.html',
  styleUrls: ['./aluno-gerenciamento.component.css']
})
export class AlunoGerenciamentoComponent implements OnInit {

  constructor(private router: Router, private estagioService: EstagioService, private modalService: BsModalService) { }

  aluno: Aluno = new Aluno();
  empresa: Empresa = new Empresa();
  contrato: Contrato = new Contrato();
  estagios: Estagio[];

  modalRef: BsModalRef;
  modalRefChild: BsModalRef;
  modalRefHist: BsModalRef;
  modalConfirm: BsModalRef;
  modalVisualizarRef: BsModalRef;

  openModal(template: TemplateRef<any>) {
    const config: ModalOptions = { class: 'modal-lg' }
    this.modalRef = this.modalService.show(template, config);
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

  getTipoAtividade(){
    this.router.navigate(['estagio/tipo-atividade']);
  }
}
