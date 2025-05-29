import { Component, OnInit } from '@angular/core';
import { Usuario, UsuarioService } from 'src/app/services/Usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
  usuarios: Usuario[] = [];

  showModal = false;
  isEditing = false;
  currentUsuarioId: number | null = null;

  formData: Partial<Usuario> = {
    nombre: '',
    apellido: '',
    email: '',
    // contraseña se define internamente
  };

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios(): void {
    this.usuarioService.getUsuarios1().subscribe(data => {
      this.usuarios = data;
    });
  }

  openModal(editing: boolean, usuario?: Usuario): void {
    this.isEditing = editing;
    this.showModal = true;

    if (editing && usuario) {
      this.formData = {
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email
      };
      this.currentUsuarioId = usuario.usuarioID;
    } else {
      this.formData = {
        nombre: '',
        apellido: '',
        email: ''
      };
      this.currentUsuarioId = null;
    }
  }

  closeModal(): void {
    this.showModal = false;
  }

  saveUsuario(): void {
    if (!this.formData.nombre || !this.formData.apellido || !this.formData.email) {
      alert('Por favor complete todos los campos obligatorios.');
      return;
    }

    const payload: Partial<Usuario> = {
      ...this.formData,
      contraseña: '123456' // contraseña quemada
    };

    if (this.isEditing && this.currentUsuarioId !== null) {
      this.usuarioService.updateUsuario(this.currentUsuarioId, payload).subscribe(() => {
        this.getUsuarios();
        this.closeModal();
      });
    } else {
      this.usuarioService.createUsuario(payload).subscribe(() => {
        this.getUsuarios();
        this.closeModal();
      });
    }
  }

  deleteUsuario(id: number): void {
    if (confirm('¿Está seguro de eliminar este usuario?')) {
      this.usuarioService.deleteUsuario(id).subscribe(() => {
        this.getUsuarios();
      });
    }
  }
}
