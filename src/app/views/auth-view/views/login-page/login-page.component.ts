import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ILoginResponse } from '../../../../models/Responses/ILoginResponse';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { ILoginModel } from '../../../../models/Interfaces/ILoginModel';
import { LocalStorageService } from '../../../../services/local-storage.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  standalone: true,
  imports: [CommonModule, MatDatepickerModule, MatNativeDateModule, ReactiveFormsModule, MatInputModule, MatButtonModule, RouterModule]
})
export class LoginPageComponent {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  submitted: boolean = false;

  constructor(
    private formBuiler: FormBuilder,
    private authService: AuthService,
    private router: Router
    ){
    this.buildForm();
  }

  private buildForm(): void{
    this.loginForm = this.formBuiler.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
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

    const loginUser: ILoginModel = {
      email: email,
      password: password
    }

    this.authService.authenticate$(loginUser).subscribe({
      next: (res) => {
        this.router.navigate(['/app']);
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
