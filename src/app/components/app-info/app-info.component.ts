import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { AuthApiService } from '../../api/auth-api.service';
import { Observable } from 'rxjs';
import { IUserDetailsModel } from '../../models/Interfaces/UserDetails';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-app-info',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './app-info.component.html',
  styleUrl: './app-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppInfoComponent {

  protected readonly userData$: Observable<IUserDetailsModel>;

  constructor(private authService: AuthApiService){
    this.userData$ = this.authService.getCurrentUser$();
  }

}
