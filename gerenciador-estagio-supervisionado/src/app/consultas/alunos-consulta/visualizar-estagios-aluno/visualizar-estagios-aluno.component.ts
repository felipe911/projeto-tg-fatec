import { Component, OnInit, TemplateRef } from '@angular/core';
import { ModalOptions, BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-visualizar-estagios-aluno',
  templateUrl: './visualizar-estagios-aluno.component.html',
  styleUrls: ['./visualizar-estagios-aluno.component.css']
})
export class VisualizarEstagiosAlunoComponent implements OnInit {

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
