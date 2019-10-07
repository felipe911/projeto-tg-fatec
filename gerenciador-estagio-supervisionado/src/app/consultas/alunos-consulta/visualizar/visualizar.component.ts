import { Component, OnInit, TemplateRef } from '@angular/core';
import { ModalOptions, BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-visualizar',
  templateUrl: './visualizar.component.html',
  styleUrls: ['./visualizar.component.css']
})
export class VisualizarComponent implements OnInit {

  modalVisuAtividades: BsModalRef;

  constructor(private modalService: BsModalService) {
    
  }

  ngOnInit() {
  }

  openModalVisualizar(template: TemplateRef<any>) {
    const config: ModalOptions = { class: 'modal-lg' }
    this.modalVisuAtividades = this.modalService.show(template, config);
  }

}
