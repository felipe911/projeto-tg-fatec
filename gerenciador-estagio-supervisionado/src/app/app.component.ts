import { Component } from '@angular/core';
import { AuthService } from './login/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Gerenciador de Estágio Supervisionado';
  mostrarMenu: boolean = false;

  constructor(
    private authService: AuthService
    ){}

  ngOnInit(){
    this.authService.mostrarMenuEmitter.subscribe(
      mostrar => this.mostrarMenu = mostrar
    );
  }

}
