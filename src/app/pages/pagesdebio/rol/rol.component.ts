import { Component, OnInit } from '@angular/core';
import { Rol, RolService } from 'src/app/services/rol.service';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.scss']
})
export class RolComponent implements OnInit {

  roles: Rol[] = [];

  showModal = false;
  isEditing = false;
  currentRolId: number | null = null;

  formData = {
    nombreRol: ''
  };

  constructor(private rolService: RolService) {}

  ngOnInit(): void {
    this.getRoles();
  }

  getRoles(): void {
    this.rolService.getRoles().subscribe(data => {
      this.roles = data;
    });
  }

  openModal(editing: boolean, rol?: Rol): void {
    this.isEditing = editing;
    this.showModal = true;
    if (editing && rol) {
      this.formData = { nombreRol: rol.nombreRol };
      this.currentRolId = rol.rolID;
    } else {
      this.formData = { nombreRol: '' };
      this.currentRolId = null;
    }
  }

  closeModal(): void {
    this.showModal = false;
  }

  saveRol(): void {
    const { nombreRol } = this.formData;

    if (this.isEditing && this.currentRolId !== null) {
      this.rolService.updateRol(this.currentRolId, nombreRol).subscribe(() => {
        this.getRoles();
        this.closeModal();
      });
    } else {
      this.rolService.createRol(nombreRol).subscribe(() => {
        this.getRoles();
        this.closeModal();
      });
    }
  }

  deleteRol(id: number): void {
    if (confirm('¿Estás seguro de eliminar este rol?')) {
      this.rolService.deleteRol(id).subscribe(() => {
        this.getRoles();
      });
    }
  }

}
