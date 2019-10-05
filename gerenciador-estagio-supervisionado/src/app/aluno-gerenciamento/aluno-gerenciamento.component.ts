import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aluno-gerenciamento',
  templateUrl: './aluno-gerenciamento.component.html',
  styleUrls: ['./aluno-gerenciamento.component.css']
})
export class AlunoGerenciamentoComponent implements OnInit {

  
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  getTipoAtividade(){
    this.router.navigate(['estagio/tipo-atividade']);
  }
}
