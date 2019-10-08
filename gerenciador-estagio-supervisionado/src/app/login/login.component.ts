import { Component, OnInit, TemplateRef } from '@angular/core';
import { AuthService } from './auth.service';
import { Usuario } from './usuario';
import { BsModalRef, ModalOptions, BsModalService } from 'ngx-bootstrap/modal';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  modalErroLogin: BsModalRef;
  private usuario: Usuario = new Usuario();
  private log: boolean;

  constructor(private authService: AuthService, private modalService: BsModalService) { }

  ngOnInit() {
  }

  login(template: TemplateRef<any>){
    this.log = this.authService.fazerLogin(this.usuario);

    if(this.log === false){

      const config: ModalOptions = { class: 'modal-sm' }
      this.modalErroLogin = this.modalService.show(template, config);
      
    }
  }

}
