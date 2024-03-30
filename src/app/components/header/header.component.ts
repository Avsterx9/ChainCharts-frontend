import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CurrentUserService } from '../../services/current-user.service';
import { IUserDetailsModel } from '../../models/Interfaces/UserDetails';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

  protected readonly userData$: Observable<IUserDetailsModel>;

  constructor(
    private authService: AuthService,
    private currentUserService: CurrentUserService){
      this.userData$ = this.currentUserService.userInfo$;
  }

  public logout(): void{
    this.authService.logout();
  }
}