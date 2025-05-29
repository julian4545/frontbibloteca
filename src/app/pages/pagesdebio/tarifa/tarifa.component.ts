import { Component, OnInit } from '@angular/core';
import { TarifaService } from 'src/app/services/Tarifa.service';


export interface Tarifa {
  tarifaID: number;
  nombre: string;
  descripcion?: string;
  monto: number;
}

@Component({
  selector: 'app-tarifa',
  templateUrl: './tarifa.component.html',
  styleUrls: ['./tarifa.component.scss']
})
export class TarifaComponent implements OnInit {

  tarifas: Tarifa[] = [];

  showModal = false;
  isEditing = false;
  currentTarifaId: number | null = null;

  formData = {
    nombre: '',
    descripcion: '',
    monto: 0
  };

  constructor(private tarifaService: TarifaService) {}

  ngOnInit(): void {
    this.getTarifas();
  }

  getTarifas(): void {
    this.tarifaService.getTarifas().subscribe(data => {
      this.tarifas = data;
    });
  }

  openModal(editing: boolean, tarifa?: Tarifa): void {
    this.isEditing = editing;
    this.showModal = true;
    if (editing && tarifa) {
      this.formData = {
        nombre: tarifa.nombre,
        descripcion: tarifa.descripcion || '',
        monto: tarifa.monto
      };
      this.currentTarifaId = tarifa.tarifaID;
    } else {
      this.formData = { nombre: '', descripcion: '', monto: 0 };
      this.currentTarifaId = null;
    }
  }

  closeModal(): void {
    this.showModal = false;
  }

  saveTarifa(): void {
    const { nombre, descripcion, monto } = this.formData;
    if (!nombre || monto <= 0) {
      alert('El nombre y el monto son obligatorios y el monto debe ser mayor a 0');
      return;
    }
    if (this.isEditing && this.currentTarifaId !== null) {
      this.tarifaService.updateTarifa(this.currentTarifaId, nombre, monto, descripcion).subscribe(() => {
        this.getTarifas();
        this.closeModal();
      });
    } else {
      this.tarifaService.createTarifa(nombre, monto, descripcion).subscribe(() => {
        this.getTarifas();
        this.closeModal();
      });
    }
  }

  deleteTarifa(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta tarifa?')) {
      this.tarifaService.deleteTarifa(id).subscribe(() => {
        this.getTarifas();
      });
    }
  }

}
