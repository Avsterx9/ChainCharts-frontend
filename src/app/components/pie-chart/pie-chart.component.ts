import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatButtonModule, MatButton } from '@angular/material/button';
import { MatRadioModule, MatRadioGroup } from '@angular/material/radio';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CryptoApiService } from '../../api/crypto-api.service';
import { Router } from '@angular/router';
import { TokenValue, WalletEstimationValue } from '../../models/Interfaces/WalletEstimationValue';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [
    CommonModule,
    NgxChartsModule,
    MatRadioModule,
    MatRadioGroup,
    MatButtonModule,
    MatButton
  ],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PieChartComponent implements OnChanges, OnInit {
  @Input() chartData: TokenValue[] = [];
  data: any[] = [];;
  view: [number, number] = [800, 300];

  
  constructor(){
    this.data = this.chartData;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.data = this.chartData;
  }
  ngOnInit(): void {
    this.data = this.chartData;
  }

}
