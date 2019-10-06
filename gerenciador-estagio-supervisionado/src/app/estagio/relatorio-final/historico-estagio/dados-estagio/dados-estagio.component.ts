import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-dados-estagio',
  templateUrl: './dados-estagio.component.html',
  styleUrls: ['./dados-estagio.component.css']
})
export class DadosEstagioComponent implements OnInit {

  modalVisualizarRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }

  openModalVisualizar(template: TemplateRef<any>) {
    const config: ModalOptions = { class: 'modal-lg' }
    this.modalVisualizarRef = this.modalService.show(template, config);
  }

}
