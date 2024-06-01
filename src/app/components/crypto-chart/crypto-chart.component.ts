import { ChangeDetectionStrategy, Component, Inject, Input, LOCALE_ID, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CryptoApiService } from '../../api/crypto-api.service';
import { CommonModule, DatePipe } from '@angular/common';
import { PriceData } from '../../models/Interfaces/PriceData';
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { MatRadioGroup, MatRadioModule } from '@angular/material/radio';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-crypto-chart',
  standalone: true,
  imports: [
    CommonModule,
    NgxChartsModule,
    MatRadioModule,
    MatRadioGroup,
    MatButtonModule,
    MatButton
  ],
  templateUrl: './crypto-chart.component.html',
  styleUrl: './crypto-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CryptoChartComponent implements OnChanges, OnInit {
  @Input() chartTokenName: string | null = 'bitcoin';
  chartDurationPeriod: number = 7;
  chartData: any = [
    {
      name: 'Bitcoin',
      series: []
    }
  ];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = false;
  yAxis: boolean = true;
  showGridLanes: boolean = false;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Time';
  yAxisLabel: string = 'Price $';
  timeline: boolean = true;
  yScaleMin: number = 0;
  
  private dataSubscription: Subscription = new Subscription();

  constructor(
    private cryptoService: CryptoApiService,
    @Inject(LOCALE_ID) public locale: string){
      this.getChartData();
  }
  ngOnInit(): void {
    console.log(this.chartTokenName)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chartTokenName'] && changes['chartTokenName'].currentValue) {
      this.getChartData();
    }
  }

  private getChartData() {
    if (this.chartData[0].series.length !== 0) {
      this.chartData[0].series = [];
    }

    if (this.chartTokenName === null) {
      return;
    }

    this.dataSubscription.unsubscribe();
    this.dataSubscription = this.cryptoService.getTokenChartData$(this.chartTokenName, this.chartDurationPeriod).subscribe(
      response => {
        var min = response.prices[0][1];
        
        response.prices.map((p) => {
          if(p[1] < min){
            min = p[1];
          }
          var time = new DatePipe(this.locale);
          let formattedPrice = Number(p[1]).toFixed(2); // Zapewnia formatowanie do dwóch miejsc dziesiętnych
          this.chartData[0].name = this.chartTokenName;
          this.chartData[0].series.push({
            name: time.transform(new Date(p[0]), 'medium'), // formatuje datę do czytelniejszej formy
            value: formattedPrice  // używa sformatowanej wartości ceny
          });
        });
        this.chartData = [...this.chartData];
        this.yScaleMin = Math.floor(min); // Zaokrąglenie min do najbliższej mniejszej liczby całkowitej
      }
    );
  }

  onSelect(data: PriceData): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: PriceData): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: PriceData): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }
}
