import { Router } from '@angular/router';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { ModalOptions, BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EmpresaService } from 'src/app/service/empresa.service';
import { Empresa } from 'src/app/model/Empresa';
import { Aluno } from 'src/app/model/Aluno';

@Component({
  selector: 'app-empresa-pesquisa-datatable',
  templateUrl: './empresa-pesquisa-datatable.component.html',
  styleUrls: ['./empresa-pesquisa-datatable.component.css']
})
export class EmpresaPesquisaDatatableComponent implements OnInit {

  constructor(private modalService: BsModalService, private router: Router, private empresaService: EmpresaService) { }

  cabecalhoElementos = ['Id', 'Razão Social', 'Convênio até', 'Cidade', 'Qtd. Estagiários Ativos', 'Ações'];
  cabecalhoElementosEstagiarios = ['Nome', 'Ra', 'Curso', 'Semestre'];
  
  idSelecionado: number;
  modalConfirm: BsModalRef;
  modalVis: BsModalRef;
  titulo: String = 'Empresas'

  btnSim: boolean = true;
  btnNao: boolean = true;
  btnOk: boolean = false;
  mensagemModal: String;

  empresas: Empresa[];
  empresa: Empresa;
  alunos: Aluno[];

  ngOnInit() {

    this.listarEmpresas();

  }
  

  listarEmpresas(){
    this.empresaService.listar().subscribe(
      empresas => {
        this.empresas = empresas;
      });
  }

  editarEmpresa(id){
    this.router.navigate(['empresa/editar/', id]);
  }

  getCadastrarEmpresa(){
    this.router.navigate(['cadastrar/empresa']);
  }

  openModalConfirm(template: TemplateRef<any>, id) {
    this.mensagemModal = "Tem certeza que deseja excluir este registro ?"
    const config: ModalOptions = { class: 'modal-sm' }
    this.modalConfirm = this.modalService.show(template, config);

    this.idSelecionado = id;
  }

  openModalVisualizar(template: TemplateRef<any>, id) {
    const config: ModalOptions = { class: 'modal-lg' }
    this.modalVis = this.modalService.show(template, config);

    this.buscaDadosEmpresa(id);
  }

  buscaDadosEmpresa(id){

    this.empresaService.buscarAlunosDaEmpresa(id).subscribe(

      dados => {
        this.empresa = dados.empresa;
        this.alunos = dados.alunos;
      },
      error =>{
        alert('Erro na Requisição');
      }
    )

  }

  confirmarExclusao(): void {
    this.empresaService.deletar(this.idSelecionado).subscribe(
      sucess => {
        this.mensagemModal = "Empresa deletada com sucesso";
        this.listarEmpresas();
        this.renderizaBtnOk();
      },
      err => {
        this.mensagemModal = err.error.message;
        this.renderizaBtnOk();
      })

    this.renderizaBtnSimNao();
  }

  cancelarExclusao(): void {
    this.modalConfirm.hide();
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

}
