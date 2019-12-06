import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import * as moment from 'moment'

import { Aluno } from 'src/app/model/Aluno';
import { Contrato } from 'src/app/model/Contrato';
import { ContratoService } from 'src/app/service/contrato.service';
import { AlunoService } from 'src/app/service/aluno.service';

@Component({
  selector: 'app-relatorio-parcial',
  templateUrl: './relatorio-parcial.component.html',
  styleUrls: ['./relatorio-parcial.component.css']
})
export class RelatorioParcialComponent implements OnInit {

  constructor(private contratoService: ContratoService, private alunoService: AlunoService) { }

  teste1: String = 'ola';

  seisMeses: number = 6;
  aluno: Aluno = new Aluno();
  contrato: Contrato = new Contrato();

  dataAtual = new Date();
  dataPeriodoInicio: String;
  dataPeriodoFim: String;


  ngOnInit() {
    this.dataPeriodoInicio = moment(this.dataAtual).format('DD/MM/YYYY');
    this.dataPeriodoFim = moment(this.dataAtual.setDate(this.dataAtual.getDate() + this.seisMeses)).format('DD/MM/YYYY');

    this.alunoService.buscaPorId().subscribe(
      aluno => {
        this.aluno = aluno;

        this.carregaContratoDoAluno()

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

  teste(){
    let documento = new jsPDF();
    documento.setFont("Courier");
    documento.setFontStyle("bold");
    documento.setFontSize(20);
    documento.text(this.teste1, 65, 15);

    documento.rect(20, 20, 10, 10); 



    documento.output("dataurlnewwindow");
  }
}
