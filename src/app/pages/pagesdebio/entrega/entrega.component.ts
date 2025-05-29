import { Component, OnInit } from '@angular/core';
import { Entrega, EntregaService } from 'src/app/services/Entrega.service';


@Component({
  selector: 'app-entrega',
  templateUrl: './entrega.component.html',
  styleUrls: ['./entrega.component.scss']
})
export class EntregaComponent implements OnInit {

  entregas: Entrega[] = [];

  showModal = false;
  isEditing = false;
  currentEntregaId: number | null = null;

  formData = {
    prestamoID: 0,
    fechaEntrega: '',
    descripcion: '',
    tarifaID: null as number | null
  };

  constructor(private entregaService: EntregaService) {}

  ngOnInit(): void {
    this.getEntregas();
  }

  getEntregas(): void {
    this.entregaService.getEntregas().subscribe(data => {
      this.entregas = data;
    });
  }

  openModal(editing: boolean, entrega?: Entrega): void {
    this.isEditing = editing;
    this.showModal = true;
    if (editing && entrega) {
      this.formData = {
        prestamoID: entrega.prestamoID,
        fechaEntrega: entrega.fechaEntrega,
        descripcion: entrega.descripcion || '',
        tarifaID: entrega.tarifaID || null
      };
      this.currentEntregaId = entrega.entregaID;
    } else {
      this.formData = { prestamoID: 0, fechaEntrega: '', descripcion: '', tarifaID: null };
      this.currentEntregaId = null;
    }
  }

  closeModal(): void {
    this.showModal = false;
  }

  saveEntrega(): void {
    const { prestamoID, fechaEntrega, descripcion, tarifaID } = this.formData;

    if (this.isEditing && this.currentEntregaId !== null) {
      this.entregaService.updateEntrega(this.currentEntregaId, prestamoID, fechaEntrega, descripcion, tarifaID ?? undefined).subscribe(() => {
        this.getEntregas();
        this.closeModal();
      });
    } else {
      this.entregaService.createEntrega(prestamoID, fechaEntrega, descripcion, tarifaID ?? undefined).subscribe(() => {
        this.getEntregas();
        this.closeModal();
      });
    }
  }

  deleteEntrega(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta entrega?')) {
      this.entregaService.deleteEntrega(id).subscribe(() => {
        this.getEntregas();
      });
    }
  }
}
