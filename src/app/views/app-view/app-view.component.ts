import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-app-view',
  standalone: true,
  imports: [],
  templateUrl: './app-view.component.html',
  styleUrl: './app-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppViewComponent {

}
