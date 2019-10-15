import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entrega-relatorio',
  templateUrl: './entrega-relatorio.component.html',
  styleUrls: ['./entrega-relatorio.component.css']
})
export class EntregaRelatorioComponent implements OnInit {

  modalVis: BsModalRef;

  constructor(private modalService: BsModalService, private router: Router) { }

  ngOnInit() {
  }

  visualizarRelatorioParcial(){
    this.router.navigate(['aluno/relatorio-parcial/1']);
    this.modalVis.hide();
  }

  openModalVisualizarRelatorios(template: TemplateRef<any>) {
    const config: ModalOptions = { class: 'modal-lg' }
    this.modalVis = this.modalService.show(template, config);
  }

}
