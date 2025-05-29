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
export class EntregaService {
  private apiUrl = 'https://localhost:7123/api/Entrega';

  constructor(private http: HttpClient) {}

  getEntregas(): Observable<Entrega[]> {
    return this.http.get<Entrega[]>(this.apiUrl);
  }

  getEntregaById(id: number): Observable<Entrega> {
    return this.http.get<Entrega>(`${this.apiUrl}/${id}`);
  }

  createEntrega(prestamoID: number, fechaEntrega: string, descripcion: string, tarifaID?: number): Observable<Entrega> {
    const formData = new FormData();
    formData.append('prestamoID', prestamoID.toString());
    formData.append('fechaEntrega', fechaEntrega);
    formData.append('descripcion', descripcion);
    if (tarifaID !== undefined && tarifaID !== null) {
      formData.append('tarifaID', tarifaID.toString());
    }
    return this.http.post<Entrega>(this.apiUrl, formData);
  }

  updateEntrega(id: number, prestamoID: number, fechaEntrega: string, descripcion: string, tarifaID?: number): Observable<Entrega> {
    const formData = new FormData();
    formData.append('prestamoID', prestamoID.toString());
    formData.append('fechaEntrega', fechaEntrega);
    formData.append('descripcion', descripcion);
    if (tarifaID !== undefined && tarifaID !== null) {
      formData.append('tarifaID', tarifaID.toString());
    }
    return this.http.put<Entrega>(`${this.apiUrl}/${id}`, formData);
  }

  deleteEntrega(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}