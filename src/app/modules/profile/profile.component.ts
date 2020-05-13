import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: fuseAnimations,
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup = this._formBuilder.group({
    name: ['Empresa x', [Validators.required]],
    email: ['empresa@empresa.com.br', [Validators.required]],
    document: ['70.735.418/0001-22', [Validators.required]],
    tradeName: ['Empresa fulano', [Validators.required]],
  });

  constructor(
    private _formBuilder: FormBuilder,

  ) {
  }

  ngOnInit() {
  }

  addProfile() {

  }
}
