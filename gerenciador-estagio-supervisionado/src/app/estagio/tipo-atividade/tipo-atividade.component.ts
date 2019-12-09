import { Component, OnInit, TemplateRef} from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import jsPDF from 'jspdf';
import * as moment from 'moment'

import { RelatoriosService } from 'src/app/service/relatorios.service';
import { ContratoService } from 'src/app/service/contrato.service';
import { AlunoService } from 'src/app/service/aluno.service';
import { Aluno } from 'src/app/model/Aluno';
import { Contrato } from 'src/app/model/Contrato';
import { RelatoriosAlunoMediator } from 'src/app/mediators/RelatoriosAlunoMediator';
import { RelatorioFinal } from 'src/app/model/RelatorioFinal';
import { TipoAtividadeEstagiario } from 'src/app/model/TipoAtividadeEstagiario';
import { TipoAtividade } from 'src/app/model/TipoAtividade';

@Component({
  selector: 'app-tipo-atividade',
  templateUrl: './tipo-atividade.component.html',
  styleUrls: ['./tipo-atividade.component.css']
})
export class TipoAtividadeComponent implements OnInit {

  constructor(private contratoService: ContratoService, private alunoService: AlunoService, private relatorioService: RelatoriosService, private modalService: BsModalService) { }

  modalPosReq: BsModalRef;
  mensagemPosReq: String;

  estagioAtual: String;
  tipoAtividade: any;
  tipoAtividadeEstagiario: any;
  tipoAtividadeEstagiarioObject: TipoAtividadeEstagiario = new TipoAtividadeEstagiario();
  aluno: Aluno = new Aluno();
  contrato: Contrato = new Contrato();
  relatorioFinal: RelatorioFinal = new RelatorioFinal();
  relatoriosAlunoMediator: RelatoriosAlunoMediator = new RelatoriosAlunoMediator();

  ngOnInit() {

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
        this.estagioAtual = contrato.empresa.razaoSocial;
        this.relatorioFinal.periodoDe = contrato.dataInicio;
        this.relatorioFinal.periodoAte = contrato.dataFim;
        this.relatorioFinal.local = contrato.empresa.razaoSocial;
      },
      err =>{
        alert(err.error.message);
      }

    );
  }

  salvarRelatorioFinal(template: TemplateRef<any>, form: NgForm){
    
    if(this.realizaValidacoes()){
      
      this.relatoriosAlunoMediator.aluno = this.aluno;
      this.relatoriosAlunoMediator.tipoAtividadeEstagiario = this.tipoAtividadeEstagiarioObject;
      this.relatoriosAlunoMediator.relatorioFinal = this.relatorioFinal

      this.relatorioService.salvarRelatorioFinal(this.relatoriosAlunoMediator).subscribe(

      sucess => {
        this.mensagemPosReq = 'Relatório Final cadastrado com sucesso.'
        this.modalPosRequisicao(template);
        
      },
      err => {
        this.mensagemPosReq = err.error.message;
        this.modalPosRequisicao(template);
      });

    } else {
      this.modalPosRequisicao(template);
    }
  }
  
  modalPosRequisicao(template: TemplateRef<any>){
    const config: ModalOptions = { class: 'modal-md' }
    this.modalPosReq = this.modalService.show(template, config);
  }

  limpar(form: NgForm){
    form.reset();
    this.ngOnInit();
  }


  realizaValidacoes(): Boolean {

    if(this.relatorioFinal.areaAtividade == undefined || this.relatorioFinal.areaAtividade == "" || 
       this.relatorioFinal.totalHorasCumpridas == undefined || this.relatorioFinal.totalHorasCumpridas.toString() == ""){
        this.mensagemPosReq = "Preencha todos os campos obrigatórios";
        return false;
    }

    if(this.tipoAtividade == undefined){
      this.mensagemPosReq = "Escolha uma opção de Tipo de Atividade";
      return false;

    } else {
      this.verificaTipoAtividade();
  
      if(this.tipoAtividade == "outros"){
        return this.verificaOpcaoOutros();
      }
  
      if(this.tipoAtividade == "estagiario"){
        return this.verificaOpcaoEstagiario();
      }
    }


    return true;
  }

  verificaTipoAtividade(){
    if(this.tipoAtividade == "estagiario")
      this.relatorioFinal.tipoAtividade = TipoAtividade.ESTAGIARIO;

    if(this.tipoAtividade == "profissional-liberal")
      this.relatorioFinal.tipoAtividade = TipoAtividade.PROFISSIONAL_LIBERAL;

    if(this.tipoAtividade == "empresario")
      this.relatorioFinal.tipoAtividade = TipoAtividade.EMPRESARIO;

    if(this.tipoAtividade == "vinculo-empregaticio")
      this.relatorioFinal.tipoAtividade = TipoAtividade.VINCULO_EMPREGATICIO;

    if(this.tipoAtividade == "outros")
      this.relatorioFinal.tipoAtividade = TipoAtividade.OUTROS;
  }

  verificaOpcaoOutros(): Boolean{
    if(this.relatorioFinal.especificacaoOutros == undefined || this.relatorioFinal.especificacaoOutros == ""){
      this.mensagemPosReq = "Especifique sua escolha pela opção 'Outros'";
      return false;
    }

    return true;
  }

  verificaOpcaoEstagiario(): Boolean{
    if(this.tipoAtividadeEstagiario == undefined){
      this.mensagemPosReq = "Escolha uma opção do Tipo 'Estagiário'";
      return false;
    }

    if(this.tipoAtividadeEstagiario == "setorPrivado")
      this.tipoAtividadeEstagiarioObject.setorPrivado = true;

    if(this.tipoAtividadeEstagiario == "organizacaoTerceiroSetor")
      this.tipoAtividadeEstagiarioObject.organizacaoTerceiroSetor = true;

    if(this.tipoAtividadeEstagiario == "orgaoAdmPublica")
      this.tipoAtividadeEstagiarioObject.orgaoAdmPublica = true;

    if(this.tipoAtividadeEstagiario == "ativExtracurricularesFatec")
      this.tipoAtividadeEstagiarioObject.ativExtracurricularesFatec = true;

    return true;
  }
}
