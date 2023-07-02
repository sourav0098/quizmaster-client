import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  user: any = null;
  profileForm: FormGroup;
  errorMessages: string[] = [];

  ngOnInit(): void {
    // loading user from local storage
    this.user = this._authService.getUserFromLocalStorage();

    // set tile
    this._titleService.setTitle('Welcome, ' + this.user?.fname);

    // patching form values
    this.profileForm.patchValue({
      fname: this.user?.fname,
      lname: this.user?.lname,
    });
  }

  constructor(
    private _authService: AuthService,
    private _fb: FormBuilder,
    private _toastr: ToastrService,
    private _userService: UserService,
    private _titleService: Title
  ) {
    this.user = this._authService.getUserFromLocalStorage();

    this.profileForm = this._fb.group({
      fname: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      lname: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
    });
  }

  customErrorMessages = {
    fname: [
      { type: 'required', message: 'First name is required' },
      {
        type: 'minlength',
        message: 'First name must be at least 2 characters long',
      },
    ],
    lname: [
      { type: 'required', message: 'Last name is required' },
      {
        type: 'minlength',
        message: 'Last name must be at least 2 characters long',
      },
    ],
  };

  onProfileFormSubmit() {
    if (this.profileForm.valid) {
      this._userService
        .updateUser(this.user.userId, this.profileForm.value)
        .subscribe({
          next: (res) => {
            this._toastr.success('Profile updated successfully');
            this._authService.setUserInLocalStorage(res);
            this.errorMessages = [];
          },
          error: (err) => {
            if (err?.error?.errors.length > 0) {
              this.errorMessages = err.error.errors;
            } else {
              this._toastr.error('Something went wrong');
            }
          },
        });
    } else {
      this.profileForm.markAllAsTouched();
    }
  }
}
