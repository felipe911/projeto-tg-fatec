import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-associar-contrato',
  templateUrl: './associar-contrato.component.html',
  styleUrls: ['./associar-contrato.component.css']
})
export class AssociarContratoComponent implements OnInit {

  titulo = 'Associar Contrato - Aluno e Empresa';

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params.id;
    if(id){
      this.titulo = 'Editar Contrato - Aluno e Empresa';
    }
  }
}
