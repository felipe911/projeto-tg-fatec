import { Component, OnInit,  TemplateRef  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';

import { Aluno } from './Aluno';
import { AlunoService } from 'src/app/service/aluno.service';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})

export class AlunosComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private alunoService: AlunoService, private modalService: BsModalService) { }

  titulo: String = 'Cadastrar Aluno';
  aluno = new Aluno();
  modalPosReq: BsModalRef;
  mensagemPosReq: String;


  cursos = ['ADS', 'Eletrônica Automotiva',
            'Fabricação Mecânica', 'Logistica', 'Manufatura Avançada', 'Polímeros',
            'Processos Metalúrgicos', 'Projetos Mecânicos', 'Sistemas Biomédicos'];

  semestres = ['1. Semestre', '2. Semestre', '3. Semestre', '4. Semestre', '5. Semestre', '6. Semestre'];

  periodos = ['Manhã', 'Tarde', 'Noite'];

  salvar(template: TemplateRef<any>, form: NgForm){

    if(this.verificaCamposObrigatorios()){
      if(this.verificaRa()){

        this.alunoService.salvar(this.aluno).subscribe(
        
          sucess => {
            this.mensagemPosReq = 'Aluno cadastrado com sucesso.'
            this.modalPosRequisicao(template);
            
            form.reset();
            this.aluno = new Aluno();
            
          },
          error => {
            this.mensagemPosReq = 'Já existe um aluno registrado com este RA.'
            this.modalPosRequisicao(template);
          });
        } else{
          this.mensagemPosReq = 'O RA precisa de no mínimo 13 números.'
          this.modalPosRequisicao(template);
      }
    } else {
      this.mensagemPosReq = 'Existem campos obrigatórios que não foram preenchidos/selecionados.'
      this.modalPosRequisicao(template);
    }
  }

  verificaRa(): Boolean{
    if(this.aluno.ra.length == 13)
      return true;

    return false
  }

  verificaCamposObrigatorios(): Boolean{

    if(this.aluno.nome == undefined || this.aluno.nome == "" || this.aluno.ra == undefined ||  this.aluno.ra == "" || this.aluno.curso == undefined || this.aluno.semestre == undefined ||
       this.aluno.periodo == undefined || this.aluno.email == undefined || this.aluno.email == "" || this.aluno.telefone == undefined || this.aluno.telefone == "" || this.aluno.sexo == undefined ||
       this.aluno.dataVestibular == undefined )
      return false;

    return true;
  }

  modalPosRequisicao(template: TemplateRef<any>){
    const config: ModalOptions = { class: 'modal-md' }
    this.modalPosReq = this.modalService.show(template, config);
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
