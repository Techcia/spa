import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginInvalid: boolean;
  loginFailed: boolean;
  loginAccess: boolean;

  /**
   * Constructor
   *
   * @param {FuseConfigService} _fuseConfigService
   * @param {FormBuilder} _formBuilder
   */
  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthenticationService
  ) { }


  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });
    localStorage.removeItem('access_token');
    this.loginInvalid = false;
    this.loginFailed = false;
  }

  loginSubmit() {
    if (!this.loginForm.valid)
      return false;

    const { username, password } = this.loginForm.value;
    this.auth.login(username, password).subscribe(
      res => {
        this.loginFailed = false; this.loginInvalid = false; this.loginAccess = false;
        if (!(res.role == "ADMIN" || res.role == "STAFF")) {
          this.loginAccess = true;
        }
      },
      err => {
        if (err.status == 401) {
          this.loginInvalid = true;
          this.loginAccess = false;
          this.loginFailed = false;
        } else {
          this.loginFailed = true;
          this.loginInvalid = false;
          this.loginAccess = false;
        }
      }
    );
  }

}
