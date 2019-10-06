import { Component, OnInit, TemplateRef} from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-historico-estagio',
  templateUrl: './historico-estagio.component.html',
  styleUrls: ['./historico-estagio.component.css']
})
export class HistoricoEstagioComponent implements OnInit {

  modalRef: BsModalRef;
  modalRefChild: BsModalRef;
  modalRefHist: BsModalRef;
  modalConfirm: BsModalRef;

  message: string;
  
  constructor(private modalService: BsModalService) {}
 
  openModal(template: TemplateRef<any>) {
    const config: ModalOptions = { class: 'modal-lg' }
    this.modalRef = this.modalService.show(template, config);
  }

  openModalAddAtividade(template: TemplateRef<any>) {
    const config: ModalOptions = { 
      class: 'second modal-lg',
      backdrop: true
    }

    this.modalRefChild = this.modalService.show(template, config);
  }

  openModalHistorico(template: TemplateRef<any>) {
    const config: ModalOptions = { class: 'modal-lg' }
    this.modalRefHist = this.modalService.show(template, config);
  }

  openModalConfirm(template: TemplateRef<any>) {
    const config: ModalOptions = { class: 'modal-sm' }
    this.modalConfirm = this.modalService.show(template, config);
  }

  confirm(): void {
    this.message = 'Sim';
    this.modalConfirm.hide();
  }
 
  decline(): void {
    this.message = 'Não';
    this.modalConfirm.hide();
  }

  ngOnInit() {
  }

}
