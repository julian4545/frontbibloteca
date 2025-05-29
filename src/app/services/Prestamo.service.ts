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

// =======================
// SERVICIOS
// =======================


@Injectable({
  providedIn: 'root'
})
export class PrestamoService {
  private apiUrl = 'https://localhost:7123/api/Prestamo';

  constructor(private http: HttpClient) {}

  getPrestamos(): Observable<Prestamo[]> {
    return this.http.get<Prestamo[]>(this.apiUrl);
  }

  getPrestamoById(id: number): Observable<Prestamo> {
    return this.http.get<Prestamo>(`${this.apiUrl}/${id}`);
  }

  createPrestamo(prestamo: Partial<Prestamo>): Observable<Prestamo> {
    const formData = this.buildFormData(prestamo);
    return this.http.post<Prestamo>(this.apiUrl, formData);
  }

  updatePrestamo(id: number, prestamo: Partial<Prestamo>): Observable<Prestamo> {
    const formData = this.buildFormData(prestamo);
    return this.http.put<Prestamo>(`${this.apiUrl}/${id}`, formData);
  }

  deletePrestamo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  private buildFormData(prestamo: Partial<Prestamo>): FormData {
    const formData = new FormData();
    if (prestamo.usuarioID !== undefined) {
      formData.append('usuarioID', prestamo.usuarioID.toString());
    }
    if (prestamo.libroID !== undefined) {
      formData.append('libroID', prestamo.libroID.toString());
    }
    if (prestamo.fechaPrestamo) {
      formData.append('fechaPrestamo', prestamo.fechaPrestamo);
    }
    if (prestamo.fechaDevolucion) {
      formData.append('fechaDevolucion', prestamo.fechaDevolucion);
    }
    formData.append('devuelto', prestamo.devuelto ? 'true' : 'false');
    return formData;
  }
}