import { Component, OnInit } from '@angular/core';
import { EditorialService } from 'src/app/services/Editorial.service';


export interface Editorial {
  editorialID: number;
  nombre: string;
  pais?: string;
  sitioWeb?: string;
}

@Component({
  selector: 'app-editorial',
  templateUrl: './editorial.component.html',
  styleUrls: ['./editorial.component.scss']
})
export class EditorialComponent implements OnInit {

  editoriales: Editorial[] = [];

  showModal = false;
  isEditing = false;
  currentEditorialId: number | null = null;

  formData = {
    nombre: '',
    pais: '',
    sitioWeb: ''
  };

  constructor(private editorialService: EditorialService) {}

  ngOnInit(): void {
    this.getEditoriales();
  }

  getEditoriales(): void {
    this.editorialService.getEditoriales().subscribe(data => {
      this.editoriales = data;
    });
  }

  openModal(editing: boolean, editorial?: Editorial): void {
    this.isEditing = editing;
    this.showModal = true;
    if (editing && editorial) {
      this.formData = {
        nombre: editorial.nombre,
        pais: editorial.pais || '',
        sitioWeb: editorial.sitioWeb || ''
      };
      this.currentEditorialId = editorial.editorialID;
    } else {
      this.formData = { nombre: '', pais: '', sitioWeb: '' };
      this.currentEditorialId = null;
    }
  }

  closeModal(): void {
    this.showModal = false;
  }

  saveEditorial(): void {
    const { nombre, pais, sitioWeb } = this.formData;
    if (this.isEditing && this.currentEditorialId !== null) {
      this.editorialService.updateEditorial(this.currentEditorialId, nombre, pais, sitioWeb).subscribe(() => {
        this.getEditoriales();
        this.closeModal();
      });
    } else {
      this.editorialService.createEditorial(nombre, pais, sitioWeb).subscribe(() => {
        this.getEditoriales();
        this.closeModal();
      });
    }
  }

  deleteEditorial(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta editorial?')) {
      this.editorialService.deleteEditorial(id).subscribe(() => {
        this.getEditoriales();
      });
    }
  }
}
