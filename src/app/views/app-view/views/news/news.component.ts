import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { CryptoApiService } from '../../../../api/crypto-api.service';
import { Observable } from 'rxjs/internal/Observable';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { distinct, map, mergeMap, toArray } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { CryptoNews, CryptoNewsData } from '../../../../models/Interfaces/CryptoNews';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatButtonModule
  ],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsComponent {
  public news$: Observable<CryptoNewsData[]> = new Observable<CryptoNewsData[]>();

  constructor(private cryptoService: CryptoApiService) {
    this.news$ = this.cryptoService.getLatestNews$().pipe(
      map((response: CryptoNews) => response.Data),
      mergeMap((news: CryptoNewsData[]) => news),
      distinct((newsItem: CryptoNewsData) => newsItem.title),
      toArray()
    );
  }

  convertUnixTimestamp(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString();
  }
}
