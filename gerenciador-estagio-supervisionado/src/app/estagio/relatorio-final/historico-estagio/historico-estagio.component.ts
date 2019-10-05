import { Component, OnInit, TemplateRef} from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-historico-estagio',
  templateUrl: './historico-estagio.component.html',
  styleUrls: ['./historico-estagio.component.css']
})
export class HistoricoEstagioComponent implements OnInit {
  modalRef: BsModalRef;
  
  constructor(private modalService: BsModalService) {}
 
  openModal(template: TemplateRef<any>) {
    const config: ModalOptions = { class: 'modal-lg' }
    this.modalRef = this.modalService.show(template, config);
  }

  ngOnInit() {
  }

}
