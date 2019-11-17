import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Aluno } from './Aluno';
import { AlunosService } from './alunos.service';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})

export class AlunosComponent implements OnInit {

  titulo: String = 'Cadastrar Aluno';

  constructor(private activatedRoute: ActivatedRoute, private alunosService: AlunosService) { }

  aluno = new Aluno();
  cursos = ['Análise e Desenvolvimento de Sistemas', 'Eletrônica Automotiva',
            'Fabricação Mecânica', 'Logistica', 'Manufatura Avançada', 'Polímeros',
            'Processos Metalúrgicos', 'Projetos Mecânicos', 'Sistemas Biomédicos'];

  semestres = ['1. Semestre', '2. Semestre', '3. Semestre', '4. Semestre', '5. Semestre', '6. Semestre'];

  periodos = ['Manhã', 'Tarde', 'Noite'];

  salvar(){
    this.alunosService.salvar(this.aluno);
  }

  limpar(form: NgForm){
    form.reset();
  }


  ngOnInit() {
    const id = this.activatedRoute.snapshot.params.id;
    if(id){
      this.titulo = 'Editar Aluno';
    }
  }

}
