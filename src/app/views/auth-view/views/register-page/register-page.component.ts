import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RegisterModel } from '../../../../models/Interfaces/RegisterModel';
import { UsersApiService } from '../../../../api/users-api.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule, 
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule]
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
    private usersService: UsersApiService,
    private formBuiler: FormBuilder,
    private router: Router
    ){
    this.buildForm();
  }

  private buildForm(): void{
    this.registerForm = this.formBuiler.group(
      {
        email: ['', [Validators.required, Validators.email]],
        firstName: ['', [Validators.required, Validators.minLength(3)]],
        lastName: ['', [Validators.required, Validators.minLength(3)]],
        dateOfBirth: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
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
    var date = this.registerForm.get('dateOfBirth')?.value;
    var firstName = this.registerForm.get('firstName')?.value
    var lastName = this.registerForm.get('lastName')?.value

    const createUserModel: RegisterModel = {
      email: email,
      password: password,
      dateOfBirth: date,
      firstName: firstName,
      lastName: lastName,
      roleId: 1
    };

    this.usersService.register$(createUserModel).subscribe({
      next: (res) => {
        this.router.navigate(['/auth']);
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
