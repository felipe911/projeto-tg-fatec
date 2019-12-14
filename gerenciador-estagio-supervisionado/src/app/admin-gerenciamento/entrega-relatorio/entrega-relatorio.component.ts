import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { EntregaRelatorioService } from 'src/app/service/entregaRelatorio.service';
import { EntregaRelatorioMediator } from 'src/app/mediators/EntregaRelatorioMediator';
import { Aluno } from 'src/app/model/Aluno';
import { Empresa } from 'src/app/model/Empresa';

@Component({
  selector: 'app-entrega-relatorio',
  templateUrl: './entrega-relatorio.component.html',
  styleUrls: ['./entrega-relatorio.component.css']
})
export class EntregaRelatorioComponent implements OnInit {

  constructor(private modalService: BsModalService, private router: Router, private entregaRelatorioService: EntregaRelatorioService) { }

  cabecalhoElementos = ['RA', 'Nome', 'Curso', 'Relatórios'];
  entregas: EntregaRelatorioMediator[];
  modalVis: BsModalRef;

  aluno: Aluno[];
  empresa: Empresa[];


  ngOnInit() {

    this.entregaRelatorioService.listar().subscribe(

      entrega => {
        this.entregas = entrega;
      }
    )

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
