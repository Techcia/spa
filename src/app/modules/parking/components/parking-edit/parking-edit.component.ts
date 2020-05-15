import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ParkingService } from '../../services/parking.service';
import { finalize } from 'rxjs/operators';
import { ModalErrorComponent } from 'app/shared/layout/components/modal-error/modal-error.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-parking-edit',
  templateUrl: './parking-edit.component.html',
  styleUrls: ['./parking-edit.component.scss'],
  animations: fuseAnimations
})
export class ParkingEditComponent implements OnInit {

  parkingForm: FormGroup = this._formBuilder.group({
    id: ['', [Validators.required]],
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
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
  }

  ngOnInit() {
    let parking: any = this.parkingService.parking;
    this.cep = {
      street: parking.street,
      neighborhood: parking.neighborhood,
      city: parking.city,
      state: parking.state
    }
    this.parkingForm.setValue({
      id: parking.id,
      name: parking.name,
      numberOfVacancies:parking.numberOfVacancies,
      valuePerHour: parking.valuePerHour,
      postalCode: parking.postalCode,
      phone: parking.phone,
      street: parking.street,
      number: parking.number,
      neighborhood: parking.neighborhood,
      city: parking.city,
      state: parking.state
    })
  }

  editParking() {
    this.loading = true;
    this.parkingService.editParking(this.parkingForm.value).pipe(finalize(() => {
      this.loading = false;
    })).subscribe(res => {
      this._snackBar.open("Estacionamento editado com sucesso", "Fechar", {
        duration: 2000,
      });
      this.router.navigateByUrl("parking/list");
    })
  }

  onCep() {
    if (this.cep != null) {
      this.parkingForm.setValue({
        ...this.parkingForm.value,
        street: '',
        number: '',
        neighborhood: '',
        city: '',
        state: ''
      })
      this.cep = null;
    }
  }

  findCep() {
    this.loading = true;
    this.parkingService.findCep(this.parkingForm.value.postalCode).pipe(
      finalize(() => this.loading = false)
    ).subscribe((res: any) => {
      if (res.erro) {
        this.errorCep();
      } else {
        this.cep = res;
        this.parkingForm.setValue({
          ...this.parkingForm.value,
          street: this.cep.logradouro,
          neighborhood: this.cep.bairro,
          city: this.cep.localidade,
          state: this.cep.uf
        })
      }
    })

  }

  errorCep() {
    const dialogRef = this.dialog.open(ModalErrorComponent, { data: { title: "CEP não encontrado", message: 'Não foi possível encontrar o cep digitado!' } });
    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }


}
