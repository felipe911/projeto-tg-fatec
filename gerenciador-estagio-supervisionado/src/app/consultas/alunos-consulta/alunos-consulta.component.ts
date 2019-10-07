import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alunos-consulta',
  templateUrl: './alunos-consulta.component.html',
  styleUrls: ['./alunos-consulta.component.css']
})
export class AlunosConsultaComponent implements OnInit {

  titulo = 'Alunos'

  modalVis: BsModalRef;

  constructor(private modalService: BsModalService, private router: Router) { }

  ngOnInit() {
  }

  openModalVisualizar(template: TemplateRef<any>) {
    const config: ModalOptions = { class: 'modal-lg' }
    this.modalVis = this.modalService.show(template, config);
  }

  getCadastrarAluno(){
    this.router.navigate(['cadastrar/aluno']);
  }

}
