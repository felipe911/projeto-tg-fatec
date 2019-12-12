import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { AlunoService } from 'src/app/service/aluno.service';
import { Aluno } from 'src/app/model/Aluno';

@Component({
  selector: 'app-aluno-pesquisa-datatable',
  templateUrl: './aluno-pesquisa-datatable.component.html',
  styleUrls: ['./aluno-pesquisa-datatable.component.css']
})
export class AlunoPesquisaDatatableComponent implements OnInit {

  constructor(private modalService: BsModalService, private router: Router, private alunoService: AlunoService) { }

  titulo: String = 'Alunos'

  modalVis: BsModalRef;
  modalConfirm: BsModalRef;
  message: String;
  alunos: Aluno[];

  cabecalhoElementos = ['Nome', 'RA', 'Curso', 'Semestre', 'Período', 'Data Vestibular', 'Ações'];

  ngOnInit(){
   
    this.alunoService.listar().subscribe(
      alunos => {
        this.alunos = alunos;
      });
  }


 

  openModalVisualizar(template: TemplateRef<any>) {
    const config: ModalOptions = { class: 'modal-lg' }
    this.modalVis = this.modalService.show(template, config);
  }

  openModalConfirm(template: TemplateRef<any>) {
    const config: ModalOptions = { class: 'modal-sm' }
    this.modalConfirm = this.modalService.show(template, config);
  }

  editarAluno(){
    this.router.navigate(['editar/aluno/1']);
  }

  confirm(): void {
    this.message = 'Sim';
    this.modalConfirm.hide();
  }
 
  decline(): void {
    this.message = 'Não';
    this.modalConfirm.hide();
  }

  getCadastrarAluno(){
    this.router.navigate(['cadastrar/aluno']);
  }

}
