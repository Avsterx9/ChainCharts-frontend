import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CurrentUserService } from '../../services/current-user.service';
import { IUserDetailsModel } from '../../models/Interfaces/UserDetails';
import { userInfo } from 'os';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

  public userData?: IUserDetailsModel;

  constructor(
    private authService: AuthService,
    private currentUserService: CurrentUserService){
      this.currentUserService.userInfo$.subscribe({
        next: (user: IUserDetailsModel) => {
          console.log(user);
          this.userData = user
        },
        error:(error) => {
          console.log(error);
        }
    });
  }

  public logout(): void{
    this.authService.logout();
  }
}