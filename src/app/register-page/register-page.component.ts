import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { ILoginUser } from '../models/ILoginUser';
import { ILoginResponse } from '../models/Responses/ILoginResponse';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss'
})
export class RegisterPageComponent {
  registerForm: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    dateOfBirth: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });

  submitted: boolean = false;

  constructor(
    private formBuiler: FormBuilder,
    private usersService: UsersService
    ){
    this.buildForm();
  }

  private buildForm(): void{
    this.registerForm = this.formBuiler.group(
      {
        email: ['', Validators.required, Validators.email],
        firstName: ['', Validators.required, Validators.minLength(3)],
        lastName: ['', Validators.required, Validators.minLength(3)],
        dateOfBirth: ['', Validators.required],
        password: ['', Validators.required, Validators.minLength(8)],
        confirmPassword: ['', Validators.required, Validators.minLength(8)],
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    var email = this.registerForm.get('email')?.value;
    var password = this.registerForm.get('password')?.value;

    const loginUser: ILoginUser = {
      email: email,
      password: password
    }

    this.usersService.login(loginUser).subscribe({
      next: (res: ILoginResponse) => {
        localStorage.setItem('token', res.token);
        window.location.href=""
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  onReset(): void {
    this.submitted = false;
    this.registerForm.reset();
  }
}
