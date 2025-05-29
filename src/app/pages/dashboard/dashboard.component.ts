import { Component, OnInit } from "@angular/core";
import Chart from 'chart.js';
import { Autor, AutorService } from "src/app/services/autor.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.component.html"
})
export class DashboardComponent implements OnInit {
   autores: Autor[] = [];

  showModal = false;
  isEditing = false;
  currentAutorId: number | null = null;

  formData = {
    nombre: '',
    apellido: ''
  };

  constructor(private autorService: AutorService) {}

  ngOnInit(): void {
    this.getAutores();
  }

  getAutores(): void {
    this.autorService.getAutores().subscribe(data => {
      this.autores = data;
    });
  }

  openModal(editing: boolean, autor?: Autor): void {
    this.isEditing = editing;
    this.showModal = true;
    if (editing && autor) {
      this.formData = { nombre: autor.nombre, apellido: autor.apellido };
      this.currentAutorId = autor.autorID;
    } else {
      this.formData = { nombre: '', apellido: '' };
      this.currentAutorId = null;
    }
  }

  closeModal(): void {
    this.showModal = false;
  }

  saveAutor(): void {
    const { nombre, apellido } = this.formData;
    if (this.isEditing && this.currentAutorId !== null) {
      this.autorService.updateAutor(this.currentAutorId, nombre, apellido).subscribe(() => {
        this.getAutores();
        this.closeModal();
      });
    } else {
      this.autorService.createAutor(nombre, apellido).subscribe(() => {
        this.getAutores();
        this.closeModal();
      });
    }
  }

  deleteAutor(id: number): void {
    if (confirm('¿Estás seguro de eliminar este autor?')) {
      this.autorService.deleteAutor(id).subscribe(() => {
        this.getAutores();
      });
    }
  }
}
