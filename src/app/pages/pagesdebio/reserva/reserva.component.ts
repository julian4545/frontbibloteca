import { Component, OnInit } from '@angular/core';
import { Reserva, ReservaService } from 'src/app/services/Reserva.service';


@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html'
})
export class ReservaComponent implements OnInit {
  reservas: Reserva[] = [];
  showModal = false;
  isEditing = false;
  formData: Partial<Reserva> = {};

  constructor(private reservaService: ReservaService) {}

  ngOnInit(): void {
    this.getReservas();
  }

  getReservas(): void {
    this.reservaService.getReservas().subscribe((data) => {
      this.reservas = data;
    });
  }

  openModal(edit: boolean, reserva?: Reserva): void {
    this.isEditing = edit;
    this.showModal = true;
    this.formData = edit && reserva ? { ...reserva } : {};
  }

  closeModal(): void {
    this.showModal = false;
    this.formData = {};
  }

  saveReserva(): void {
    if (this.isEditing && this.formData.reservaID != null) {
      this.reservaService.updateReserva(this.formData.reservaID, this.formData).subscribe(() => {
        this.getReservas();
        this.closeModal();
      });
    } else {
      this.reservaService.createReserva(this.formData).subscribe(() => {
        this.getReservas();
        this.closeModal();
      });
    }
  }

  deleteReserva(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta reserva?')) {
      this.reservaService.deleteReserva(id).subscribe(() => {
        this.getReservas();
      });
    }
  }
}
