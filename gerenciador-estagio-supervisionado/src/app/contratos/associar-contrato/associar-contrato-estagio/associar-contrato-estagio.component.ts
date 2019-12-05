import { Component, OnInit, Input } from '@angular/core';
import { Aluno } from 'src/app/model/Aluno';
import { Empresa } from 'src/app/model/Empresa';
import { Contrato } from 'src/app/model/Contrato';

@Component({
  selector: 'app-associar-contrato-estagio',
  templateUrl: './associar-contrato-estagio.component.html',
  styleUrls: ['./associar-contrato-estagio.component.css']
})
export class AssociarContratoEstagioComponent implements OnInit {

  @Input() alunoSelecionado: Aluno;
  @Input() empresaSelecionada: Empresa;

  contrato: Contrato = new Contrato();

  constructor() { }

  ngOnInit() {
  }

  teste(){
    console.log(this.alunoSelecionado);
    console.log(this.empresaSelecionada);
  }

}
