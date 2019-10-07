import { Router } from '@angular/router';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { ModalOptions, BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-empresas-consulta',
  templateUrl: './empresas-consulta.component.html',
  styleUrls: ['./empresas-consulta.component.css']
})
export class EmpresasConsultaComponent implements OnInit {
 
  modalConfirm: BsModalRef;
  modalVis: BsModalRef;
  titulo: String = 'Empresas'
  message: String;

  constructor(private modalService: BsModalService,private router: Router) { }

  ngOnInit() {
  }

  editarAluno(){
    this.router.navigate(['editar/empresa/1']);
  }

  confirm(): void {
    this.message = 'Sim';
    this.modalConfirm.hide();
  }
 
  decline(): void {
    this.message = 'Não';
    this.modalConfirm.hide();
  }

  getCadastrarEmpresa(){
    this.router.navigate(['cadastrar/empresa']);
  }

  openModalConfirm(template: TemplateRef<any>) {
    const config: ModalOptions = { class: 'modal-sm' }
    this.modalConfirm = this.modalService.show(template, config);
  }

  openModalVisualizar(template: TemplateRef<any>) {
    const config: ModalOptions = { class: 'modal-lg' }
    this.modalVis = this.modalService.show(template, config);
  }

}
