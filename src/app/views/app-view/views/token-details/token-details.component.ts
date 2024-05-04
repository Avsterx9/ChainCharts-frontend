import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-token-details',
  standalone: true,
  imports: [],
  templateUrl: './token-details.component.html',
  styleUrl: './token-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TokenDetailsComponent {

}
