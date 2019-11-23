import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { AlunoService } from 'src/app/service/aluno.service';
import { Aluno } from 'src/app/cadastros/alunos/Aluno';

@Component({
  selector: 'app-alunos-consulta',
  templateUrl: './alunos-consulta.component.html',
  styleUrls: ['./alunos-consulta.component.css']
})
export class AlunosConsultaComponent implements OnInit {


  constructor(private modalService: BsModalService, private router: Router, private alunoService: AlunoService) { }

  titulo: String = 'Alunos'

  modalVis: BsModalRef;
  modalConfirm: BsModalRef;
  message: String;

  alunos = [
      { nome: 'Felipe Augusto', ra: '0030481521009', curso: 'ADS', semestre: '6',
      periodo: 3, dataVestibular: '01/01/2015'},
      { nome: 'Felipe Augusto', ra: '0030481521009', curso: 'ADS', semestre: '6',
      periodo: 3, dataVestibular: '01/01/2015'},
      { nome: 'Felipe Augusto', ra: '0030481521009', curso: 'ADS', semestre: '6',
      periodo: 3, dataVestibular: '01/01/2015'},
      { nome: 'Felipe Augusto', ra: '0030481521009', curso: 'ADS', semestre: '6',
      periodo: 3, dataVestibular: '01/01/2015'},
      { nome: 'Felipe Augusto', ra: '0030481521009', curso: 'ADS', semestre: '6',
      periodo: 3, dataVestibular: '01/01/2015'},

  ];
  cabecalhoElementos = ['Nome', 'RA', 'Curso', 'Semestre', 'Período', 'Data Vestibular', 'Ações'];

  ngOnInit(){
   
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
