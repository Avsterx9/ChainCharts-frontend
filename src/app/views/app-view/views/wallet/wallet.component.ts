import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { CryptoApiService } from '../../../../api/crypto-api.service';
import { Router } from '@angular/router';
import { UserToken } from '../../../../models/Interfaces/UserToken';
import { PieChartComponent } from '../../../../components/pie-chart/pie-chart.component';

@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    PieChartComponent
  ],
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WalletComponent {
  cryptoData: UserToken[] = [];
  dataSource = new MatTableDataSource(this.cryptoData);
  displayedColumns: string[] = ['Image', 'Symbol', 'Name', 'Price', 'Quantity', 'EstimatedValue','Actions', 'Details'];

  constructor(private cryptoApiService: CryptoApiService, private router: Router){
    this.getTokens();
  }

  private getTokens(){
    this.cryptoApiService.getUserTokens$().subscribe({
      next: (response: UserToken[]) => {
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

  public deleteUserToken(tokenId: string){
    this.cryptoApiService.deleteUserToken$(tokenId).subscribe({
      next: (res) => {
        this.getTokens()
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
