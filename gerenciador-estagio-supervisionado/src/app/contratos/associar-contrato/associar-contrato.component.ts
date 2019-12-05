import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Aluno } from 'src/app/model/Aluno';

@Component({
  selector: 'app-associar-contrato',
  templateUrl: './associar-contrato.component.html',
  styleUrls: ['./associar-contrato.component.css']
})
export class AssociarContratoComponent implements OnInit {

  titulo = 'Associar Contrato - Aluno e Empresa';

  @Input() alunoSelecionado: Aluno;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params.id;
    if(id){
      this.titulo = 'Editar Contrato - Aluno e Empresa';
    }
  }
}
