import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CryptoApiService } from '../../../../api/crypto-api.service';
import { CryptoTokenDescription } from '../../../../models/Interfaces/CryptoTokenDescription';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardActions, MatCardModule, MatCardTitle } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatList, MatListModule} from '@angular/material/list';
import { CryptoChartComponent } from '../../../../components/crypto-chart/crypto-chart.component';

@Component({
  selector: 'app-token-details',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatListModule,
    CryptoChartComponent
  ],
  templateUrl: './token-details.component.html',
  styleUrl: './token-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TokenDetailsComponent {

  protected readonly token$: Observable<CryptoTokenDescription>;
  tokenName: string | null = '';

  constructor(
    private route: ActivatedRoute,
    private cryptoService: CryptoApiService
  ) {
    this.getTokenNameFromParams();
    this.token$ = this.cryptoService.getCTokenDesc$(this.tokenName == null ? 'bitcoin' : this.tokenName);
  }

  private getTokenNameFromParams(): void {
    this.route.paramMap.subscribe(params => {
      this.tokenName = params.get('tokenName');
    });
  }
}
