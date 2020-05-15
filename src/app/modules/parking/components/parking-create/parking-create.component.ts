import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ParkingService } from '../../services/parking.service';

@Component({
  selector: 'app-parking-create',
  templateUrl: './parking-create.component.html',
  styleUrls: ['./parking-create.component.scss'],
  animations: fuseAnimations,
})
export class ParkingCreateComponent implements OnInit {

  parkingForm: FormGroup = this._formBuilder.group({
    name: ['', [Validators.required]],
    numberOfVacancies: ['', [Validators.required]],
    valuePerHour: [0, [Validators.required, Validators.min(0.1)]],
    phone: ['', [Validators.required]],
    street: ['', [Validators.required]],
    number: ['', [Validators.required]],
    postalCode: ['', [Validators.required]],
    neighborhood: ['', [Validators.required]],
    city: ['', [Validators.required]],
    state: ['', [Validators.required]],
  });

  cep: any = null;
  loading = false

  constructor(
    private _formBuilder: FormBuilder,
    private parkingService: ParkingService,
  ) {
  }

  ngOnInit() {
  }

  addParking() {
   this.loading = true;
  }

  findCep(){
    this.loading = true;

  }

}
