import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { CryptoApiService } from '../../../../api/crypto-api.service';
import { CryptoToken } from '../../../../models/Interfaces/CryptoToken';

import { SearchBarComponent } from "../../../../components/search-bar/search-bar.component";
import { GlobalCryptoDataComponent } from "../../../../components/global-crypto-data/global-crypto-data.component";
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatTableModule,
        SearchBarComponent,
        GlobalCryptoDataComponent
    ]
})
export class HomeComponent {
  cryptoData: CryptoToken[] = [];
  dataSource = new MatTableDataSource(this.cryptoData);
  displayedColumns: string[] = ['Logo', 'Name', 'Price', 'Last 24h', 'High 24h', 'Low 24h', 'Total volume', 'Details', 'Actions'];
  tokenSearchName = '';

  displayTokenDataComponent = true;

  constructor(private cryptoApiService: CryptoApiService, private router: Router){
    this.getTokens();
  }

  private getTokens(){
    this.cryptoApiService.getCTokens$().subscribe({
      next: (response: CryptoToken[]) => {
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

  public setAsFavourite(tokenId:string){
    console.log("test")
    this.cryptoApiService.addFavouriteToken$(tokenId).subscribe({
      next: (res) => {
        this.getTokens()
      },
      error: (error) => {
        console.log(error);
      }
  })
  }
}
