import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-app-view',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app-view.component.html',
  styleUrl: './app-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppViewComponent {

}
