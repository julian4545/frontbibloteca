import { Component, OnInit } from '@angular/core';
import { UsuarioRol, UsuarioRolService } from 'src/app/services/UsuarioRol.service';


@Component({
  selector: 'app-usuario-rol',
  templateUrl: './usuario-rol.component.html',
  styleUrls: ['./usuario-rol.component.scss']
})
export class UsuarioRolComponent implements OnInit {

  usuarioRoles: UsuarioRol[] = [];

  showModal = false;
  isEditing = false;
  currentUsuarioID: number | null = null;
  currentRolID: number | null = null;

  formData = {
    usuarioID: '',
    rolID: ''
  };

  constructor(private usuarioRolService: UsuarioRolService) {}

  ngOnInit(): void {
    this.getUsuarioRoles();
  }

  getUsuarioRoles(): void {
    this.usuarioRolService.getUsuarioRoles().subscribe(data => {
      this.usuarioRoles = data;
    });
  }

  openModal(editing: boolean, usuarioRol?: UsuarioRol): void {
    this.isEditing = editing;
    this.showModal = true;
    if (editing && usuarioRol) {
      this.formData = {
        usuarioID: usuarioRol.usuarioID.toString(),
        rolID: usuarioRol.rolID.toString()
      };
      this.currentUsuarioID = usuarioRol.usuarioID;
      this.currentRolID = usuarioRol.rolID;
    } else {
      this.formData = { usuarioID: '', rolID: '' };
      this.currentUsuarioID = null;
      this.currentRolID = null;
    }
  }

  closeModal(): void {
    this.showModal = false;
  }

  saveUsuarioRol(): void {
    const usuarioID = Number(this.formData.usuarioID);
    const rolID = Number(this.formData.rolID);

    if (this.isEditing && this.currentUsuarioID !== null && this.currentRolID !== null) {
      this.usuarioRolService.updateUsuarioRol(this.currentUsuarioID, this.currentRolID, usuarioID, rolID).subscribe(() => {
        this.getUsuarioRoles();
        this.closeModal();
      });
    } else {
      this.usuarioRolService.createUsuarioRol(usuarioID, rolID).subscribe(() => {
        this.getUsuarioRoles();
        this.closeModal();
      });
    }
  }

  deleteUsuarioRol(usuarioID: number, rolID: number): void {
    if (confirm('¿Estás seguro de eliminar esta relación Usuario-Rol?')) {
      this.usuarioRolService.deleteUsuarioRol(usuarioID, rolID).subscribe(() => {
        this.getUsuarioRoles();
      });
    }
  }
}
