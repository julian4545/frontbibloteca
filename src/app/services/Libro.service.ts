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
export class LibroService {
  private apiUrl = 'https://localhost:7123/api/Libro';

  constructor(private http: HttpClient) {}

  getLibros(): Observable<Libro[]> {
    return this.http.get<Libro[]>(this.apiUrl);
  }

  getLibroById(id: number): Observable<Libro> {
    return this.http.get<Libro>(`${this.apiUrl}/${id}`);
  }

  createLibro(libro: Partial<Libro>): Observable<Libro> {
    const formData = this.toFormData(libro);
    return this.http.post<Libro>(this.apiUrl, formData);
  }

  updateLibro(id: number, libro: Partial<Libro>): Observable<Libro> {
    const formData = this.toFormData(libro);
    return this.http.put<Libro>(`${this.apiUrl}/${id}`, formData);
  }

  deleteLibro(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  private toFormData(libro: Partial<Libro>): FormData {
    const formData = new FormData();
    if (libro.titulo) formData.append('titulo', libro.titulo);
    if (libro.isbn) formData.append('isbn', libro.isbn);

    if (libro.categoriaID !== undefined) formData.append('categoriaID', libro.categoriaID.toString());
    if (libro.autorID !== undefined) formData.append('autorID', libro.autorID.toString());
    if (libro.editorialID !== undefined) formData.append('editorialID', libro.editorialID.toString());
    formData.append('disponible', libro.disponible ? 'true' : 'false');
    return formData;
  }
}