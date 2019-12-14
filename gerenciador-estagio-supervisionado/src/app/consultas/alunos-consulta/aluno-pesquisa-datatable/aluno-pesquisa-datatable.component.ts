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
  
  idSelecionado: number;
  titulo: String = 'Alunos'

  btnSim: boolean = true;
  btnNao: boolean = true;
  btnOk: boolean = false;
  mensagemModal: String;

  modalVis: BsModalRef;
  modalConfirm: BsModalRef;
  alunos: Aluno[];

  cabecalhoElementos = ['Id','Nome', 'RA', 'Curso', 'Semestre', 'Período', 'Data Vestibular', 'Ações'];

  ngOnInit(){
    this.listarAlunos();
  }
  
  listarAlunos(){
    this.alunoService.listar().subscribe(
      alunos => {
        this.alunos = alunos;
      });
  }

  openModalVisualizar(template: TemplateRef<any>) {
    const config: ModalOptions = { class: 'modal-lg' }
    this.modalVis = this.modalService.show(template, config);
  }

  openModalConfirm(template: TemplateRef<any>, id: number) {
    this.mensagemModal = "Tem certeza que deseja excluir este registro ?"
    const config: ModalOptions = { class: 'modal-sm' }
    this.modalConfirm = this.modalService.show(template, config);

    this.idSelecionado = id;
  }

  editarAluno(id){
    this.router.navigate(['aluno/editar', id]);
  }

  confirmarExclusao(): void {
    this.alunoService.deletar(this.idSelecionado).subscribe(
      sucess => {
        this.mensagemModal = "Aluno deletado com sucesso";
        this.listarAlunos();
        this.renderizaBtnOk();
      },
      err => {
        this.mensagemModal = err.error.message;
        this.renderizaBtnOk();
      })

    this.renderizaBtnSimNao();
  }
    
  renderizaBtnOk(){
    this.btnNao = false;
    this.btnSim = false;
    this.btnOk = true;
  }

  renderizaBtnSimNao(){
    this.btnNao = true;
    this.btnSim = true;
    this.btnOk = false;
  }
 
  cancelarExclusao(): void {
    this.modalConfirm.hide();
    this.renderizaBtnSimNao();
  }

  getCadastrarAluno(){
    this.router.navigate(['cadastrar/aluno']);
  }

}
