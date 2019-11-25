import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';

import { Empresa } from './Empresa';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private modalService: BsModalService) { }

  titulo: String  = 'Cadastrar Empresa';
  empresa = new Empresa();
  modalPosReq: BsModalRef;
  mensagemPosReq: String;
  
  ufs = [
    'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ'
    ,'RN','RS','RO','RR','SC','SP','SE','TO']

    
    modalPosRequisicao(template: TemplateRef<any>){
      const config: ModalOptions = { class: 'modal-md' }
      this.modalPosReq = this.modalService.show(template, config);
    }
  
    limpar(form: NgForm){
      form.reset();
    }

    salvar(template: TemplateRef<any>, form: NgForm){

      if(this.verificaCamposObrigatorios()){
       /* if(this.verificaRa()){
  
          this.alunoService.salvar(this.aluno).subscribe(
          
            sucess => {
              this.mensagemPosReq = 'Aluno cadastrado com sucesso.'
              this.modalPosRequisicao(template);
              
              form.reset();
              this.aluno = new Aluno();
              
            },
            error => {
              this.mensagemPosReq = 'Já existe um aluno registrado com este RA.'
              this.modalPosRequisicao(template);
            }
            );
          } else{
            this.mensagemPosReq = 'O RA precisa de no mínimo 13 números.'
            this.modalPosRequisicao(template);
        } */
      } else {
        this.mensagemPosReq = 'Existem campos obrigatórios que não foram preenchidos/selecionados.'
        this.modalPosRequisicao(template);
      }
    }

    verificaCamposObrigatorios(): Boolean{

      debugger

      if(this.empresa.razaoSocial == undefined || this.empresa.razaoSocial == "" ||
         this.empresa.cnpj == undefined ||  this.empresa.cnpj == "" ||
         this.empresa.contatoResponsavel == undefined || this.empresa.contatoResponsavel == "" ||
         this.empresa.cep == undefined || this.empresa.cep == "" ||
         this.empresa.cidade == undefined || this.empresa.cidade == "" ||
         this.empresa.bairro == undefined || this.empresa.bairro == "" ||
         this.empresa.email == undefined || this.empresa.email == "" ||
         this.empresa.endereco == undefined || this.empresa.endereco == "" ||
         this.empresa.telefone == undefined || this.empresa.telefone == "" ||
         this.empresa.numero == undefined ||
         this.empresa.uf == undefined ||
         this.empresa.prazoConvenio == undefined)
        return false;
  
      return true;
    }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params.id;
    if(id){
      this.titulo = 'Editar Empresa';
    }
  }

}
