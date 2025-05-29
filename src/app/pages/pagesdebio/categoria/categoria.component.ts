import { Component, OnInit } from '@angular/core';
import { Categoria, CategoriaService } from 'src/app/services/Categoria.service';


@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent implements OnInit {

  categorias: Categoria[] = [];

  showModal = false;
  isEditing = false;
  currentCategoriaId: number | null = null;

  formData = {
    nombre: ''
  };

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.getCategorias();
  }

  getCategorias(): void {
    this.categoriaService.getCategorias().subscribe(data => {
      this.categorias = data;
    });
  }

  openModal(editing: boolean, categoria?: Categoria): void {
    this.isEditing = editing;
    this.showModal = true;
    if (editing && categoria) {
      this.formData = { nombre: categoria.nombre };
      this.currentCategoriaId = categoria.categoriaID;
    } else {
      this.formData = { nombre: '' };
      this.currentCategoriaId = null;
    }
  }

  closeModal(): void {
    this.showModal = false;
  }

  saveCategoria(): void {
    const { nombre } = this.formData;
    if (this.isEditing && this.currentCategoriaId !== null) {
      this.categoriaService.updateCategoria(this.currentCategoriaId, nombre).subscribe(() => {
        this.getCategorias();
        this.closeModal();
      });
    } else {
      this.categoriaService.createCategoria(nombre).subscribe(() => {
        this.getCategorias();
        this.closeModal();
      });
    }
  }

  deleteCategoria(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta categoría?')) {
      this.categoriaService.deleteCategoria(id).subscribe(() => {
        this.getCategorias();
      });
    }
  }
}
