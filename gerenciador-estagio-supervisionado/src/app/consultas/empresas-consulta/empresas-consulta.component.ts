import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empresas-consulta',
  templateUrl: './empresas-consulta.component.html',
  styleUrls: ['./empresas-consulta.component.css']
})
export class EmpresasConsultaComponent implements OnInit {

  titulo = 'Empresas'

  constructor(private router: Router) { }

  ngOnInit() {
  }

  getCadastrarEmpresa(){
    this.router.navigate(['cadastrar/empresa']);
  }

}
