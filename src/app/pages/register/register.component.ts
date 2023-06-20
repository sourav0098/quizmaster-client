import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  ValidatorFn,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { REGEX_VALIDATOR } from 'src/app/utils/regex';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';

  static passwordMatchValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    const password = control.get('password');
    const cpassword = control.get('cpassword');

    if (password && cpassword && password.value !== cpassword.value) {
      return { passwordMismatch: true };
    }

    return null;
  }

  constructor(
    private _fb: FormBuilder,
    private _toastr: ToastrService,
    private _userService: UserService
  ) {
    this.registerForm = this._fb.group(
      {
        fname: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
        ]),
        lname: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
        ]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern(REGEX_VALIDATOR.PASSWORD),
        ]),
        cpassword: new FormControl('', [Validators.required]),
      },
      { validator: RegisterComponent.passwordMatchValidator }
    );
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
    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'email', message: 'Please enter a valid email address' },
    ],
    password: [
      { type: 'required', message: 'Password is required' },
      {
        type: 'pattern',
        message:
          'Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long',
      },
    ],
    cpassword: [
      { type: 'required', message: 'Confirm password is required.' },
      {
        type: 'passwordMismatch',
        message: 'Password and Confirm password do not match',
      },
    ],
  };

  onRegisterFormSubmit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      this._userService.registerUser(this.registerForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.errorMessage = '';
          this._toastr.success('Registration successful');
          this.registerForm.reset();
        },
        error: (err) => {
          this.errorMessage = err.error.message;
        },
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
