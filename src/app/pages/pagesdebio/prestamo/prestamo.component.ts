import { Component, OnInit } from '@angular/core';
import { Prestamo, PrestamoService } from 'src/app/services/Prestamo.service';


@Component({
  selector: 'app-prestamo',
  templateUrl: './prestamo.component.html',
  styleUrls: ['./prestamo.component.scss']
})
export class PrestamoComponent implements OnInit {
  prestamos: Prestamo[] = [];

  showModal = false;
  isEditing = false;
  currentPrestamoId: number | null = null;

  formData = {
    usuarioID: 0,
    libroID: 0,
    fechaPrestamo: '',
    fechaDevolucion: '',
    devuelto: false
  };

  constructor(private prestamoService: PrestamoService) {}

  ngOnInit(): void {
    this.getPrestamos();
  }

  getPrestamos(): void {
    this.prestamoService.getPrestamos().subscribe(data => {
      this.prestamos = data;
    });
  }

  openModal(editing: boolean, prestamo?: Prestamo): void {
    this.isEditing = editing;
    this.showModal = true;

    if (editing && prestamo) {
      this.formData = {
        usuarioID: prestamo.usuarioID,
        libroID: prestamo.libroID,
        fechaPrestamo: prestamo.fechaPrestamo,
        fechaDevolucion: prestamo.fechaDevolucion || '',
        devuelto: prestamo.devuelto
      };
      this.currentPrestamoId = prestamo.prestamoID;
    } else {
      this.formData = {
        usuarioID: 0,
        libroID: 0,
        fechaPrestamo: '',
        fechaDevolucion: '',
        devuelto: false
      };
      this.currentPrestamoId = null;
    }
  }

  closeModal(): void {
    this.showModal = false;
  }

  savePrestamo(): void {
    const { usuarioID, libroID, fechaPrestamo, fechaDevolucion, devuelto } = this.formData;

    if (!usuarioID || !libroID || !fechaPrestamo) {
      alert('Por favor complete todos los campos obligatorios.');
      return;
    }

    const payload = { usuarioID, libroID, fechaPrestamo, fechaDevolucion, devuelto };

    if (this.isEditing && this.currentPrestamoId !== null) {
      this.prestamoService.updatePrestamo(this.currentPrestamoId, payload).subscribe(() => {
        this.getPrestamos();
        this.closeModal();
      });
    } else {
      this.prestamoService.createPrestamo(payload).subscribe(() => {
        this.getPrestamos();
        this.closeModal();
      });
    }
  }

  deletePrestamo(id: number): void {
    if (confirm('¿Está seguro de eliminar este préstamo?')) {
      this.prestamoService.deletePrestamo(id).subscribe(() => {
        this.getPrestamos();
      });
    }
  }
}
