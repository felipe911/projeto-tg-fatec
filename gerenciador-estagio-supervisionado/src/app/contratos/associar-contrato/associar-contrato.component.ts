import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { AlunoService } from 'src/app/service/aluno.service';
import { Aluno } from 'src/app/model/Aluno';
import { EmpresaService } from 'src/app/service/empresa.service';
import { Empresa } from 'src/app/model/Empresa';
import { Contrato } from 'src/app/model/Contrato';
import { ContratoService } from 'src/app/service/contrato.service';
import { AssociarContratoMediator } from 'src/app/mediators/AssociarContratoMediator';

@Component({
  selector: 'app-associar-contrato',
  templateUrl: './associar-contrato.component.html',
  styleUrls: ['./associar-contrato.component.css']
})

export class AssociarContratoComponent implements OnInit {

  titulo = 'Associar Contrato - Aluno e Empresa';

  constructor(private activatedRoute: ActivatedRoute, 
              private alunoService: AlunoService, 
              private empresaService: EmpresaService,
              private contratoService: ContratoService,
              private modalService: BsModalService) { }

  empresas: Empresa[];

  empresa: Empresa = new Empresa();
  contrato: Contrato = new Contrato();
  aluno = new Aluno();
  
  modalPosReq: BsModalRef;
  mensagemPosReq: String;
  btnSubmit: String = 'Salvar';

  associarContratoMediator: AssociarContratoMediator = new AssociarContratoMediator();

  ngOnInit() {
    this.listarEmpresas();
    this.verificaTipoPagina();
  }
  
  listarEmpresas(){
    this.empresaService.listar().subscribe(
      empresas => {
        this.empresas = empresas;
      }
    )
  }

  verificaTipoPagina(){
    this.activatedRoute.params.subscribe(
      (params: any) => {
        const id = params['id'];
        if(id){
          this.titulo = 'Editar Associação de Contrato - Aluno e Empresa';
          this.btnSubmit = "Atualizar";
          this.contratoService.buscaPorIdEditarContrato(id).subscribe(

            estagio => {
              this.contrato = estagio.contrato;
              this.empresa = estagio.contrato.empresa;
              this.aluno = estagio.aluno;
            },
            error =>{
              alert('Erro na Requisição');
            }
          )
        }
      }
    );
  }

  geraContrato(template: TemplateRef<any>, formContrato: NgForm, formEmpresa: NgForm, formAluno: NgForm){

    this.associarContratoMediator.aluno = this.aluno;
    this.associarContratoMediator.empresa = this.empresa;
    this.associarContratoMediator.contrato = this.contrato;

    this.contratoService.salvar(this.associarContratoMediator).subscribe(
          
      sucess => {

        this.mensagemPosReq = 'Contrato associado com sucesso.'
        this.modalPosRequisicao(template);
        
        this.limpar(formContrato, formEmpresa, formAluno);
        
      },
      err => {

        this.mensagemPosReq = err.error.message;
        this.modalPosRequisicao(template);

      });
  }


  buscaPorRazaoSocial(){
    this.empresaService.buscaPorRazaoSocial(this.empresa).subscribe(
      empresaEncontrada => {
        this.empresa = empresaEncontrada;
      }
    )
  }

  buscaPorRa(template: TemplateRef<any>){
    if(this.verificaRa()){
      this.alunoService.buscaPorRa(this.aluno).subscribe(

          aluno => {
            this.aluno = aluno;
        },
      
        err => {

          this.mensagemPosReq = err.error.message;
          this.modalPosRequisicao(template);

        });

    } else {
      this.mensagemPosReq = 'O RA precisa de no mínimo 13 números.'
      this.modalPosRequisicao(template);

    }
  }

  verificaRa(): Boolean{
    if(this.aluno.ra.length == 13)
      return true;
    return false
  }

  modalPosRequisicao(template: TemplateRef<any>){
    const config: ModalOptions = { class: 'modal-md' }
    this.modalPosReq = this.modalService.show(template, config);
  }

  limpar(formContrato: NgForm, formEmpresa: NgForm, formAluno: NgForm){
    formContrato.reset();
    formEmpresa.reset();
    formAluno.reset();
  }
}
