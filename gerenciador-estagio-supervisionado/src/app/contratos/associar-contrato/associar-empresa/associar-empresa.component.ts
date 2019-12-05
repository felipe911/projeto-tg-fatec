import { Component, OnInit } from '@angular/core';
import { EmpresaService } from 'src/app/service/empresa.service';
import { Empresa } from 'src/app/model/Empresa';

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
    );
  }

  buscaPorRazaoSocial(){
    this.empresaService.buscaPorRazaoSocial(this.empresa).subscribe(
      empresaEncontrada => {
        this.empresa = empresaEncontrada;
      }
    )
  }

}
