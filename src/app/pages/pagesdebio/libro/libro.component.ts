import { Component, OnInit } from '@angular/core';
import { Libro, LibroService } from 'src/app/services/Libro.service';


@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.scss']
})
export class LibroComponent implements OnInit {

  libros: Libro[] = [];
  showModal = false;
  isEditing = false;
  currentLibroID: number | null = null;

  formData: Partial<Libro> = {
    titulo: '',
    isbn: '',

    categoriaID: 0,
    autorID: 0,
    editorialID: 0,
    disponible: true
  };

  constructor(private libroService: LibroService) {}

  ngOnInit(): void {
    this.getLibros();
  }

  getLibros(): void {
    this.libroService.getLibros().subscribe(data => {
      this.libros = data;
    });
  }

  openModal(editing: boolean, libro?: Libro): void {
    this.isEditing = editing;
    this.showModal = true;
    if (editing && libro) {
      this.formData = { ...libro };
      this.currentLibroID = libro.libroID;
    } else {
      this.formData = {
        titulo: '',
        isbn: '',
  
        categoriaID: 0,
        autorID: 0,
        editorialID: 0,
        disponible: true
      };
      this.currentLibroID = null;
    }
  }

  closeModal(): void {
    this.showModal = false;
  }

  saveLibro(): void {
    if (this.isEditing && this.currentLibroID !== null) {
      this.libroService.updateLibro(this.currentLibroID, this.formData).subscribe(() => {
        this.getLibros();
        this.closeModal();
      });
    } else {
      this.libroService.createLibro(this.formData).subscribe(() => {
        this.getLibros();
        this.closeModal();
      });
    }
  }

  deleteLibro(id: number): void {
    if (confirm('¿Estás seguro de eliminar este libro?')) {
      this.libroService.deleteLibro(id).subscribe(() => {
        this.getLibros();
      });
    }
  }
}
