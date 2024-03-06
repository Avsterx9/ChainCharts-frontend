import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { ILoginUser } from '../models/ILoginUser';
import { ILoginResponse } from '../models/Responses/ILoginResponse';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  submitted: boolean = false;

  constructor(
    private formBuiler: FormBuilder,
    private usersService: UsersService
    ){
    this.buildForm();
  }

  private buildForm(): void{
    this.loginForm = this.formBuiler.group(
      {
        email: ['', Validators.required, Validators.email],
        password: ['', Validators.required]
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    var email = this.loginForm.get('email')?.value;
    var password = this.loginForm.get('password')?.value;

    const loginUser: ILoginUser = {
      email: email,
      password: password
    }

    this.usersService.login(loginUser).subscribe({
      next: (res: ILoginResponse) => {
        localStorage.setItem('token', res.token);
        console.log(res.token);
        // window.location.href=""
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  onReset(): void {
    this.submitted = false;
    this.loginForm.reset();
  }
}
