import { Component, OnInit } from '@angular/core';
import { Notificacion, NotificacionService } from 'src/app/services/Notificacion.service';

@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.scss']
})
export class NotificacionComponent implements OnInit {

  notificaciones: Notificacion[] = [];
  showModal = false;
  isEditing = false;
  formData: Partial<Notificacion> = {
    usuarioID: 0,
    mensaje: '',
    fechaEnvio: '',
    leido: false
  };

  constructor(private notificacionService: NotificacionService) {}

  ngOnInit(): void {
    this.loadNotificaciones();
  }

  loadNotificaciones(): void {
    this.notificacionService.getNotificaciones().subscribe({
      next: (data) => this.notificaciones = data,
      error: (err) => console.error('Error al cargar notificaciones', err)
    });
  }

  openModal(editing: boolean, notificacion?: Notificacion): void {
    this.isEditing = editing;
    if (editing && notificacion) {
      this.formData = { ...notificacion };
      // Ajustar fechaEnvio para input datetime-local
      if (this.formData.fechaEnvio) {
        this.formData.fechaEnvio = this.formData.fechaEnvio.substring(0, 16);
      }
    } else {
      this.formData = {
        usuarioID: 0,
        mensaje: '',
        fechaEnvio: new Date().toISOString().substring(0, 16),
        leido: false
      };
    }
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  saveNotificacion(): void {
    if (this.isEditing && this.formData.notificacionID != null) {
      this.notificacionService.updateNotificacion(this.formData.notificacionID, this.formData).subscribe({
        next: () => {
          this.loadNotificaciones();
          this.closeModal();
        },
        error: (err) => console.error('Error actualizando notificación', err)
      });
    } else {
      this.notificacionService.createNotificacion(this.formData).subscribe({
        next: () => {
          this.loadNotificaciones();
          this.closeModal();
        },
        error: (err) => console.error('Error creando notificación', err)
      });
    }
  }

  deleteNotificacion(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta notificación?')) {
      this.notificacionService.deleteNotificacion(id).subscribe({
        next: () => this.loadNotificaciones(),
        error: (err) => console.error('Error eliminando notificación', err)
      });
    }
  }
}
