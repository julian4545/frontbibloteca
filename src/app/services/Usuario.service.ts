import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

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
export class UsuarioService {
  private apiUrl = 'https://localhost:7123/api/Usuario';

  constructor(private http: HttpClient) {}

  getUsuarios1(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  getUsuarioById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }

  createUsuario(usuario: Partial<Usuario>): Observable<Usuario> {
    const formData = this.buildFormData(usuario);
    return this.http.post<Usuario>(this.apiUrl, formData);
  }

  updateUsuario(id: number, usuario: Partial<Usuario>): Observable<Usuario> {
    const formData = this.buildFormData(usuario);
    return this.http.put<Usuario>(`${this.apiUrl}/${id}`, formData);
  }

  deleteUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Método auxiliar para convertir el objeto usuario en FormData
  private buildFormData(usuario: Partial<Usuario>): FormData {
    const formData = new FormData();
    Object.keys(usuario).forEach(key => {
      const value = usuario[key as keyof Usuario];
      if (value !== null && value !== undefined) {
        formData.append(key, value.toString());
      }
    });
    return formData;
  }
  

loginUsuario(email: string, contraseña: string): Observable<Usuario | null> {
  return this.http.get<Usuario[]>(`${this.apiUrl}?email=${email}&contraseña=${contraseña}`).pipe(
    map(usuarios => usuarios.length > 0 ? usuarios[0] : null)
  );
}

}
