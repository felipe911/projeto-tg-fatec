import { Component, OnInit } from '@angular/core';

/*
declare var $: JQuery ;
$("#input-cep").mask("00000-000");
*/

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {

  titulo = 'Empresa';
  
  constructor() { }

  ngOnInit() {
  }

}
