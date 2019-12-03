import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';

import { Aluno } from 'src/app/cadastros/alunos/Aluno';
import { AlunoService } from 'src/app/service/aluno.service';

@Component({
  selector: 'app-associar-aluno',
  templateUrl: './associar-aluno.component.html',
  styleUrls: ['./associar-aluno.component.css']
})
export class AssociarAlunoComponent implements OnInit {

  aluno = new Aluno();
  modalPosReq: BsModalRef;
  mensagemPosReq: String;

  constructor(private alunoService: AlunoService, private modalService: BsModalService) { }

  ngOnInit() {
  }

  

  buscaPorRa(template: TemplateRef<any>){
    if(this.verificaRa()){
      this.alunoService.buscaPorRa(this.aluno).subscribe(

          aluno => {
            this.aluno = aluno;
        },
      
        err => {

          this.mensagemPosReq = err.error.message;
          this.modalPosRequisicao(template);

        });

    } else {
      this.mensagemPosReq = 'O RA precisa de no mínimo 13 números.'
      this.modalPosRequisicao(template);

    }
  }

  verificaRa(): Boolean{
    if(this.aluno.ra.length == 13)
      return true;


    return false
  }

  modalPosRequisicao(template: TemplateRef<any>){
    const config: ModalOptions = { class: 'modal-md' }
    this.modalPosReq = this.modalService.show(template, config);
  }

}
