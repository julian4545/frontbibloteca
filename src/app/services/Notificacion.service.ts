import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// =======================
// INTERFACES DE MODELOS
// =======================

export interface Usuario {
  usuarioID: number;
  nombre: string;
  apellido: string;
  email: string;
  contraseña: string;
  fechaRegistro: string; // Date as ISO string
}

export interface Rol {
  rolID: number;
  nombreRol: string;
}

export interface UsuarioRol {
  usuarioID: number;
  rolID: number;
}

export interface Autor {
  autorID: number;
  nombre: string;
  apellido: string;
}

export interface Categoria {
  categoriaID: number;
  nombre: string;
}

export interface Editorial {
  editorialID: number;
  nombre: string;
  pais?: string;
  sitioWeb?: string;
}

export interface Libro {
  libroID: number;
  titulo: string;
  isbn: string;
  añoPublicacion?: number;
  categoriaID: number;
  autorID: number;
  editorialID: number;
  disponible: boolean;
}

export interface Prestamo {
  prestamoID: number;
  usuarioID: number;
  libroID: number;
  fechaPrestamo: string;
  fechaDevolucion?: string;
  devuelto: boolean;
}

export interface Entrega {
  entregaID: number;
  prestamoID: number;
  fechaEntrega: string;
  descripcion?: string;
  tarifaID?: number;
}

export interface Tarifa {
  tarifaID: number;
  nombre: string;
  descripcion?: string;
  monto: number;
}

export interface Reserva {
  reservaID: number;
  usuarioID: number;
  libroID: number;
  fechaReserva: string;
  estado: string;
}

export interface Reseña {
  reseñaID: number;
  usuarioID: number;
  libroID: number;
  calificacion: number;
  comentario?: string;
  fechaReseña: string;
}

export interface Multa {
  multaID: number;
  prestamoID: number;
  monto: number;
  pagado: boolean;
  fechaRegistro: string;
}

export interface Notificacion {
  notificacionID: number;
  usuarioID: number;
  mensaje: string;
  fechaEnvio: string;
  leido: boolean;
}



@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  private apiUrl = 'https://localhost:7123/api/Notificacion';

  constructor(private http: HttpClient) {}

  getNotificaciones(): Observable<Notificacion[]> {
    return this.http.get<Notificacion[]>(this.apiUrl);
  }

  getNotificacionById(id: number): Observable<Notificacion> {
    return this.http.get<Notificacion>(`${this.apiUrl}/${id}`);
  }

  createNotificacion(notificacion: Partial<Notificacion>): Observable<Notificacion> {
    const formData = this.buildFormData(notificacion);
    return this.http.post<Notificacion>(this.apiUrl, formData);
  }

  updateNotificacion(id: number, notificacion: Partial<Notificacion>): Observable<Notificacion> {
    const formData = this.buildFormData(notificacion);
    return this.http.put<Notificacion>(`${this.apiUrl}/${id}`, formData);
  }

  deleteNotificacion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  private buildFormData(notificacion: Partial<Notificacion>): FormData {
    const formData = new FormData();
    if (notificacion.usuarioID !== undefined && notificacion.usuarioID !== null) {
      formData.append('usuarioID', notificacion.usuarioID.toString());
    }
    if (notificacion.mensaje !== undefined) {
      formData.append('mensaje', notificacion.mensaje);
    }
    if (notificacion.fechaEnvio !== undefined) {
      formData.append('fechaEnvio', notificacion.fechaEnvio);
    }
    if (notificacion.leido !== undefined) {
      formData.append('leido', notificacion.leido ? 'true' : 'false');
    }
    return formData;
  }
}