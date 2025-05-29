import { Component, OnInit } from '@angular/core';
import { MultaService } from 'src/app/services/Multa.service';


export interface Multa {
  multaID: number;
  prestamoID: number;
  monto: number;
  pagado: boolean;
  fechaRegistro: string;
}

@Component({
  selector: 'app-multa',
  templateUrl: './multa.component.html',
  styleUrls: ['./multa.component.scss']
})
export class MultaComponent implements OnInit {
  multas: Multa[] = [];
  showModal = false;
  isEditing = false;
  currentMultaId: number | null = null;

  formData = {
    prestamoID: undefined,
    monto: undefined,
    pagado: false,
    fechaRegistro: ''
  };

  constructor(private multaService: MultaService) {}

  ngOnInit(): void {
    this.getMultas();
  }

  getMultas(): void {
    this.multaService.getMultas().subscribe(data => {
      this.multas = data;
    });
  }

  openModal(editing: boolean, multa?: Multa): void {
    this.isEditing = editing;
    this.showModal = true;

    if (editing && multa) {
      this.formData = {
        prestamoID: multa.prestamoID,
        monto: multa.monto,
        pagado: multa.pagado,
        fechaRegistro: multa.fechaRegistro.split('T')[0]
      };
      this.currentMultaId = multa.multaID;
    } else {
      this.formData = {
        prestamoID: undefined,
        monto: undefined,
        pagado: false,
        fechaRegistro: ''
      };
      this.currentMultaId = null;
    }
  }

  closeModal(): void {
    this.showModal = false;
  }

  saveMulta(): void {
    const { prestamoID, monto, pagado, fechaRegistro } = this.formData;

    if (
      prestamoID === undefined || monto === undefined || pagado === undefined || !fechaRegistro
    ) {
      alert('Por favor complete todos los campos.');
      return;
    }

    if (this.isEditing && this.currentMultaId !== null) {
      this.multaService.updateMulta(
        this.currentMultaId,
        prestamoID,
        monto,
        pagado,
        fechaRegistro
      ).subscribe(() => {
        this.getMultas();
        this.closeModal();
      });
    } else {
      this.multaService.createMulta(prestamoID, monto, pagado, fechaRegistro).subscribe(() => {
        this.getMultas();
        this.closeModal();
      });
    }
  }

  deleteMulta(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta multa?')) {
      this.multaService.deleteMulta(id).subscribe(() => {
        this.getMultas();
      });
    }
  }
}
