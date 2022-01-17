import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-information-project',
  templateUrl: './modal-information-project.component.html'
})
export class ModalInformationProjectComponent implements OnInit {

  constructor(private bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  onClose() {
    this.bsModalRef.hide();
  }

}
