import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FavouriteToken } from '../../../../models/Interfaces/FavouriteToken';
import { CryptoApiService } from '../../../../api/crypto-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favourite-tokens',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './favourite-tokens.component.html',
  styleUrl: './favourite-tokens.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavouriteTokensComponent {
  cryptoData: FavouriteToken[] = [];
  dataSource = new MatTableDataSource(this.cryptoData);
  displayedColumns: string[] = ['Image', 'Symbol', 'Name', 'Price', 'Actions', 'Details'];

  constructor(private cryptoApiService: CryptoApiService, private router: Router){
    this.getTokens();
  }

  private getTokens(){
    this.cryptoApiService.getFavouriteTokens$().subscribe({
      next: (response: FavouriteToken[]) => {
        this.cryptoData = response;
        this.dataSource.data = this.cryptoData;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  public navigateToTokenDetails(tokenName: string) {
    this.router.navigate(['/app/token-details', tokenName]);
  }
}
