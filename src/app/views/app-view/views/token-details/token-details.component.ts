import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CryptoApiService } from '../../../../api/crypto-api.service';
import { CryptoTokenDescription } from '../../../../models/Interfaces/CryptoTokenDescription';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardActions, MatCardModule, MatCardTitle } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatList, MatListModule} from '@angular/material/list';
import { CryptoChartComponent } from '../../../../components/crypto-chart/crypto-chart.component';
import { switchMap, filter, map, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

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
export class TokenDetailsComponent implements OnInit, OnDestroy {

  private tokenNameSubject = new BehaviorSubject<string>('bitcoin');
  tokenName$ = this.tokenNameSubject.asObservable();
  token$: Observable<CryptoTokenDescription> = this.tokenName$.pipe(
    switchMap(tokenName => this.cryptoService.getCTokenDesc$(tokenName))
  );
  private routeSub: Subscription | null = null;

  constructor(
    private route: ActivatedRoute,
    private cryptoService: CryptoApiService
  ) {}

  ngOnInit() {
    this.routeSub = this.route.paramMap.pipe(
      map(params => params.get('tokenName')),
      filter(tokenName => tokenName !== null),
      tap(tokenName => this.tokenNameSubject.next(tokenName!))
    ).subscribe();
  }

  ngOnDestroy() {
    this.routeSub?.unsubscribe();
  }
}
