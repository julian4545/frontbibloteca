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
export class RolService {
  private apiUrl = 'https://localhost:7123/api/Rol';

  constructor(private http: HttpClient) {}

  getRoles(): Observable<Rol[]> {
    return this.http.get<Rol[]>(this.apiUrl);
  }

  getRolById(id: number): Observable<Rol> {
    return this.http.get<Rol>(`${this.apiUrl}/${id}`);
  }

  createRol(nombreRol: string): Observable<Rol> {
    const formData = new FormData();
    formData.append('nombreRol', nombreRol);  // Aquí debe ser 'nombreRol'
    return this.http.post<Rol>(this.apiUrl, formData);
  }

  updateRol(id: number, nombreRol?: string): Observable<Rol> {
    const formData = new FormData();
    if (nombreRol) formData.append('nombreRol', nombreRol);  // Igual, 'nombreRol'
    return this.http.put<Rol>(`${this.apiUrl}/${id}`, formData);
  }

  deleteRol(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
