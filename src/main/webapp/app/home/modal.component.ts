import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'jhi-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./home.component.scss'],
})
export class ModalComponent implements OnInit {
  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    console.log('modal');
  }

  closeModal(): void {
    this.activeModal.close('Modal Closed');
  }
}
