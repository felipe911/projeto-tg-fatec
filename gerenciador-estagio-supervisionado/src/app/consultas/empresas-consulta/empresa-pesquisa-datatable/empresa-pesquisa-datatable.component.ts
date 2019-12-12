import { Router } from '@angular/router';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { ModalOptions, BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EmpresaService } from 'src/app/service/empresa.service';
import { Empresa } from 'src/app/model/Empresa';

@Component({
  selector: 'app-empresa-pesquisa-datatable',
  templateUrl: './empresa-pesquisa-datatable.component.html',
  styleUrls: ['./empresa-pesquisa-datatable.component.css']
})
export class EmpresaPesquisaDatatableComponent implements OnInit {

  constructor(private modalService: BsModalService, private router: Router, private empresaService: EmpresaService) { }

  modalConfirm: BsModalRef;
  modalVis: BsModalRef;
  titulo: String = 'Empresas'
  message: String;

  empresas: Empresa[];

  cabecalhoElementos = ['Razão Social', 'Convênio até', 'Cidade', 'Qtd. Estagiários Ativos', 'Ações'];

  ngOnInit() {

    this.empresaService.listar().subscribe(
      empresas => {
        this.empresas = empresas;
      });
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
