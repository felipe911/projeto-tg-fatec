import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, ModalOptions, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contratos-consulta',
  templateUrl: './contratos-consulta.component.html',
  styleUrls: ['./contratos-consulta.component.css']
})
export class ContratosConsultaComponent implements OnInit {

  titulo: String = 'Contratos'

  modalConfirm: BsModalRef;
  modalVis: BsModalRef;
  message: String;

  constructor(private modalService: BsModalService, private router: Router) { }

  ngOnInit() {
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