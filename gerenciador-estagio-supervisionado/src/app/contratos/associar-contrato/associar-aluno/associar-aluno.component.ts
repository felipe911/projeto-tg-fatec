import { Component, OnInit } from '@angular/core';

import { Aluno } from 'src/app/cadastros/alunos/Aluno';
import { AlunoService } from 'src/app/service/aluno.service';

@Component({
  selector: 'app-associar-aluno',
  templateUrl: './associar-aluno.component.html',
  styleUrls: ['./associar-aluno.component.css']
})
export class AssociarAlunoComponent implements OnInit {

  aluno = new Aluno();

  constructor(private alunoService: AlunoService) { }

  ngOnInit() {
  }

  buscaPorRa(){
   this.alunoService.buscaPorRa(this.aluno).subscribe(

    sucess =>{

    }


    );
  }

}
