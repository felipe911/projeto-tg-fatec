import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-relatorio-parcial',
  templateUrl: './relatorio-parcial.component.html',
  styleUrls: ['./relatorio-parcial.component.css']
})
export class RelatorioParcialComponent implements OnInit {

  teste1: String = 'ola';

  constructor() { }

  ngOnInit() {
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
