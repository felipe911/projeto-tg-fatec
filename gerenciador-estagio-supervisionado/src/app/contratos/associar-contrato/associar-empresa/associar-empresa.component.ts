import { Component, OnInit } from '@angular/core';
import { Empresa } from 'src/app/cadastros/empresas/Empresa';
import { EmpresaService } from 'src/app/service/empresa.service';

@Component({
  selector: 'app-associar-empresa',
  templateUrl: './associar-empresa.component.html',
  styleUrls: ['./associar-empresa.component.css']
})
export class AssociarEmpresaComponent implements OnInit {

  empresas: Empresa[];
  empresa: Empresa = new Empresa();

  constructor(private empresaService: EmpresaService) { }

  ngOnInit() {
    this.empresaService.listar()
    .then(
      empresas => {
        this.empresas = empresas.content;
      }
    )
    ;

  }

}
