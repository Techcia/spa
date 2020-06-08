import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { ProfileService } from './services/profile.service';
import { finalize } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { ValidateBrService } from 'angular-validate-br';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: fuseAnimations,
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup = this._formBuilder.group({
    id: [0, [Validators.required]],
    name: ['', [Validators.required]],
    email: ['', [Validators.required]],
    document: ['', [Validators.required, this.validateBrService.cnpj]],
    tradeName: ['', [Validators.required]],
  });
  loading: boolean = false;
  constructor(
    private _formBuilder: FormBuilder,
    private profileService: ProfileService,
    private _snackBar: MatSnackBar,
    private validateBrService: ValidateBrService
  ) {
  }

  ngOnInit() {
    let profile = this.profileService.profile;
    this.profileForm.setValue({
      id: profile.id,
      name: profile.name,
      email: profile.email,
      document: profile.document,
      tradeName: profile.tradeName
    })
  }

  editProfile() {
    this.loading = true;
    this.profileService.editProfile(this.profileForm.value).pipe(finalize(() => this.loading = false)).subscribe(res => {
      this._snackBar.open("Perfil editado com sucesso", "Fechar", {
        duration: 2000,
      });
    })
  }
}
