import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-auth-view',
  templateUrl: './auth-view.component.html',
  styleUrl: './auth-view.component.scss',
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class AuthViewComponent {

}
