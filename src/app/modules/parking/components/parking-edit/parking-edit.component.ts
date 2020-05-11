import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ParkingService } from '../../services/parking.service';

@Component({
  selector: 'app-parking-edit',
  templateUrl: './parking-edit.component.html',
  styleUrls: ['./parking-edit.component.scss']
})
export class ParkingEditComponent implements OnInit {

  parkingForm: FormGroup = this._formBuilder.group({
    name: ['Estacionamento 1', [Validators.required]],
    numberOfVacancies: [10, [Validators.required]],
    valuePerHour: [12, [Validators.required]],
    street: ['Rua Anhandui Mirim', [Validators.required]],
    number: ['869', [Validators.required]],
    postalCode: ['04904-200', [Validators.required]],
    neighborhood: ['Jardim das Flores', [Validators.required]],
    city: ['São Paulo', [Validators.required]],
    state: ['São Paulo', [Validators.required]],
  });

  constructor(
    private _formBuilder: FormBuilder,
    private parkingService: ParkingService,
  ) {
  }

  ngOnInit() {
  }

  addparking() {
   
  }


}
