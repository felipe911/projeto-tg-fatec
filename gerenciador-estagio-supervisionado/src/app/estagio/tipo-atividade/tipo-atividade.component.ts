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
  tipoAtividadeImpressao: String = "";
  tipoAtividadeEstagiarioImpressao: String = "";
  tipoAtividadeEstagiarioObject: TipoAtividadeEstagiario = new TipoAtividadeEstagiario();
  aluno: Aluno = new Aluno();
  contrato: Contrato = new Contrato();
  relatorioFinal: RelatorioFinal = new RelatorioFinal();
  relatoriosAlunoMediator: RelatoriosAlunoMediator = new RelatoriosAlunoMediator();

  valorImprimir: String;
  valorImprimirEstagiario: String;

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

    if(this.tipoAtividadeImpressao == undefined){
      this.mensagemPosReq = "Escolha uma opção de Tipo de Atividade";
      return false;

    } else {
      this.verificaTipoAtividade();
  
      if(this.tipoAtividadeImpressao == "outros"){
        return this.verificaOpcaoOutros();
      }
  
      if(this.tipoAtividadeImpressao == "estagiario"){
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

  imprimirRelatorioFinal(template: TemplateRef<any>){

    this.concatenaStrings();

    var lMargin=15; //left margin in mm
    var rMargin=15; //right margin in mm
    var pdfInMM=210;  // width of A4 in mm
    var pageCenter=pdfInMM/2;
    
    var doc = new jsPDF("p","mm","a4");
    doc.addImage(this.imgData, 'PNG', 15, 5, 180, 25);
    doc.setFont("Arial");
    doc.setFontStyle("bold");
    doc.setFontSize(18);

     // Variáveis
     var titulo_relatorio = "Validação de Horas de Estágio";
 
     //Cabeçalho
     doc.text(doc.splitTextToSize(titulo_relatorio, (pdfInMM-lMargin-rMargin)),pageCenter,43,'center');

     doc.setFontSize(12);
     doc.text("Nome:", 12, 55);
     doc.text(this.aluno.nome, 25, 55);
     doc.text("No. Matrícula:", 12, 62);
     doc.text(this.aluno.ra, 40, 62);
     doc.text("1. Tipo de Atividade desenvolvida e forma de comprovação:", 12, 74);
     doc.setFontSize(11);
     doc.text(`${this.valorImprimir}` + this.validaAtividadeEstagio(), 16, 82)
     doc.setFontSize(12);
     doc.text("2. Local e Período: ", 12, 102);
     doc.text(`${this.relatorioFinal.local}`, 47, 102);
     doc.text("Período de: " + moment(`${this.relatorioFinal.periodoDe}`).format('DD/MM/YYYY') + " a " + moment(`${this.relatorioFinal.periodoAte}`).format('DD/MM/YYYY'), 120, 102);
     doc.text("3. Área da Atividade: ", 12, 112);
     doc.text(this.relatorioFinal.areaAtividade != undefined ? this.relatorioFinal.areaAtividade : "" , 52, 112);
     doc.text("4. Total de horas cumpridas: ", 12, 122);
     doc.text(this.relatorioFinal.totalHorasCumpridas != undefined ? this.relatorioFinal.totalHorasCumpridas : "" , 65, 122);
     doc.text("Sorocaba,", 70, 140);
     doc.text("de", 100, 140);
     doc.text("de 20", 130, 140);
     doc.text("____________________________________", 68, 155);
     doc.text("Assinatura do Aluno(a):", 85, 161);
     doc.text("Parecer do Coordenador do Curso:", 12, 180);
     doc.text("(  ) Defiro a solicitação;", 12, 187);
     doc.text("(  ) Indefiro a solicitação: Motivo: ", 12, 194);
     doc.text("____________________________________", 76, 194);
     doc.text("Assinatura: Coordenador do Curso: ", 12, 210);
     doc.text("___________________________________", 79, 210);
     doc.setFontSize(10);
     doc.text("www.fatecsorocaba.edu.br", 85, 280);
     doc.text("Av. Eng. Carlos Reinaldo Mendes, 2015 - Alto da Boa Vista - Sorocaba - SP", 50, 285);
     doc.text("18013-280 - Tel.: (15) 3238.5260 - Fax: (15) 3228.2443", 68, 290);

     //Retângulos - (x, y, largura, linha) x = distancia horizontal, y = distancia vertical
    doc.rect(12, 78, 185, 15);

    this.resetaValoresImpressos();

    doc.output("dataurlnewwindow");

  
}


  validaAtividadeEstagio(): String{
    if(this.valorImprimirEstagiario == undefined || this.valorImprimirEstagiario == ""){
      return "";
    }

    return this.valorImprimirEstagiario;
  }


  resetaValoresImpressos(){

    if(this.tipoAtividadeImpressao.includes("Estagiário")){
      this.tipoAtividadeImpressao = "";
    }


    this.tipoAtividadeEstagiarioImpressao = "";
  }

  concatenaStrings(){
    

    if(this.tipoAtividadeEstagiarioImpressao != undefined){
      this.tipoAtividadeImpressao = `${this.tipoAtividadeImpressao} ${this.tipoAtividadeEstagiarioImpressao}`;
    }

    if(this.tipoAtividadeImpressao == "outros " && this.relatorioFinal.especificacaoOutros != undefined && this.relatorioFinal.especificacaoOutros != ""){
      this.valorImprimir = `${this.valorImprimir} ${this.relatorioFinal.especificacaoOutros}`;
    }

  }

  atribuiAtividade(valor){

    this.tipoAtividadeImpressao = (valor.srcElement.value).toString();

    this.verificaAtividadeImpressao();
  }


  verificaAtividadeImpressao(){

    switch(this.tipoAtividadeImpressao){

      case "estagiario": {
        this.valorImprimir = "Como Estagiário,"

      } break;

      case "profissional-liberal": {
        this.valorImprimir = "Como Profissional Liberal, com declaração assinada pelo Contador, especificando ser a área inerente ao" + "\n" + "curso, informando a Inscrição no respectivo Conselho de Classe, e comprovante do cadastro da Prefeitu-" + "\n" + "ra Municipal (no caso de prestador de serviço)."

        this.valorImprimirEstagiario = "";

      } break;

      case "empresario": {
        this.valorImprimir = "Como Empresário, com declaração assinada pelo Contador, informando a Razão Social, CNPJ e ramo das" + "\n" + "atividades desenvolvidas pela empresa, ou declaração de firma individual."
        
        this.valorImprimirEstagiario = "";
      } break;

      case "vinculo-empregaticio": {
        this.valorImprimir = "Através de Vínculo Empregatício, comprovada através de registro em carteira Profissional e com Declara-" + "\n" + "ção da empresa, das funções desempenhadas."

        this.valorImprimirEstagiario = "";
      } break;

      case "outros": {
        this.valorImprimir = "Outros: ";

        this.valorImprimirEstagiario = "";
      }

    }
  }

  atribuiAtividadeEstagiario(valor){

    this.tipoAtividadeEstagiarioImpressao = (valor.srcElement.value).toString();

    this.verificaAtividadeEstagiarioImpressao();
  }


  verificaAtividadeEstagiarioImpressao(){

    switch(this.tipoAtividadeEstagiarioImpressao){

      case "setorPrivado": {
        this.valorImprimirEstagiario = " realizado no setor privado (indústria/comércio/serviços)";

      } break;

      case "organizacaoTerceiroSetor": {
        this.valorImprimirEstagiario = " realizado em organizações do 3. setor (ONG's)"

      } break;

      case "orgaoAdmPublica": {
        this.valorImprimirEstagiario = " realizado em órgãos de administração pública"
      } break;

      case "ativExtracurricularesFatec": {
        this.valorImprimirEstagiario = " realizado em atividades extracurriculares sob supervisão da Fatec Sorocaba"

      } break;

    }
  }





















  imgData = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4RDgRXhpZgAATU0AKgAAAAgABAE7AAIAAAAHAAAISodpAAQAAAABAAAIUpydAAEAAAAOAAAQyuocAAcAAAgMAAAAPgAAAAAc6gAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGZlbGlwZQAAAAWQAwACAAAAFAAAEKCQBAACAAAAFAAAELSSkQACAAAAAzgyAACSkgACAAAAAzgyAADqHAAHAAAIDAAACJQAAAAAHOoAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAyMDE5OjEyOjA3IDIxOjQ2OjQxADIwMTk6MTI6MDcgMjE6NDY6NDEAAABmAGUAbABpAHAAZQAAAP/hCxlodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvADw/eHBhY2tldCBiZWdpbj0n77u/JyBpZD0nVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkJz8+DQo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIj48cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPjxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSJ1dWlkOmZhZjViZGQ1LWJhM2QtMTFkYS1hZDMxLWQzM2Q3NTE4MmYxYiIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIi8+PHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9InV1aWQ6ZmFmNWJkZDUtYmEzZC0xMWRhLWFkMzEtZDMzZDc1MTgyZjFiIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iPjx4bXA6Q3JlYXRlRGF0ZT4yMDE5LTEyLTA3VDIxOjQ2OjQxLjgyNDwveG1wOkNyZWF0ZURhdGU+PC9yZGY6RGVzY3JpcHRpb24+PHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9InV1aWQ6ZmFmNWJkZDUtYmEzZC0xMWRhLWFkMzEtZDMzZDc1MTgyZjFiIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iPjxkYzpjcmVhdG9yPjxyZGY6U2VxIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+PHJkZjpsaT5mZWxpcGU8L3JkZjpsaT48L3JkZjpTZXE+DQoJCQk8L2RjOmNyZWF0b3I+PC9yZGY6RGVzY3JpcHRpb24+PC9yZGY6UkRGPjwveDp4bXBtZXRhPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8P3hwYWNrZXQgZW5kPSd3Jz8+/9sAQwAHBQUGBQQHBgUGCAcHCAoRCwoJCQoVDxAMERgVGhkYFRgXGx4nIRsdJR0XGCIuIiUoKSssKxogLzMvKjInKisq/9sAQwEHCAgKCQoUCwsUKhwYHCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq/8AAEQgArgOjAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A+kaKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAoqJrq3RirzxqR1BcCkF3bMQFuIiTwAHHNA7MmooooEFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRUFte2920628gdreUxSjBG1gAcc+xFAE9FFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAVxvxalkh+FuryQu0bjycMpwR++Suyrivi//AMkp1j/th/6Pjpx3QpbHzX/ad/8A8/tx/wB/W/xoGqX46XtwP+2rf41Vro/Bfgy78bapPY2NzDbvDCZi02cEbgMcA+tdWiObVmSNZ1Rfu6jdj6Tt/jTx4g1lfu6tfD6XL/416P8A8KA1z/oLaf8A+P8A/wATR/woDXP+gtp//j//AMTU80SuWR52PE2ur93WtRH0un/xp48WeIl+7r2pj6Xkn+Neg/8ACgNc/wCgtp//AI//APE0f8KA1z/oLaf/AOP/APxNHNEOWR6x8PLme8+Huj3F3NJPNJBl5JXLMx3HqTya6Ssfwlo03h/wnp+lXMiSy2sWxnjztJyTxn61sVzvc3WwUUUUhhRRRQAUUUUAGaK+WfiVNLH8Sta8uR1/0j+FsfwipPh5q+pN4+0W3bULowtdIGjMzbSPcZxWvs9LmfPrY+oqKKKyNAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACuD8afFvQvCTvaRH+0tRXg28LYWM/wC2/QfQZNcn8WfixLYTy+HvC84WZQVu7xDkoe6Iex9T26DmvCSSSSTknqa5ateztE+pyzJPaxVbEbPZd/U9A1v41eLtWkItbqPTYc8JaoM/ixyfyxXH3XiDWb6QPeatfXDgYDS3DsQPxNZ1bOl+EPEOsx+ZpejXtzHjIkSE7T9D0NcjlKTPqo0MNho6RUV8vzMhnZ2LOxZj1JOc1q+FD/xWWjf9f8H/AKMWuhX4OeOWUEaJjI73MQ/9mrQ0H4S+NbDxHpt3caNtit7uKV2+0xHCq4JP3vQU1TnfYyqY3CuDSqR27o+l6KKK9Q/MQooooAKKRmVFLOQqjkknAFZ1x4j0S0mMV3rOnwSAZKS3SKfyJovYqMZS+FXNKiqNprelX+77Dqdnc7SA3k3CPgn6Gr1ApRcXZoKKKKBBRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFcTr+qaDrniSPRLa7K63aBnjuY8bbU4z8xJwc4AIGT9OaTaW5LlGO7OruL+FA8UM8TXIIQR7xlWbgZH61xulauul/E/VNMdtttchNueiusSnOfcZyfpVG08Q+Lra6OnX+lLqhYA+ZEmCR0DCRRt6gkEjr9MVi/8ACXHTPEF7rTaQ0l3dHZBPK+6NVVQjEFOGJK84xjgDrTKPYoZ4riJZbeVJY2+66MGB/EU+vOdJh1HxbapfeJLtItNVvMisYUVDN1xj+IA545yeMdjXZaB4h0zxJp4u9IuBKgO10Iw8Z9GXsaV1ewuZXtc1KKKKYwooooAKKKKACiiigAooooAKKKKACiiigArivi//AMkp1j/th/6Pjrta4r4v/wDJKdY/7Yf+j46cd0KWzPmGvVPgD/yOGo/9eB/9GJXldeqfAH/kcNR/68D/AOjEron8JhHc9/ooormOgKKKKACikZgilnIVVGSScACvCPiB8Y7y7u5dN8JTm3s0O17xBiSU99p/hX36/SqjFy2E5JHtWo63pekKDqmo2tmD08+ZUz+ZrBb4oeDEcqdegJBwcI5H5hea+W5p5rmZpbiV5ZGOWd2LEn3Jpla+zRl7Rn1hZfELwnqD7LbXrPdkKFlfyySfTdjNdDHIksayROrowyrKcgj1Br4urovCnjfWfCN8kunXLtbbgZbR2zHIO4x2PuOaTp9hqp3PrGqcmsaZDK0c2o2kciHDK06gqfQjNVvDXiKy8U6DBqunE+XKMMjfejYdVPuP8DXzB45mE3j7XHQ5U30uD/wI1EY3dipSsrlj4kTRz/EXWZYJFkjafKujAg/KO4qL4fyxw/EHRZJnWNFukLM5wAPc1ztFdFtLGN9bn2J/buk/9BSy/wDAhP8AGpIdW065mWK3v7WWRuiRzKxP4A18b5Ndr8Ij/wAXS0n/ALa/+inrJ07I0VS7Pp6iivFviJ8Y5oLubSPCTqvlkpNfYySehCf/ABX5etZKLb0NG0tz17UNW07SovM1O+t7RMZzPKqZ/OsGb4l+DoJvKfX7Ut6pudfzAIr5bury5vrhri9uJbiZzlpJXLMfxNQ1r7NGXtGfXlj4s8P6lKI7DWrC4kOMIlwpbn2zWvXxYDjpXaeDvifrfhW4SOSZ7/TujWszk7R/sE/dP6e1J0+w1U7n0/RVLR9WtNd0i31LTpRLb3CBkPceoPoQeCPartZGoVS1DWdM0lN+qahbWanoZ5VTP5mvMvin8U5dFuJNC8OSbb1cfaboYPk/7K/7Xqe316eF3V3cXtw9xeTyTzSHLySMWZj7k1pGm3qzOU7bH1NJ8SfB8U4ibX7Qt6qSy/8AfQGP1rSsfFWgalL5dhrVhcScfJHcKTz04zXyFQDjpV+zRPtGfadFfLPhb4k+IfC0yCG7e7swQGtLhiykeik8r+H5Gvorwl4s0/xhoqahpzbWHyzQMfmhf0P9D3rOUXE0jJM3KKKKgoKKKKACiiigAooooAKKKKACiiigArifir4xPhDwe72j7dQvSYbb1X+8/wCA/Uiu2r5m+N+utqvxCls1bMGmxrAoB43EbmP1ycf8BrGtPlhoetlGFWKxSjLZav8Ar1POmZnYs5LMxySTkk1c0fSL3XtWt9N0uEzXNw21FH6knsAOSapV9D/ArwjHp3h1vEN1EDd3+VhLDlIgccem4gn6AVw04c8rH3GYYxYOg6nXZepq+B/hBo3hiGO51SOPVNT6mSRcxxn/AGFP8zz9K9CACqAoAAGAB2paK9KMVFWR+cV8RVxE+erK7CiiiqMAooqrqepWmj6ZPqGozLBa26F5JG7D+p9qBpOTstx1/qFppdjJeajcx21tEMvLK21VrxTxd8fJTK9r4PtlSMcfbblclvdU7fjn6VwnxA+IWoeNtVfLvDpcT/6Na54H+03qx/ToK46uGpXb0ifbZfkdOnFVMSry7dF/n+Rrav4o1zXZWfVtVurrP8LynaPovQfgKys1f0nQtV124MGj6fcXkg6iGMtt+p6D8a7K0+CHjS5QtLZ29tjoJrlcn/vnNYKMpapXPcnXw2GXLKSj5aL8Dz4MQQQSCOhro9C+IPifw7Ip07V7jy1P+ombzIz7bWyB+GKv6j8JvGmmRtJLoskyKT81s6y598Kc/pXIT281rM0NzE8MqnDJIpVgfcGlaUH2GpYfFRsmpr5M+hPBfxx07WJI7LxNEum3bEKtwp/cuffPKfjke4r1ZWDKGUgqRkEHrXxDXrHwn+Kcmhzw6Br8pfTJGCW87Hm2JPQ/7H8vpXVSr62kfNZlkcVF1cKvVf5f5H0PRQDkZHSvPPjF40l8K+F0tdOk8vUNRJjjcHmNB95h78gD657V1Skoq7Pl8PQniKsaUN2R+N/jJpHha4ksNOjGqagnDqj4jiPozc5PsPxIryfVfjV4y1FmEF7FYRt/BbQgY5/vNk/rXAEkkknJPU0scbyyBIkZ3boqjJNefKtOT3P0DDZRhMPHWPM+7/qx0F18QPFt4QZvEWo8dPLuGT/0HFV/+Ey8T/8AQxar/wCBsn/xVN/4RLxH/wBC/qn/AIBSf4Uf8Il4j/6F/VP/AACk/wAKj3zsUcKlZKP4Dv8AhMvE/wD0MWq/+Bsn/wAVR/wmXif/AKGLVf8AwNk/+Kpv/CJeI/8AoX9U/wDAKT/Cj/hEvEf/AEL+qf8AgFJ/hR7wWw3938B3/CZeJ/8AoYtV/wDA2T/4qva/gLq+patpustqmoXV60csQQ3EzSbchs4yTivEv+ES8R/9C/qn/gFJ/hXtfwE0rUNL03WV1OwubNpJYiguIWj3YDZxkc1rR5udXPJzj2H1KfJa+m1u6PXKKKK9A+CCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAqO4uIrS1luLlxHDEhd3PRVAyTUleReIPHh8R67qnhuKWG10xIJ4Xlb5mnfbhcHt84H4Zz7Z1KkaavIyqVVTsur0XqY0nxP1rV/FlzNaTi30mFZFjV28tEBUqHkYc5BIPfB6DiuRtPAHijUpmextEuwz/PLDcK6hiA3zHPBwRwT/ACrHFjdKq6cZ3ZlkH7uJAA7tggY5JPzYruNJ8R+IvCkKaDDr+k2EkRJeCfYWjYnJEjhCqtyOCa8unerJubuvI2lkGIlThKvJLm1vza626Wdkjur+91S10ODw1YWsX9sTxKlwlhCY1t4lXG0HPc5w3AwT7Vb/AOEMc+B49L1JUju4Waa3uFOVjZudjHsD0J6dDnpXnl1418Z+GrpYbgwWcl6rXWVt4SZRuwXJAOcnoc8jpxipG+JXjWGW3S7v0tluUWSOSW0TBjYkB+FJxwfyrv8ArEI6O568MmxEoKUHFrXre9t/Ud4l8K67rfhyw1DSbZHl0sSW93HCf9IBVty5JPzAKRgDoOnbHLeCbrWLDUdVtrQTQpdWciSMwKKHCnaf9ltwGOeOfU16NqV94z8Nog1PxHoNiL0s6Bo1AmIABPEfPBX9K8717wxregyreXb+Tb3xLxTWTo0DFhyFKjA4JGOMj2rmrppucNGeZHI5166nTknfztf0uj0P4Y/E6/1HWF8PeIn+0SONtvc7cMcDgN65APPXPXOePYK+RdCvNR0nxd9v09y8tnEs3mPHuA5I5wOhGfzr6G+G3jv/AITTSJPtSRx39rhZgjcSDkbgO3IOR/jW2HrX9yT1OGMauFqvCYl++vx+Z2lFFFdh0hRRRQAUUUUAFFFFABRRRQAUUUUAFcV8X/8AklOsf9sP/R8ddrXFfF//AJJTrH/bD/0fHTjuhS2Z8w1oaPr2p+H7l7jRryS0lkTYzxnkrkHH5gVn1f0jQtT1+5e30eylu5Y03skQyQuQM/mRXUcxs/8ACyvGP/Qfu/zH+FH/AAsrxj/0H7v8x/hSf8K38Yf9C/ef98Uf8K38Yf8AQv3n/fFT7pXvDh8TPGQ6a/dfjt/wrrPhr478T618QNNsNT1ia4tZTJvjZVw2I2I7eoFcj/wrfxh/0L95/wB8V1fwy8E+JNI+Iem3upaPc21tF5m+V1wFzGwH6kUny2Gua56Z8W9Vk0r4cXxgfZJclbYHuQx+YD/gIavmGvr7xF4c07xTpf8AZ+sRNJb+YJAFcqQwzg5H1Ncqfgv4MAJNpcADqTctUQkki5RbZ538I/h3aeJ/P1fXEMtjBJ5cUIYgSuME5x2AI+ua9pj8G+GYoljTw/pm1RgZtEJ/MjJrNsNV8G+CNKj0m31izt4YnbEbXIdwScnOMnv3qRviV4OU4Ov2v4bj/Spk5NjSSRz3jD4O6Hqmlyy+H7VdP1GNSYhGxEchH8LA8DPqK+dnRo5GSRSrKSGB6g19Vj4k+Dz01+0/En/CvmrxZLaTeMNWl011ktZLuR4nU5DKWJyK0g3syJ26HofwF1x7fXr3RZH/AHV1F58YJ/jXg4+qn/x2vU7r4c+Er2SaS40S3aSZizuCwYknJOQa8E+E1xJb/E7SfLIHmM6NkdijV9Q1E9JaFQ1R8l+OdMtNG8b6pp+nReVbQTbY03FtowD1PNN8FWFtqnjbSrK/iE1vPcqkkZJG4enFXfib/wAlK1r/AK+P/ZRS/DBA/wATNFB/57k/krGtvsmX2j3f/hVHgv8A6Aif9/pP/iquaT8PfDGh6nFqGl6WsF1DnZIJHOMgg8E46E10tFc3MzosjiPiz4kk8O+Bp/ssnl3V6wtomB5UEEsR+AIz6kV8x17V+0JM4Ggwhz5beexXsSNgB/U14rW9Ne6Yzep6x8LfhZaeIdO/tvxEHa0ditvbKxXzMHBZiOcZ4AHp+fr1v4H8L2sPlReH9O25z89srn8yCa53wj448JaX4M0izk1q0gkhs4xJGznKvtBYH8c1s/8ACx/CH/QwWf8A30f8KzlzNmkeVI5bxr8G9H1DS5rnw1b/AGHUIkLJFGx8ubH8OD0PoR+NfPjKVYqwwQcEHtX1Z/wsfwh/0MFn/wB9H/Cvmvxg9pL4y1aXTZEltZLp3ieM5UqTnj86uDezIml0PUPgFrzltR0KZ8qFF1ApPTna/wDNa9a17VF0Xw9f6k4yLWB5QPUgcD88V8+fBSaSL4lW6I2FlglRx6jbux+aivWvjFd/Zfhlfr8wNw8UQIOP4wT+imokveKi/dPmm5uJbu6lubhzJNM5d3bqzE5JrrPh14Dk8b6xJHLK1vYWqhriVR8xz0Ve2Tg/QCuPr6I+BVitv4EmuflL3V27Egc4UBQCfqCfxrWTsjOKuzZsfhP4NsY9o0dZyQAXnkZycd+uB+AFZPiv4NaDqemzSaDbjTtQVcxbHPluR/CVJ4z6j1716RRWHMzflR8XSxPDM8UqlXRirKexHUV3vwa12TSfH1vaGQi21FTBIueN2MoceuRj/gRrrPFHwT1TWfFOoalp99YwW91MZVjkL7gTyc4B75pfC3wX1jQvFWnanc6jYyQ2swkdYy+4gdhlRWzlFoxUWmez0UUVzm4UUUUAFFFFABRRRQAUUUUAFFFFABXxz4vuJLrxrrM0xBdr6bOBj+M19jV8deMbZ7TxtrUEuCy302cf75rkxOyPquG7e1qeiMWvs/QbAaX4d06xUKBbW0cXy9CQoBr4wr7P8P341Tw3p1+pU/abWOQ7emSoJ/Wpw27OjiTm5Kfa7/T/AIJoUUUV2nxoUUUUAFeAfHfxi97qyeGbKQi2tMSXW0/flIyFPsoP5n2r3q6uEtLSa4lzshRpGx6AZNfGOq6hLq2sXeoXJzLdTNK31Y5rmxErRt3PpOH8Mqld1pfZ29WU67z4Y/DiXxvqL3F4Xh0i2bE0q9ZG67F98HJPYfUVxFtby3l3FbW675ZnCIo7sTgCvsPwtoFv4Y8M2Wk2oGLeMB2A++55Zj9TmuejT55a7HvZzj5YSio0/il+HmW9L0mw0WwjstKtIrW3jGFjiXA+p9T7mrlFFeifn0pOTu9wrD8S+DtD8WWhh1mySVsYSdRtlj+jdfw6VuUUmk1ZlQqTpyUoOzPkvx94EvfA2tC2nYz2cwLW1yFwHHcH0Ydx9DXKV9b/ABE8LJ4t8F3liEBuo1M1q2ORIo4H48j8a+SSCrEEYI6151anyS02P0PKcc8ZQvP4o6P/ADPpL4J+MG1/wu2lX0u+90wBFJPLw/wn3xjH5V578fb15/H0FsdwS2skABPBLMxJA/ED8KwPhVrh0L4jabIz7Ybp/ssuem1+Bn6NtP4V2v7Qujyrqml60oJhkhNq5A4VlJYfmGP/AHzWjk50fQ8+GHhhc3TW002vXr/XmeMV9E/AbQrCDwg+siFWvrid42mYZKouAFHoOpPr+Ar52rtvh58Sb7wLcyRGL7XptwwaW3JwVbgb1PrgdOhrKlJRndnqZrh6uJwrp0t/z8j6porkfD/xP8KeIlVbbVI7aduPIuz5TZ9Bng/gTXWqyuoZCGUjIIOQa9JST2PzqrRqUZctSLT8xaKKKZkFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAZfid7mPwnqz2AzcrZymIY/i2HHWvmDw9J5X26/MbEAPDvbOELgx/+gluK9p+MfiXVPDtro8mku0ObhpXlXoNuAAexGHY4PpXKLLpUVpLeoYo9OvkGoXVtCdxUErFKm3I/jJIDEgdsc15mMqNO8Fdq34/ojz6kadevyyly8qv+F/8AI5TwhrlvaeNbTVtTRfs8V2xYIOIxyoIA7Lxx7d67nxT8Kpb6a413wfcxX1vfSNcm23gEl+SUfowJJODj6mvN/Dumx65rlvpmnt9nju7ho4WkO/aMEgse545P6dq1NI8R694L1OWG0nktnikKz2kvzRlgeQV/qMH3qIySi1UV4t7+Z+j4ahUnRw9XC1LVVTjo9mrf5/psZt4l8NRsdO1SGWE2K/ZvKmBV0V5A23HUDk4+vHFdr8TXtzqNxZiPbJp88awFeiwvGRs+gMQIHbLetXviDrNp4k8F+F9eNoLXULjUlhVCfmMYLb8HjcuVUg1lfEv/AJG7V/8ArpbfylrolDlpy1vscdLEOrjKC5eVpyuul+tjX+NHC+Gf+vab/wBpUkUiQfs6XA1INiacrZhzgljKNhX2yCfoDVz4uajJYL4bEVvZSkwysGurRJipHlfd3A46/oK801fXtV1+WJ9XvpLhYRiGEAJFCMY+VFAA44z17VFWcadST622Nsvw1fF4KlTSSipXvfXRvZDNEKT/ANvWUTTJfTWsL25jOAwRnLqfqvP4Y710Hwbllj+JKiJJCssbrKFfAHyZyQeoyBx649K57w3pFjrviO4sJ9RWwvnjiNm8yZikbL/IxHIyduDyOvfFbEXilfC2tvPolukd7PdIb2UbstjG6IBh8qlgSR16c4HPJC8Kqk1pbf0tufGZ9ZZnVrTduWVvlvt67+qPpSioracXNpFOqlRKiuAeoyM1LXuFBRRRQAUUUUAFFFFABRRRQAUUUUAFcV8X/wDklOsf9sP/AEfHXa1xXxf/AOSU6x/2w/8AR8dOO6FLZnzDXqnwB/5HDUf+vA/+jEryuvVPgD/yOGo/9eB/9GJXRP4TCO57/RRRXMdAUUUUAZviDXbPw3oVzqmotiGBc7R1duyj3Jr5p8W/EXXfFty32m4a2s+iWcDEIB/tf3j7n8MV337QGqyB9J0lGYRkPcyDsx+6v5fN+deLVvTirXMZy1sHWp7eyurtylrbTTMOSsaFj+lfSfgT4daJoWg2c9xYwXeozRLJNPMofDEZwueABnHHWu4CgdAB9BSdTsCpnxpPZXVq+26tpoWPaRCp/WoCMda+z55YbeB5rp44ooxlpJCAqj1JPSvkvxnd29/421e6spVmgmu5HjkXowLHBFVGXMKUeU0vhb/yU7Rv+urf+gNX1NXyz8Lf+SnaN/11b/0Bq+pqipuXT2PlH4jSeb8RtbYf8/TL+XH9Kk+Gcnl/ErRG/wCnjb+akf1pPiTGIviRraqMD7SW/MA/1qDwBNHb/EHRJJmCILyMEn3OBWn2TP7R9ZUUUVzHQeH/ALQaMNQ0NyfkMUwA9wVz/MV45XuX7QNi0mmaNfjdthlkhbA4+cAjn/gBrw2umHwnPP4jag8G+Jbm3jnt9C1CWGVQ6Ols5DKRkEHHIqT/AIQfxT/0L2pf+Ar/AOFfSXw+v4tR+HuizQkYW0SEgHOGQbD+q10dQ6jTLVNWPkn/AIQfxT/0L2pf+Ar/AOFIfBPicdfD+pf+Ar/4V9b15jffHXw9Z389stjfTiGRk82MJtfBxkfN0oU5PZCcEt2cT8JfDWt6b8RLO41DSb22gWOUGSaBlUZQgckV6B8b/wDknL/9fcX9an8K/FrSfFmvxaTZWF7DLKrMHmCbRtBPZj6Va+LVkb34ZaoFQO8ISZcnGNrgk/8AfOalt8yuUkuV2Pl+vpP4Kf8AJNYP+viX+dfNle9/APVEm8M3+mNITLbXPmqpPRHUDj8VP51pU+EiG56xRRRXObhRXzt44+J3iFPGmpQ6Jq8lvYwSmGNIwuPl+UnOO5BNL4B8a+LNc8e6VY3Os3E0Mk2ZY2YAMqqWI6egNaezdrkc6vY+iKKKKzLCiiigAooooAKKKKACiiigAooooAK+afjlobaX8QGvlXEOpRLMD/tqNrD9Af8AgVfS1cV8U/Bx8YeD5I7VAb+zJntuOWOPmT/gQ/UCsq0OaGh62U4pYXFKUtno/wCvU+Va+hfgT4uTUNAfw7dyAXVjl4AerxE5P5E/kRXz46NG7JIpVlOGUjBB9Ks6Zqd3o+pwahp0zQXNu4eN17H/AA9q4Kc+SVz7nH4OOMoOm9916n2pRXnHgf4xaN4jt4rXWpY9M1TGGEh2xSn1Vj0+h/DNejKwdQyEMpGQQcg16UZKSuj84xGGq4efJVjZi0UUVRznM/Ea7+xfDfXZQMk2bxjB6b/lz/49XyNX1b8WpfK+Fus5/iRF/ORa+Uq4cT8SPuOHI/7NN/3v0R2vwi01dS+J2lrIMpbs1wflzyikj6fNivqqvnT9n+B38eXkyj5I7Bwx9y6Y/ka+i62w69w8jiCbli1HskFFFFdB88FFFFABXyD4808aX4/1q0RCiJduyKeysdw6exFfX1fJ3xTuVu/ihrkiAgCcR8+qIqn9VrlxPwo+n4cb9vNdLfqcrBM9tcRzwnEkbh1OOhByK+wtZ0aw8Y+FGsb795b3kKusigZUkZV196+Oq+ztAgktvDWmQTLtkitIkcehCAGow2t0zs4ibh7KpF2ab/Q+VvGXgPWPBeoGLUYTJasxEN3GMxyDt9D7H9etczX2zd2lvf2sltewR3EEg2vFKoZWHuDXmHiT4DaHqTNNoNzJpUx58sjzIj+BOR+f4UTw7WsSsHxBTklHEqz7rb/gHzrWvpPirXdCbOk6td2o/uJKdp/4D0/Sul1z4N+L9GDPHYrqMK/8tLN95/75OG7elcTc2lzZTNDeW8tvKpwUlQqw/A1zNSi9dD6CFXD4qPutSX3np+i/H3xFZMq6xa2upR92C+TIfxXj/wAd7V6Z4c+MnhbX2SGa4bTLljgR3eApPs44/PFfL1Faxrzj5nnYjJcHWWkeV+X+Wx9vKwdQykMpGQQetLXyz4C+KOreDbiO3md73SScPau3Ke6E9D7dD+tfTelapZ61pdvqOmzLNbXCB0cfyPoR0I7GuynUU1ofHY/LauCl72sXsy3RRRWp5gUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAeb/GrQn1jwrFJbNuuLVmcQDlpEIG4geq4B6HjNeJPHfSeG1ktfOmt7hVS4Tb/AKoqxA46hfmbnoSD6V7V8bJ72w8PaZqWnySRSWt4D5sb7WUlT6HPQGvNb/WrjUdFkmt5IxI0bvfjy1Q/fXBUgc5LkkD/AGuOpPk4ty9p7i9fQ8fEex9rNzumlpbrt/T8jD0H7daXwn0Ms1zaF5Y3jTcY8KQWwR2z6da2G8c69LGgvP7K1KRV2efqOmpNKV9CwxkVc+FMhht9U8lVMygSCU8MeT8vQ/eJBxznHSqXjKOP/hInureORLe6jSSNpIjHvIG12wf9pW6cenFD56dPni+p+l5W8PilSw9anqqcLSu7/Cnb8fwM+81S+1vXLa91W48+VHSOJFQJHAm4fKiDhR+p7k11vxGk8nxpqkvlxy7JrZtkgJVsCXg4IOPxriLf/j8t/wDrsn/oQrtPiZ/yNusf79t/6DLVU5ylSnJ7nRjMPSpZhh6UFaOuxi+J/GeqeLYrVNUhsENqxMclvCysFOMry5GDgdu1Z2n6Td6pDeyWUfmfYoPPlUddmcH9Mn6KfSqROBk17F4d07/hGPDP2fUvIjkjJu7iWVflRX2qR8w5IUsMDv6986cXXnebO3GVqeU4dQw0dW9Fdv1/rzPDRLJB4iW4twDKgiCZGcklsD8wK2NZgkvvGDRxxhp7y6adEA5O85XjsTuAweat+GrzT5fFepaXf2cU1pfQCRXcYaAxl2Rg3GOuCOhHXpWh4h1mPSRD/ZUcceo3duBLdOp85Y2HyxAknZ8pyduDhscd8pX54rpb/I/MeIKNOWMr1Zys+ZafLU+itKtJLDR7O0mlM0lvAkbyE/fKqAT+lW6y/DMk0vhTSnuk2TNaRF1xjB2jt2rUr3FsaRacU0FFFFMoKKKKACiiigAooooAKKKKACuK+L//ACSnWP8Ath/6Pjrta5L4pWN1qXw11W00+3kubiTydkUSlmbEyE4A9gTTjuhS2PlmvVPgD/yOGo/9eB/9GJXCN4O8Sofm8P6n+FnIf6V6T8D9E1XTPFd/LqWmXlnG1kVV7i3aME704BI68V0Sa5TCO57jRRRXMdAUUUUAeN/H7RZJLXTNZiQlYS1vMw7A8r+u78xXiFfY+raVaa3pVxp2oxCW2uEKOp/mPQjqD6187eLfhHr/AIfuHk06CTVbDPySQJukUejIOfxGR9K2hJWszGcXe51ngn406dp/h+10zxFb3Cy2sYiS4hUMroowMjIIOAB3zVrV/j9YRwldC0qeaXHD3ZCKD9FJJ/MV4odOvQcGznB/65mtrQvAPiXxDIo0/SpxE3/LedfLjA9dx6/hmq5Y7iUpbDfE3jnXvFk2dWvWMAOVtovkiX/gI6n3OTXPV7/4Y+Buk6eizeI5m1K4xzChKRL+XzN9ePpXmHi7wdq8fjDVU0rw/f8A2NbpxB5Fm5TZnjaQMYpqS2QnF7sZ8Lf+Sm6N/wBdm/8AQGr6mr5s+G3hvXLL4i6RcXmjahbwpKxeSW1dVX5G6kjAr6TrKpuaU9j57+OehSWXi+LVlQ/Z9QiALdhIg2kfltP515irFWDKSCDkEdq+vvEXh7T/ABRosumarGXgkIIZThkYdGU9jXhHiH4J+ItLmd9IEeq2o5UxsEkA91PU/QmrhNWsyZRd7om0b46a/p9rDb6haW2orENplcskjjHGWHGffFdl4O+McvirxXZ6O+ipbC53/vRcltu1C3TaPSvGp/Bfia3maKTw/qW5eu21dh+YGK6z4V+G9bsviRplze6Pf20Efml5ZrZ0VcxMBkkY6kUOMbCUpXPafHvhv/hKvBt7p0YH2jb5tuT/AM9F5A9s8jPvXyjLE8EzxTIUkjYqysMFSOoNfaNecfEH4TWviqZ9T0mRLLVCPnDD93OfVsdD7/nUQlbRlzjfVHlPgH4l3/gkvbNCL3TpX3vAW2sjd2U9vp3x2r1ez+OPhO4j3XH221YY+WSDdn6FSf6V4nrPgLxNoLsNQ0i48tes0SeZHj13LkDr3rCe3mjkEckTo56KykE1o4xlqZqUo6HtHjT43WdzpNxp/heGcyzoY2u5hsCAjkqOpPXrjHvXidadh4a1vVJvK0/Sby4bODshYhfqcYHTvXpPhT4F391Ilx4qmFnBnJtYWDSN7Fui/r+FP3YoPekxfgN4ell1i816aPEEEZt4WI+87YJI+gGP+BV7dqFlFqWm3NlcDMVzE0Tj2YYP86bpum2mkadDY6dAtvbQLtSNBwB/U+9WqwlK7ubRVlY+PNe0a58P67d6XeriW2kKE44YdmHsRg/jUvhzxJqPhbWE1HSJRHMoKsrDKup6qw7ivozx98OrDxtarJv+y6lCu2K5AyCP7rDuP5fpXhWtfDLxXoczLLpM11Hn5ZbNTKrflyPxAraMlJamTi0z0Kz/AGgofsy/2hoT+ePvGCcbT78jI+nNZXiX4632oWL2ugWH9n+YpVriR97jP90YwPrzXl/9nXo62k//AH7NSW+i6pdzCK1067mkIyEjgZj+QFPkiLmkUiSSSTknqa9i+A3huSS+vPEM6YiiQ29uT/ExwWI+gwPx9qyvCfwV1rVbiObxCp0yyByyEgzOPQDnb9T+Ve+aZptro+mW+n6fEIba3QJGg7D+p96iclayKhF3uy1RRRWJsFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAeM/Fn4UPfyy+IfDEAM5Be7tEHMh7ug/veo79evXwcgqxDDBHBB7V9vVwvjT4T6F4vZ7pQdO1JuTcwKMOf8AbX+L68H3rlq0Lu8T6jLM79jFUcRqls+3qfLVamm+Jdb0cr/ZerXlqFOQkU7Kufdc4NdXrvwZ8W6M7Nb2a6lAOklo24/ihw36GuNudH1OykaO8066gdRlllgZSB7giuNxlF6n1kK+HxMfdkpL+uh09t8XfG9rEUTXHcZzmWGNz+bKTVpfjV43VcHU4mPqbWP/AOJrg1Rnbaqlj6AVP/Z16elpP/37NPnn3IlgsI3rTj9yOi1z4l+KvEWlS6bq2pCa0lILxiCNM4ORyFB61ylSSwywNtmjeNsZw6kGo6ltvc6KVKnSjanFJeRs+HPFms+E7mafQbsW0k6BJGMSvkZz/EDXQ/8AC5vHP/QZX/wFh/8Aia4WimpySsmZ1MLh6suacE35pHdf8Lm8c/8AQZX/AMBYf/iaP+FzeOf+gyv/AICw/wDxNcLS0/aT7kfUMJ/z6j9yPsrwvez6j4R0m9vH8y4ubKGWV8AbmZAScDgcmtSsPwV/yIWg/wDYOt//AEWtbM88VtA81xIkUUalnkdgqqB3JPSvUjsfmVZWqyS7sq6zqtvoei3ep3rbYLWJpG5646D6k4H418a6heSajqVzez/624laV8erHJ/nXpfxd+JkfiaUaJoUhbTIH3SzDj7Q46Y/2R+p57CvLK4K9RSdl0PuckwMsNSdSorSl+CNLw9pb634j0/TY1LG6uEjIGehPJ/LJr7MVQihV6AYFeB/Abwi91qsvia7j/cWoMVrn+KQj5mH0Bx9W9q99rfDxtG/c8TiDEqpiFSj9n83/SCiiiuk+cCqmoaTp+rQGHVLG3vIz/DPEHA/PpVuigak4u6PM/EPwM8NaqHk0ky6TOeR5Z3xk+6np+BFeHeMPBWreCtSFrqsYaOTJhuI+UlA9D2PqD0r69rzn45rZn4bSG7wJhcx/ZuBnfnnr/s7ulc1WlHlbR9Hlea4lV40aj5ot213XzPmavb/ANnvX5mk1LQJXLRKguoQf4TkK4/HKnH1rxCvS/gPFI/xGLopKR2chcjsMqP5kVy0W1NH02bU4zwVRS6K/wBx9KUUUV6Z+ahRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRUN3dRWNlPd3BKwwRtLIQMkKoyeO/AoA5T4lS6BJ4ZbTvENyIHucta/IzESKOGwo6DPOexrwLRXhu0n0G5uGjEjlo5o/vyAggpg4yM7DjGTgY61ra145u9X8YTa29q5URvFbRP0hQqyr0Odw3En3J9qc+o6DrH2UHNjcxsu+QIImBJyz8Dtg4HXLAA4FeVXkqrfI7M9yfDsHyVaqfNbXqvS2j+d93s7Gx4Um0q08cav4ftwsdss2yIABhcxoGUJ0yWZgG4I56DOBXRSx6NrevWkH2KeS1j8xLeVwZR5rOuRg/dChdpVh1YcZry3yr/S9QfWbyeVN4YpIo3faG3YaMkHG1hu+bkfL9SPTfBevS+I57y40u2a38nbKiyyySx9c7WLkgHIGOmMMa6aE1KKhI5Xh8Th1eS1grNp9Nk15W08ne9tDl/EfgyTRri01Gwk+02F1cjyY0RjJGAwzkAfdByAe4we9TePnk1HxDqd3a2tw9vLJEEkWPcDsEgJwMkD5hyRWzqFpcx2VzHp+vzxXDI01stvekj5eTxEx6gMvTAI96w9F1DWNZ8SC2ufFSfYxbiW6cajIkZ424ckjJJwMen0qvZRSlFbM7Y46vUq0a02nKN7XvrZX19dlbdl/wn4M+zX0F9q80Gx1zblcSor5BBbnBBUqQO6vkEECuz1KEWUNy/2gxJEshQvOd3lhBnnOOTvHJB4X3zPFrGh+G9PtrGN1WC3ghWFySIjtGB5bE4kUZ5weMjJ548u+IviKxEcGi6ZdNcM0rM00F3JJHgnn5G4z9O4GOKfuUoWiY1KmIxtb22Iukuttl5fot2zkbK0v7zWLm8063+zQsjICzBVjjIYY3P1B2uBz+NM0XyNU1q3OpO9paFwhkdC2xM/M3HsOnWujcJrDIsz+RpmnIPs9uFLOkeNoZgDkjjDEZxkHBzktm1PRdOvUNparemFpFVGQ7ZEbs/8AE23LANxkFTwRivNSb96W3QdTh2ni68quIb5m22l0vsm3ou3V27H0jpF5YX+kW1xpEyzWbIBEy56DjHPIIxjB5q7Xh/wg8YfYtbfQbkSJaXzF7cMDiKT+7k/3hx9QPWvcK9enNVI8xw43Cywld0n8vQKKKK0OMKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiqt/qdjpVv52o3cNtH0DSuBk+g9T9KTaW5UYyk+WKuy1RWbp3iPR9WkMenajbzyD+BX+b8jzWlQmmroc6c6b5Zpp+YUxoYncO8aMw6EqCRT6KZAUUUUAFFFFABRRQTgZNABRUFpe2t/B51jcRXEWSu+JwwyOoyKnoG04uzCiiigQUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABQQCCCMg9QaKKAIltbdWysEYPqEFS0UUDu2cN8YYI5PhjqshjUuojwxXkfvF718s19XfFld3wt1r2jQ/8AkRa+Ua4MT8Z9zw6/9ll/i/RHrv7PkcUviTVkljV/9EUgMoP8Yr3v7Fa/8+0P/fsV8/8A7Pkm3xpqCf3rEn8nWvoeuih8B4We3WNl6L8jyL4lfEm78FeKU0yw0jTZ4mtkm3zRHdklhjgjj5a5H/hfGrf9ADR/+/T/APxVQ/Hz/kosP/XhH/6G9eY1zVKk1NpM+iwGX4WphYTnC7a8z1S4+P8A4leEJa2Gm2xHdY3PHpgtXFeIPG/iLxRxrWqTTxZyIVwkY/4CuBWBRWTqSluz06OBw1F81OCTCiiioOw9N0f436toWjWumafo+mpb2sYjQESZPufm6k8n61oL+0Nro+/o+nn6Fx/7NXkVFa+1mup5ssrwUm3Kmrv1PZk/aJvx/rPD9s3+7cMP6Gnn9ou67eHIf/As/wDxNeLUU/bVO5n/AGPgP+ff4v8AzPYpf2iNUP8AqdCs0/35Wb/CoD+0L4gzxpOm4+kn/wAVXklFL21TuUspwK/5dr8f8z1G5+PviqVwbe2063XHKiFmz+bVxXiTxjrvi2aN9dvmuBFny4woREz6KABn361h1JDBNcyrFbxPLI3ARFLE/gKlzlLRs6KWCw1B81OCT7/8Ejr3r9n/AMNy22n3/iC5j2/asW9uT1KKcsfoTgf8BNcx4I+CerazPFd+JUfTdPGG8puJpR6Y/gHuefavoazs7fT7GGzsolht4EEccajhVAwBXRQpO/Mz5/O8zpuk8PRd293+hNRRRXafGhRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABUc8EV1bS29wgkilQo6N0ZSMEflUlFAHz3qPws8UtdXU9hpRhtmkZoYPtMbsiZ+VeWyTjHU1xuraRqOkz/Z9Vglt51yQs0flsQOpU9CPfkGvrasDxV4L0bxharFrEBLpxHNGQHQZzjkEY+orjnhYvWO59BS4gxNOPLOKkvVp/fr+KPBdP8AEf260TTtTSO7lkiRLc/cQggYDAjgjgEgZ4AyBknIu9F1Pw9dG50e4YxvvZXhYqHVGKluPu857+nYiu51X4FavG8jaVeW067yYyWKOo7HGMZ/Gqs/h3xN4Q0tZdXl0+8t7Z1aSKO4G5cHcMqcEguVJAyTsUdAKw5Z/aRjl+ZrER5cRHkmnvsn/heqT7p+6+vZc3a3mt6vpS2dlZP5ZIjlhtdrSTsMnc4B3tx7bRW5d2F5pt1HP4L0jxPayiJVuRPFIxJAxtAxgrwPy6dMYaNpFzbxxTO7OY5maYx7S0jZKZGSNoKgH3c9hU0K6EugwfaIfPuhe7WXJUiABDnGcKTlx0P4YqVJJW/U+kdCpJxkrSs3b3HrfS7s0n9y9Cv4n8Q69c2semy21rACRPKI2j2tJz+8ZUJCthuR8uccjNVtF0BbWRNR1MpND5rRXMjOd0bhchcAHBPO3IwSCDgZq9BqMFm2bCNkmjuWFvcx9HRjt8uTdwOACCeOSCPTqbL4W+JfEFw8s9/p1jazInm/ZZQ27p1SP5ffg8+vNPllPZHHWxFDBpuo7tbRVk7vTSPTTaUm30VkcTquuPLIdOtb+S8iUkLMyAOV5+QHqBg8joOeMAVFpukanqLmLSrOS4dTllgheUj6kf1r2/Rvgl4W05D9ujk1BmGGDHy0z6gLg5/Gu9sbC10yyis9PgS3t4lCpGgwAP6/WtVhnJ3mzz8Pn9SnTf7pKV+/TztbXvZr9Dxr4eeAtUs/GEFz4m0a5jt4V8yByybFlU5UsASfcdOQK9toorrp04048sTyMXi6uMq+1qb/ANd7hRRRWhyBRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAV51r01hZfEwXHi6LfprWoWyeVC8SvxnI5569u4r0WuZXX7HU/El94b1qyhjaIAwidg63KkdQCBzz057+lZVUmkrno5fKUJTkotrld7OzS01X9bFHUfD2g+JLeGbwtc2Fpf28iyRXFpt+XB7hetbPiHxLB4eitkeGW7vbptkFtCPmkP9ByK5bxt4Z0PQtJfWNK/4leowuptzBIV3tuHAX6Z6elTXlxJD8QfDF9q/yJPYmNS2VEc5U7vpncBWPM4tq1noeiqMK8YT5nKC57J6O6V7X1uv+Dpc0Y/GV9YXlvF4o0R9MhunEcVwsyyoGPZsdKm1/wAZDRddi0mLTpr26uLfzYVib77EkBcY4HBJPYVT+KUsf/CGPbbgbi4mjWGP+JzuB4H0qOSH/i7mlicB5I9IzuI6NuYE/qacpTT5U+34kUqOHqU1iJQtpPRN2fKk0979bPXoXpvGMun6Nbz6tpM0Go3Mxhg0+Nt7ykHGQfT3+nXNRp4x1CwuYB4n0N9MtrhwiXKziVUY9A2OlV/ETpafEzw7dXvFq0ckUbt91ZDn8uq/5FT/ABNmhXwRcQSFTNcSRpAnUs28Hj8AablJKTvsKnRoSnRh7P8Ai9bvS7a016Wu73NPX/EqaNNb2dtayX+o3WfJtYjgkDqxJ6D3qnp/iu6Gsw6X4i0ltMuLkE27iUSRyEfw7h0Pt/8AWrLjxZfFXTvt2I/O0gQwlyOZAeQPfAP5+9dLqmr6dZatptldx+bd3UhFuFQMU9W55A9xVKUm272szGVGlTjGmqfM5Rve7v126WVtdH11Mufxdf3WoXVr4a0R9SFnIYp53mWJA46qM9fSrWgeJjrbX9nd2Mlhf2IAngdgwG4cEMOtYmk3OveKTfT6Rf2ui2Mdw8KpHbCSRyMZZs8AnP8AnrUPgsbPGvihGvjfsFiBuGABcgEHpxwePwqIzlzLXR+n/DnTUwtFUai5UpQSejk3e6Wr+Hq9jO8B67qkHht7TRNEfUGhndpZGmWJBnooJ6mu40bxRZ6tpdzduklo9mWF3DMPmhKjJz6jg1jfC2e3k8HeVBt82K4kEwHXJOQfywPwrP07UYrXW/G2swxLcWUQQAAjbI6qQw/Pv71NOThCLvv/AJGmMpU8RiK8VC0ota3d3eSVnfTW91ovmaUfi/XNQtxe6N4XluLA8pJJcqjyDJGQv4VveHtcg8RaLFqNqjxq5KtG/VWBwRXNafB4i1LQ4NTu/EVvpdlJEJhDaWq4jjK5A3HpUvwrIPglcHd/pEnP4irhKXMk+q8jnxWHoLDznBJOMktHJ730bejenQ7Oiiiuk8IKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA5D4q8/C7W/wDriv8A6GtfJ9fWPxV/5Jdrf/XFf/Q1r5OrgxPxI+54c/3aX+L9Eeo/AA/8XBuR66fJ/wChpX0dXzh8Af8Akodx/wBg+T/0OOvo+t8P8B4mf/778kY2q+EPD+uXgu9X0m1vJwgQSSpk7RnA/U1S/wCFb+Dv+hdsf+/VVvHnie/0f+zNI8PpG2s6zMYbZ5fuQgY3SH1wCOP54wa6eEvF1mUubXxvcXNypUvDd2qGGT1GByoPtW3LF9DyI4itFWjNperNH/hW/g7/AKF2x/79Uf8ACt/B3/Qu2P8A36q1rfjDRfD95DaahcyG7mUulvbwvNIV/vbUBIHuak07xZo2raHcavYXgltLVXac7GDRbRlgyEbgcdsUckew/rWI/nf3so/8K38Hf9C7Y/8Afqj/AIVv4O/6F2x/79VTf4s+Dkiik/tRnjkUMXjt5GWMHpvIX5T7Hmq/xG+IK+EdFs59NeKa5u3Rot8TyRtET8zBl4zgjHPPvRyR7B9axH87+9mp/wAK38Hf9C7Y/wDfqj/hW/g7/oXbH/v1U0XjfQpfD7a0LmVLFZ1tzJJbuhDkgAbSM4yw5xinaX410DWJb5LC/DrYKWnmZGWIKCQWDkbWHB5Bo5I9g+tYj+d/eyv/AMK38Hf9C7Y/9+qP+Fb+Dv8AoXbH/v1VWL4q+EZZ0jGpOiSPsWeS2lWInOP9YV249812AORkcijkj2D61iP5397OY/4Vt4O/6F2x/wC/dH/CtvB3/Qu2P/fuunoo5I9h/WsR/wA/H97Odt/h/wCErWXzIfD2nhsY+aAN+hzWxZaXp+nLt0+xtrRc5xBCqDP4CrVFNRS2M51qk/jk38wooopmQUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUVxHxZ8YXfg3wWbrTMLe3Uwt4ZCoIjJBJbB74U496AO3orwG8t/EelaPpOo3/xOlstTv40u/sl5JII1jbB7bgcem3B6VveP/H2tQeH/DeneHr6B7/W1Cvf22QrHIT5N3K5Y9ccUAewUV4P4mfxt8J7rTNUuPFc+u2txJ5c1vcliDjkrhi3UZ+YYNaukeIdU0P46f2bqGp3d1pGsw+bZLPM7IgkG9NoY8YYFKAPY6K8Y0DXdZ8VfErxTqEGq3iaNpUMqwwJMwjLBSiHb0/hZvrivP8AQPFN9qFtK+ufErV9IlR8RxhJ7jeuOuVbj6UAfU9FeAfELxDq2j+AfCcmjeKdQuvtAuC9+jyQvcDcuCwJzxkjmqqeJdY0zxxo1r4T8aah4oW5dBcW829lUFhlSTkdM8gcUAfRNFfPfjXx/r/hf4z3bW19dTWFrJGWsWlYxMhjXcNucDqTnsea3IPGdzq3x60kabq1y2iXdqJhbiY+Wf3DMcoDjII59xQB7RXPWXgXw9aTTzyadFe3Fy7SSz3qiZmJOf4uB+ArynRNR8XfFvxNq0umeJ5tC02xIESW27kMTt4BXccKSST+FdF8KPFWvTeJtZ8I+Jrg3txpgZkumOWIVwhBPfOQQTz1zSaT3JcYy3R6Rd6Npl/Gsd9p1pcovKrNArgfQEe9Ux4P8Nhnb+wdOJf7wa1Qj8iMCuT+N+raho3gOG50m9uLKc30aGS3kKMVKucZHbgVwWrXnjb4faRoXic+KrnV7XUAhltrokqpZA4TDMc5G75hg8UWRrGcoqyZ70dPsjZm0NpAbZhgw+UuwjGMbcY6Vj6N4K0nw/rk+paMstr9pj2S26vmJucg4PII9jjmvOPG3jDXvEHj/SvCHhnUZNIjuoo5JrhPv5dPM6jnAXHTGTmqiaz4p+G3xO0vRNZ8QTa9p+peXuM4JYB2KZG4kqQRng4Io5U3cycYtptanuVFZXimeW28IavPbyNFLFZTOjocFWCEgg9jXzdoHie91Cykk1z4mavpE6ybUhEc8+5cD5tytgc5GPamUfU1FeKePtb8R6D8PfDP9laze3Vjcpvu9YiRlmkU4ZMknK5Vj1OTjFP+G2uXGo+Lmi0/x1NqVjLEwaw1UOLn7p5QnK5BGflbpnIoA9oor508c2fjHwVrOk2DeOtUvDqJI3iWRPL+YDpvOevtXdaomsfDL4ea5d6t4nudbu7kLFZPPuDROwK/Llm9d3b7tAHqNFeH/CnxN4gsPHA0LxfqFzc/2pYx3Nr9qnZ9pK71A3dMqWz7riotck8SeIfjrqPhvTPFOoaTb7VdPKlcomIVYgKGHU5oA91orxjwV431/QPEHiTw74ru21QaNaTXSTscuRHg4z1O4EHnkVleF4fHXxM0/Utej8Y3OliGZoorWDcqEhQ2PlYYHzAZ5NAHvlFeafBfxvqPi3Rb+11uQzXmmyIDOVALo+7GcdwUb9K9LoAKKKKACiiigAooooAKKKKACiisS71ue38badoyxxmC6tZpncg7gUKgAdscmgDboqlc6zpdneR2l3qNpBcyfchknVXb6AnJqa7vbXT7Zri/uYbaBfvSTOEUfiaAJ6Kgs7611C2W4sLmG5hb7skMgdT+IrGtddlu/Glzp0d1pos7eEYiE6vcSSdSdob5VA45Gc0AdBRRXHP4i17xBqd7beDoLFLWxlME1/f7isko+8qKvJA9TTtcVzsaK5nQdf1RtYn0TxNZxQX0UPnx3NsGME8ecEgn7pB6g1uR6pYTXi2sN7byXDR+aIVlUuU/vYznHvRYLlqiqUOs6XcX72VvqNpLdp96BJ1Lr9VBzS3+r6bpQQ6nqFrZiQ4T7RMse4+2TzSGXKydc8MaV4hRBqlqJHjHySqxV0+hH8jxWi11bpGkjTxqkhARi4wxPQA96hstW07UmkXTr+2u2iO2QQTK+w+hweKTipKzLp1J0pKdN2fkYenfD7QNOu0uRbyXMsZyhuZC4Q+oHT862tW0aw1yzNrqlstxFnIB4Kn1BHINF3rOmWFzHb32o2ttNL/q45plRn+gJ5q7UqEUrJGs8VXqTVSU22tnfb0Oe0zwPo2mXqXixzXNxFgRPdSmTy8f3R0FaraTZPrSaq0Ob2OLyVk3HhM5xjOOp9KxfEPie6s9ZttB8P2cd7q9xGZisr7YreIHG9yOevAA/wD159zrni7w15V34jttOv8ATXlSOaTTlkWS33HAba2dwyR05qlTilZImpiq1SXNObb236dvQ6rVNJsdasWtNTt1nhJztOQQfUEcg/SsnTfA+i6ZfR3axzXM8P8AqmuZTJ5f+6On+FbN7qNlptv5+o3cFpD08yeQIv5mnR31pNZ/a4rqF7Yru85ZAUx67ulJwi3docMTWpwdOE2k+lytrOhafr9mLfU4BKqncjAlWQ+oI5FVNG8JaXol293bJLNdMu3z7iQyOF9AT0q+usaa2o/YF1C1N5t3fZxMvmY9duc0s2q6dbzNFcX9tFIv3keZVI/Amjki3e2oRxNaNN0lN8va+hjXHgPRZ76a5Rbm3+0HM8VvcNGkvOTkD19sVoWHhvSdLu2udPs1t5GhEB2MQCg7YzjPHXrV1L60ltmuI7qF4F+9KsgKj6npUOn6zpmrb/7L1G1vPL+/9nmWTb9cHikqcU7pFSxeInHllNtepiTfDzw+8aLBbzWm0FSbedlLgkkhsk561tWmi6dY6T/ZlraxpZlSrRdQwPXOeTn1NUPDGvTa3b6rJdpHELLUp7RSuQCkZABOe9aNjq+m6m0i6bqFrdtEcSCCZXKH3weKapxi9EKeLr1YpTm2t9WYsHw/0KBwNlzJbq+9LSS4ZoVb1255/HNbOl6PY6NDNFpsAgjmlMzqGJBY9SMnjp0HFFzrWl2V4lpealaQXMn3IZZ1V2+gJzV2hQjHZBUxVeqrVJtr1CiiiqOcKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA5H4q/wDJLtb/AOuK/wDoa18nV9Y/FX/kl2t/9cV/9DWvk6uDE/Ej7nhz/dpf4v0R6f8AAH/kok//AGD5P/Q0r6Qr5v8AgD/yUSf/ALB8n/oaV9IVvh/gPEz/AP335I84+IMy6F8QPCPiS8O3ToZJbS4lcZWEyL8re3fn/Zru7rV9OsrL7Zd39vDbYBErygKc9MHvmsjxX4h8KafD/Zni66tUjuk3eRcoWDrnrjB7isDwr4a+GGp3rXfhm00+7nt2DEb2cxnsdjn9cda6DwTFsIfEM3xg8Wx6VqljYXZEBQXtv5ryQ7eNmCMKOM/UVqQeF9Q0XTvG2parq9te3GpWDNJDaxeWsbLE43bcnk/0Ndbrng/QvEc8Vxq1gstzCNsdwjtHIg9AykHufzp+m+EtD0jTrux07T44YL0EXI3MxmyMHcxJJ4J796AOP8H6faH9n7yhAipcabO8oUY3sQ/J9TwOfasHxM2P2efDjMeA1nk16xaaNp9joq6Ra2yx2CxmIQAkjYc5GSc9zWBdyeHTqVt8PLjTWkt5dP8APSIjMSxq2Auc7s5XOfbrQBm/GorJ8Lb4AggzwA4P/TRaPijbGz+D93b6ZEIreJIFeOIY2wh13AY9uvtmugh8D+HYPDr6FHpqf2bJKJXgMjkM4xznOf4R37VuSQRTW7QTRrJC6lGjcZVl6YIPUUAcd42m0Zfg/qRha3GntpxW1AxtJ2/uwvvnbitnwZHdxeB9FTUd32pbKISBuoO0dfeuc1Pwx8OvBjQ6pqdlbWm2Tdbo7vIN45+SLJBPToPT2rpfD/i3RfFCzf2NeCZ4CPNiZGR485xlWAI6GgDZooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigArlfiL4MHjjwm+mpKsNzHIJraRs7Q4BGD7EEiuqooA8FvvBPxB1vRLXQdT8P6O5s4Ft4dVlkBkSMHgAhu3rtzW/4m+Eup3Xg3w7Bo19EdX0FCEYkosmTu+U9iCBjP6V63RQB4pqvg74h/EW+0+28YQ2WmadZPmRoXBMvTLAAnJI6dAMmuj+KXgLUfEUej33hYRR6lpkm1SzhP3fUcnjggce5r0iigDgvh94HuvCvw7utNu1j/ALTvRK8218gMV2qM/QD8Sa4jwj4M+I/g6xuLbT9J0W4SeQSMbqQOQcYwORXulFAHjnjzwP4y8aeGNCSezsItRtHn+0RQyhI1ViuzbknsOam174bazpXxA0/xL4Dgt4lVV+1WqyCFSRgMAOmGHb1Ga9dooA8rf4ealffGe717UbSGTRLuBopFaUFmDQbCCo96xvCPwh1rwv8AFS21JfKm0a2kl2SmUbyjRsFyvrlgDXttFAHjFv4K8cfD3xLqd14Gt7PUdO1BsiGZgpQZJUEEr93ceQeR2re+GPgDVvD2ran4h8UXEcmq6lkMkb7goLbmJPTJIHA6AV2j+KdBjvpLJ9YshdRSLE8HnrvV2IAXbnOSSBWrQBw/xa8Lan4v8HRadoqRvcLeJKRI4QbQrA8n6iuHvvh/8Q/FtppGi+In0+y0nT9oDQvlsKoXOBnc2M46Dk17hRQB5V42+HGsDxVpvirwO8Jv7NEje3uGADhF2hgTwcr8pHHqKqWHgbxb4w8f2PiXx5Da2EFgEMVrAwJOxiyrwTgbjkkn2+nsFFAGd4hsptR8M6nZWoBmubSWKMMcAsykDn6mvHvCXg/4keD9MmsdP0jRLiOaYzFrpw7A4AwDkccV7lRQB5t4i0f4hXmk6Jf6Tc28GoWy4v8ATEk228uGyMdiMDBBNYPh74d+IdT+I9n4o1zSdP8AD0FqVc2tkR+9Zc44BIGT1Oelez0UAeY/FHwNrXirxJoN5pEUTw2LEzF5QpHzqeAevANP+K/gzxB44vtIsNNEUelwv5lzM8oBDE4yF77Vzj/er0uigDw7U/g94n0jXdK1jQNak1q6tJFYm8fyzGqEFVBLHKnkY/xq9rfgzxxbfFi+8WeGbaxYTIqx/aJRgfulRuMjuDXsdFAHlfgv4aasNY1zXPHE8T3erwSWzwQNkBJPvEnoOAAAM4FY2keEviT4Ch1DR/DEFjqGn3kpaO5dlDREgDfgkYOAODuGR+fttFAHCfCrwBJ4F0K4F/Ikmo3zK8/lnKoFB2qD3xubn3ru6KKACiiigAooooAKKKKACiiigClqer2OjxwSalOIEuJ1t42IJBdug46dOp4rm9Wk2/FbRxHhpF0y5YJ36rj+VdJq2kWWuaZLYanCJreXG5ckEEHIII5BB71naD4O0rw9dSXdr9ouLuRPLa5u5jLIEzkKCeg+npTVhO5zPgfQNF13wGdQ1u0t728vmme9ubiMGRX3EEbm5XaAAMemaxNLtL/X/CHhG4Sawvr+0S4Mem6k2Vu4wxQNj1UAYJ4ruLr4faJdXNxIPtlvFduXubW2unjhnJ6lkBx+WKu6j4R0jUbOyt2ga2+wDFpLayGKS34x8rLyOO1VzE8p59PqTaRoPi+Oz0OXw/rX2SOaWGCUPCUzs8yPbgLwST+faq9/omoQ+Dbd7fw9oulLbpFLBq41FVkRsghy5UE7s9zzmvStK8KaXpK3WxJbua8UJcz3kpmkmUDGGLduTx0rOi+HWgxyRBheTWkDiSGxmu3e3jYZ5CE479OlHMg5WdNbs72sTSlS5QFivTOOcVxXwo/0bw3e6ZPJuvbHUJo7hTncDuyDzzg+tdzXP6v4L0rV9S/tIm6stQ2bDd2M7QyEe5HB9ORUrsU+47UfENk2qXegR+ZJeLYPcOUAKxrgjDHPB6ce9eeaVYQ6X8B217TbRP7XazcG7H+tVTJsOG6gBBwO2K9H0fwnpGhW9zFp9uwa7GLiaSQvJL9WPPerWnaHp+l6CmjWsH+gJG0YikJcFWJyDnr1NO6QrNnleo6PqEfgu3kt/DmhaOsKQy2+rLfqrxsCCHLFcnPue9b2s6TeTeMr7U9NsdI8SN9niiudPu3XzbUhSRsJBUBs5561uw/DrQoZIQftk1pA4eGxmu3e3jYHOQhOPwORVzVfCGnarqR1DzbyxvGQRyT2Ny0LSKOitt6/zp8yFynnmoDSNR8B6HYQ2k+n2cfiVLW6triXcYW3PvUN6c10niHS9O0Lxb4Un0O0gsrua8a2dLaMJ5sBQ79wA5AwDntT/E/gu1bQdF0fStOMtkmswzXce4sWjO7zHZicnryc5rc0rwhpmk6iL+Nrq6ulQxRS3lw0xhT+6m4/KP1ougszmvAuhaPr3h6/v9asre/v7y8uFu5bhAzrhyoUE8phccDHWtX4aXEk/gyNWne4hguZoLeVzkvErkIc9+OPwqzf+BdIv724ud15am8ObqK0unijuOMfOqnB61u2VlbadZRWdjCkFvCoSONBgKKTY0rHF20g0743X4v5to1LTo/sW/gNsIDICe+QTgetSeN73xRoWn6hrFjq2nx2MCho7aW1y56DG7dyc57V0mueHdL8R2qwavaLOIzujfJV4z6qw5HTtWLbfDXw/FcpNeLd6kY23Rpf3LTJH6AKeMD3zRdBZmVYww+IviddL4gt4rlbTS4Hs4Jk3IfMGZJAp4zu+XpWLrcMWmXHj3S9LjSHTv7NjuGhjICRTMMHCjpkc/hXoWs+FdN1u4huZ/Ptry3QpFdWczQyop7bl6j2NMt/BujW2jXumR27tDf5+1SPKzSTE92cnJNPmQrM5DxF4d0vR/h7pVzZWcSXsM9mwvAgEzMXXcxfqScnvWp4yFhc6kmkaPpOn3fiG+wXnltEk+yxdDNISOw4APXiuov9EsdT0uPTruNmto2jZVDkEFCCvP1ArJu/h/ol5qV1fyfbY7i7cPM0N7LGHI4HAYdO1K/cduxia1oWieGPCuk6ClhdakZr5WitI3C/bJh8xMpPG3jJHTgelZsdtdWXxQ8MPPomm6G8/wBqQw2M255UERI3hVC4z06811zeAdEfTPsTC8ZVnFxFM13I0sMgGAyOTlafZ+B9HtNUtdTP2u51G2JKXdzdPJIcrtwST0wTx05NO6FZnnWoyzjwjqVtAA0d54ylgnjaTy1kQvnYzfwgkDJrUuNM1ez8QaBdRaDovh947xY99veBTcRsMNFtCjdkc856V3Z8KaO2lX+nSWgltdQne4uI3YndI5ySD25AIx0qtp3gnStO1KG+Z7y9ntwVtje3TzC3B4wgY8dOvWjmQcrOJudGnhm126i0bSvFel3d1NJJcJMq3UB6NHubP3McAc/yr0Dwre2WoeE9NudKMv2RrdRF5xy4A+XDHuRjFULvwDo91eXU6SX9ot4xe6gtbx4opyRgllBxz7YzXQWlpBYWcNpZxLDBCgSONRwqjgCk3dDSsTUUUVJQUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQByPxV/wCSXa3/ANcV/wDQ1r5Or63+JVpc3/w41i2sbeW5uJIlCRQoXZjvXoBya+ZP+EJ8Vf8AQs6x/wCAEv8A8TXDiE3JWPteH6kIYaSk0ve/RHZ/AH/kok//AGD5P/Q0r6QrwH4I+HNb0nx3Ncaro2oWUJsZEElzavGpbenGWAGeDXv1b0E1A8bPZRljLxd9EeX+L9Q0/S/jh4cutXuIba1XTpg0k5AUE7wOvvSWE9h4j+NdpqnhFVazsbKSPUb2GPEUxOQkeehIODkZ4HtWlr+jT33xo8P3cmnPc6fHYTJLK0JeJGw2AxxgHkYzXcrbpBaGGzjjgAU7FRQqqfoPetzwzg9fu/Hmk6PqGsSaxokQtI3nFgtszZRedu8tnJA9OpqbWvHF6nhPwtrGmxpCdYvbWKaORd21JAdwH+NcPa6HNJ4U1PSdW8EahqHiydZlk1S5txJEWOcSLO3oCMBeSRiui1Hw9q9x8G/DQs7CWTUtHa2uzZOCjsY+q7Tznnp1oA6vxzr974fs9Ik08xhrvVre0l3ru/dvndj3461h3/8AycRpn/YCf/0Y9ZvirVta8Yf2Cun+FdVtbK21e2muJL23McgIJ6JydgBJLnA6Vt3um3r/AB207UVtJ2sk0Z4muRGfLV/MY7S3QHkcUAWtUh8cSXV1LZ6xothCrN9mt2t2kZ1H3S7kjBPfAwPetLwTr83ijwZp+sXUSQzXCN5iR/dDK5U49srmvObDTTY6vrC+LPBN/wCJNaubyRra6a2E1s8RPyASMdsYHPbgH8K7f4XWN1pvw10q01C1ltLiMSh4ZUKsmZnI4PsR+FAGV4/03VrTxdoXizTNNbWINMWSO4sU5dQw/wBYg7nntzwPw3PDPi/w74mS6vdLZY7uFMXcU0QjniAycOOpAJPcjOafr/ibUNA1ONf+Ec1DUtOkjB+06cvnSI+TlWi64xjnPeuY0XR73xT8QL/xPdaRcaLp8mntYLFdJ5c10SeXdOoAHHPoKAJdF1bxv4z059b0e803SNPmkcWcFxatK8iKSAzNkYyR2FQzfEbUpvhLq+uRwQW2s6VcfZLiMAvGJBIikjPYhvWo/C2u6z4I8PL4c1fwtrN9c2JdLa40+182G4QsSpLj7vXv060lp4D1Wf4Ta/YXqLHq2t3El+bcSDEchZWWPd/wAA/WgZ1HizX73R/hpda5ZmMXkVrHKpZcruYrnj8TT9cPiCTTre+0jV7HTYI7cy3TXVsZB0ByORgAZrhvEmueIPEPwyn0Sx8H6tDdrapHdtc27Kq7SuRF3lJI4wOBya0/iRNqcmnaHoiaTqt1pVztfVG061aaTYgBEXHTce+R0oEaHgzWfF2v+CLzUpDYyXc8pGmPNE0SPGCBvdRkgHkgVT1LX/FfhLU9Gk1nU9N1ay1C9Szlht7bynjL9GB3HIGP89na9qGq+Kfhvqll4V0XWNHubdI0iiu4DbPLGD8yx5PPygj8cVyuo6Pb6hF4f/4RfwDf6X9i1K2e7urmx8uXbuGR3dx1JY8DAoGe30UUUCCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA8P1PxT451T4w6h4W8P69HZRq7eQJreNlQLHuxnYT6+tXfCfxD8Reb4o8O+JZ4ZNW0u0uJoLtFUZaMHIwAAexHHQHNZmqaH4y0X4z6h4n0Tw7JqEXmN5RZgFcNHtz1zWh4U8AeIjN4o8S+JbSOLUtTsriO3tY2BYPIpJ6HA7ADOeTmgZzvhjx/4m1yznl1T4i2ejPHIFWK5somMgxncMLXuXhZ7mXwvYyXuqR6tNJGXN7FGEWYEkghRwOMD8K8E8LeGPFXh2zngu/hxaaw0sm8S30aMyDGMDnpXvHhF7t/ClidR0qLSLgIVaxiGFhAYhQB6YAP40CPKvHXjvWIfiVcaDea7N4Y0mGMGO4htfNaU4BDE9cEkjj09a7H4W61ruq6Rdtr+p2GqwxMPIvbWRSSMcq6gDaeAeQDyc1i+LrTxf/wAJhL9u8N23izw86t9ntykSvESB/Ht3Ag5x6g+vTn/DPg3xb4b8J+KL620qS3u9WQW9np8MgZolZjljk8bVJA5zQMwrnx5fDxm3iGCzsm8O2+sbFJsoS3JLFg+zfuIBbOepFemfFn4h3XhPSLCDQGjN9qeTFOw3CNBj5gDwSdwxmuHj+D3io/DVof7UKkk3h0U2y5Mo4x5m7rt/wq9q/gHxN4r+GehmayaDXtDLQeRO+DPFxtIJOMgBep7H6UAJr2rfEb4ZnT9W1rW4dYs7qXbcW5QYVsZ2g7QRxnBGOR09fbLG7j1DT7a8gz5VxEsqZHOGAI/nXiXiHTfiN8S107SNX0GLSbaCXzJrkvhScY3Ebuep4HrXtthZx6fp1tZQ5MdvEsSZ64UAD+VAjwWDxz4w1PxD4jtx4xtdJh0xpnhFzbw4kCuQEBK5z+Zrb0D4p6u/wb1jW9XkV9RtZ/strOIgPMdlXaSBxlck9AMCoPBvwxa88eeIbjxjoLPYzSSPavM2AxMpORtPpVz4meCtT1m40Hwv4V0n7Jolu/mTTRIBHGzHGSM8kDJ993WgYvwr8d+I7/xdPoPjO5M09xZpc2m6JEwCofHygZyjA+22r/gbxfrmsfF3xJo2o33nafZLMYIfKRdm2VVHIAJ4J6mua1z4f+M9A8YaH4gs7qTxLPasquY7dYjHGmMIRu5ypYVdvPDvjLwX8TdS8R+GNHTV7XVFclNwBTcwYqRnIII69CKBEvhzx14iv/ij4o0m61HzLGwhvGt4vJQbDG4CchcnA9TWp8E/F2ueLLDV5PEF8bt7eWNYiYkTaCGz90D0FZfw/wDAviCPWPEfijxFaCzu9RgnSG0VgSWkO5jjJwMgAc96wPAdr8RfAVvexWHhBroXbqzGZsbdoPTDe9AzsfiX428Q2vi3TPCHg9kgv75Vd7h1DbQzEADOQAApJOD7VjS+JvGPw18Z6Xp3ivWItZ0rUSB5rKA0YJAY5wCNpIPJII9O03ivwx4w1O/0Dx3plgia3axqt1pu4fLtZiMZPIIOCM5549q9x4a8afEnxppd74q0aHSNN01gWQsDvG7cQBkkk4A9AP1APbaKKKBBRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAf/2Q==";

}
