import { Injectable, EventEmitter } from '@angular/core';
import { Usuario } from './usuario';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarioAutenticado: boolean = false;
  mostrarMenuEmitter = new EventEmitter<boolean>();

  constructor(private router: Router) {

  }

  fazerLogin(usuario: Usuario) : boolean{
    if (usuario.nome === 'admin' && usuario.senha === 'admin') {

      this.usuarioAutenticado = true;
      this.router.navigate(['/']);
      this.mostrarMenuEmitter.emit(true);

      return true;

    } else {

      this.usuarioAutenticado = false;
      this.mostrarMenuEmitter.emit(false);

      return false;

    }
  }

  usuarioEstaAutenticado() : boolean {
    return this.usuarioAutenticado;
  }
}
