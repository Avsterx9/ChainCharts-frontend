import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { CryptoApiService } from '../../../../api/crypto-api.service';
import { Router } from '@angular/router';
import { UserToken, UserTokenLite } from '../../../../models/Interfaces/UserToken';
import { PieChartComponent } from '../../../../components/pie-chart/pie-chart.component';
import { TokenValue, WalletEstimationValue } from '../../../../models/Interfaces/WalletEstimationValue';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CryptoToken } from '../../../../models/Interfaces/CryptoToken';
import { Observable } from 'rxjs/internal/Observable';
import { map, startWith } from 'rxjs';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    PieChartComponent,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WalletComponent {
  myControl = new FormControl('');
  filteredOptions: Observable<CryptoToken[]>;
  walletEstimation?: WalletEstimationValue;
  chartValues: TokenValue[] = [];
  options: CryptoToken[] = [];
  cryptoData: UserToken[] = [];
  dataSource = new MatTableDataSource(this.cryptoData);
  displayedColumns: string[] = ['Image', 'Symbol', 'Name', 'Price', 'Quantity', 'EstimatedValue','Actions', 'Details'];
  submitted: boolean = false;

  selectedToken: string = '';

  form: FormGroup = new FormGroup({
    quantity: new FormControl('', [Validators.required])
  });
  
  constructor(
    private cryptoApiService: CryptoApiService,
     private router: Router,
     private formBuiler: FormBuilder
    ){
    this.getUserTokens();
    this.getWalletEstimation();
    this.getTokens();
    this.buildForm();

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): CryptoToken[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  private buildForm(): void{
    this.form = this.formBuiler.group(
      {
        quantity: [[Validators.required]]
      }
    );
  }

  private getUserTokens(){
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
        this.getUserTokens();
        this.getWalletEstimation();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  private getWalletEstimation(): void {
    this.cryptoApiService.getWalletEstimationValue$().subscribe({
      next: (response: WalletEstimationValue) => {
        this.walletEstimation = response;
        this.chartValues = response.tokenValues;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  private getTokens(){
    this.cryptoApiService.getCTokens$().subscribe({
      next: (response: CryptoToken[]) => {
        this.options = response;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  onSelectionChange(event: any) {
    const selectedToken = event.option.value;
    const tokenId = this.options.find(option => option.name === selectedToken)?.id;
    if (selectedToken) {
      this.selectedToken = tokenId!.toString();
    }
  }

  addUserToken(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    var quantity = this.form.get('quantity')?.value;

    const model: UserTokenLite = {
      quantity: quantity,
      tokenId: this.selectedToken
    }

    this.cryptoApiService.addUserToken$(model).subscribe({
      next: (res) => {
        this.getUserTokens();
        this.getWalletEstimation();
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
