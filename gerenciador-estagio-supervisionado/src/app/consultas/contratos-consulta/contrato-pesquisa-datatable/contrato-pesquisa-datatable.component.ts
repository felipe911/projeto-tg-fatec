import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, ModalOptions, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { ContratoService } from 'src/app/service/contrato.service';
import { ContratoConsultaMediator } from 'src/app/mediators/ContratoConsultaMediator';

@Component({
  selector: 'app-contrato-pesquisa-datatable',
  templateUrl: './contrato-pesquisa-datatable.component.html',
  styleUrls: ['./contrato-pesquisa-datatable.component.css']
})
export class ContratoPesquisaDatatableComponent implements OnInit {

  constructor(private modalService: BsModalService, private router: Router, private contratoService: ContratoService) { }

  cabecalhoElementos = ['Aluno', 'Empresa Associada', 'Curso', 'Data Início', 'Data Fim', 'Status', 'Agente de Integração', 'Supervisor', 'Ações'];

  titulo: String = 'Contratos'

  contratos: ContratoConsultaMediator[];

  modalConfirm: BsModalRef;
  modalVis: BsModalRef;
  message: String;


  ngOnInit() {

    this.contratoService.listar().subscribe(

      contratosConsulta => {
        this.contratos = contratosConsulta;
      }
    )

  }

  editarContrato(){
    this.router.navigate(['contrato/editar/1']);
  }

  openModalConfirm(template: TemplateRef<any>) {
    const config: ModalOptions = { class: 'modal-sm' }
    this.modalConfirm = this.modalService.show(template, config);
  }

  openModalVisualizar(template: TemplateRef<any>) {
    const config: ModalOptions = { class: 'modal-lg' }
    this.modalVis = this.modalService.show(template, config);
  }

  confirm(): void {
    this.message = 'Sim';
    this.modalConfirm.hide();
  }
 
  decline(): void {
    this.message = 'Não';
    this.modalConfirm.hide();
  }
}
