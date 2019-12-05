import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { BsModalRef, ModalOptions, BsModalService } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';

import { Aluno } from 'src/app/model/Aluno';
import { Empresa } from 'src/app/model/Empresa';
import { Contrato } from 'src/app/model/Contrato';
import { AssociarContratoMediator } from 'src/app/mediators/AssociarContratoMediator';
import { ContratoService } from 'src/app/service/contrato.service';

@Component({
  selector: 'app-associar-contrato-estagio',
  templateUrl: './associar-contrato-estagio.component.html',
  styleUrls: ['./associar-contrato-estagio.component.css']
})
export class AssociarContratoEstagioComponent implements OnInit {

  constructor(private contratoService: ContratoService, private modalService: BsModalService) { }

  @Input() alunoSelecionado: Aluno;
  @Input() empresaSelecionada: Empresa;
  
  contrato: Contrato = new Contrato();
  aluno: Aluno = new Aluno();
  empresa: Empresa = new Empresa();
  
  modalPosReq: BsModalRef;
  mensagemPosReq: String;

  associarContratoMediator: AssociarContratoMediator = new AssociarContratoMediator();

  ngOnInit() {
  }

  geraContrato(template: TemplateRef<any>, form: NgForm){

    this.associarContratoMediator.aluno = this.alunoSelecionado;
    this.associarContratoMediator.empresa = this.empresaSelecionada;
    this.associarContratoMediator.contrato = this.contrato;

    this.contratoService.salvar(this.associarContratoMediator).subscribe(
          
      sucess => {

        this.mensagemPosReq = 'Contrato associado com sucesso.'
        this.modalPosRequisicao(template);
        
        form.reset();
        
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

}
