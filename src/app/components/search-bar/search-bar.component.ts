import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, startWith, map } from 'rxjs';
import { CryptoApiService } from '../../api/crypto-api.service';
import { CryptoToken } from '../../models/Interfaces/CryptoToken';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    MatFormFieldModule,
    CommonModule,
    MatInputModule,  
    MatIconModule,
    MatButtonModule,
    MatAutocompleteModule,
    AsyncPipe,
    ReactiveFormsModule,
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBarComponent {
  myControl = new FormControl('');
  options: CryptoToken[] = [];
  filteredOptions: Observable<CryptoToken[]>;

  constructor(private cryptoApiService: CryptoApiService){
    this.getTokens();

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): CryptoToken[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
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
}
