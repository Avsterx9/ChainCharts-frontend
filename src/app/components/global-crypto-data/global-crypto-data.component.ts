import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CryptoApiService } from '../../api/crypto-api.service';
import { CryptoGlobalData } from '../../models/Interfaces/CryptoGlobalData';
import { Observable } from 'rxjs/internal/Observable';
import {MatDividerModule} from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-global-crypto-data',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './global-crypto-data.component.html',
  styleUrl: './global-crypto-data.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlobalCryptoDataComponent {

  protected readonly globalData$: Observable<CryptoGlobalData>;

  constructor(private cryptoApiService: CryptoApiService){
    this.globalData$ = this.cryptoApiService.getGlobalData$()
  }
}
