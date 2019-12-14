import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, ModalOptions, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { ContratoService } from 'src/app/service/contrato.service';
import { ContratoConsultaMediator } from 'src/app/mediators/ContratoConsultaMediator';
import { Empresa } from 'src/app/model/Empresa';
import { Contrato } from 'src/app/model/Contrato';
import { Aluno } from 'src/app/model/Aluno';

@Component({
  selector: 'app-contrato-pesquisa-datatable',
  templateUrl: './contrato-pesquisa-datatable.component.html',
  styleUrls: ['./contrato-pesquisa-datatable.component.css']
})
export class ContratoPesquisaDatatableComponent implements OnInit {

  constructor(private modalService: BsModalService, private router: Router, private contratoService: ContratoService) { }

  cabecalhoElementos = ['Aluno', 'Empresa Associada', 'Curso', 'Data Início', 'Data Fim', 'Status', 'Agente de Integração', 'Supervisor', 'Ações'];

  idSelecionado: number;
  titulo: String = 'Consultar Contratos'

  contratos: ContratoConsultaMediator[];

  empresa = new Empresa();
  contrato = new Contrato();
  aluno = new Aluno();

  btnSim: boolean = true;
  btnNao: boolean = true;
  btnOk: boolean = false;
  mensagemModal: String;

  modalConfirm: BsModalRef;
  modalVis: BsModalRef;
  message: String;


  ngOnInit() {

    this.listarContratos();

  }
  
  listarContratos(){
    this.contratoService.listar().subscribe(
  
      contratosConsulta => {
        this.contratos = contratosConsulta;
      }
    ) 
  }

  editarContrato(id){
    this.router.navigate(['contrato/editar/', id]);
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

    this.buscaDadosContrato(id);
    
  }

  buscaDadosContrato(id){

    this.contratoService.buscaPorIdEditarContrato(id).subscribe(

      estagio => {
        this.contrato = estagio.contrato;
        this.empresa = estagio.contrato.empresa;
        this.aluno = estagio.aluno;
      },
      error =>{
        alert('Erro na Requisição');
      }
    )
  }

  confirmarExclusao(): void {
    this.contratoService.deletar(this.idSelecionado).subscribe(
      sucess => {
        this.mensagemModal = "Contrato deletado com sucesso";
        this.listarContratos();
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
