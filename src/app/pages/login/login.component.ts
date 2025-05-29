import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/Usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  contraseña = '';
  errorMessage = '';

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  login(): void {
    if (!this.email || !this.contraseña) {
      this.errorMessage = 'Todos los campos son obligatorios.';
      return;
    }

    this.usuarioService.loginUsuario(this.email, this.contraseña).subscribe(usuario => {
      if (usuario) {
        localStorage.setItem('usuario', JSON.stringify(usuario));
        this.router.navigate(['/dashboard']);
      } else {
        this.errorMessage = 'Correo o contraseña incorrectos.';
      }
    });
  }
}
