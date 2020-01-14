import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-success-reprint',
  templateUrl: './modal-success-reprint.component.html',
  styleUrls: ['./modal-success-reprint.component.scss']
})
export class ModalSuccessReprintComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalSuccessReprintComponent>, ) { }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }


}
