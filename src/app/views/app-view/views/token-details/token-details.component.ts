import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-token-details',
  standalone: true,
  imports: [],
  templateUrl: './token-details.component.html',
  styleUrl: './token-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TokenDetailsComponent {

  tokenName: string | null = '';

  constructor(private route: ActivatedRoute) {
    this.getData();
  }

  getData() {
    this.route.paramMap.subscribe(params => {
      this.tokenName = params.get('tokenName');
    });
  }
}
