import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { ROLES } from 'src/app/utils/roles';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private toastr: ToastrService,
    private _authService: AuthService
  ) {
    this.loginForm = this._fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  customErrorMessages = {
    email: [
      {
        type: 'required',
        message: 'Email is required',
      },
    ],
    password: [
      {
        type: 'required',
        message: 'Password is required',
      },
    ],
  };

  onLoginFormSubmit() {
    if (this.loginForm.valid) {
      this._authService.loginUser(this.loginForm.value).subscribe({
        next: (res: any) => {
          this._authService.setTokenInLocalStorage({
            accessToken: res?.accessToken,
            refreshToken: res?.refreshToken,
          });
          this._authService.setUserInLocalStorage(res?.user);

          const roles = this._authService.getRolesFromLocalStorage();
          if (roles) {
            roles.forEach((role: any) => {
              if (role.roleName === ROLES.NORMAL) {
                this._router.navigate(['/profile']);
              }
              if (role.roleName === ROLES.ADMIN) {
                this._router.navigate(['/']);
              }
            });
          } else {
            this._router.navigate(['/']);
          }
        },
        error: (err) => {
          if (err?.error?.message) {
            this.toastr.error(err?.error?.message);
          } else {
            this.toastr.error('Something went wrong');
          }
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
