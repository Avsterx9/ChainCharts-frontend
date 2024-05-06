import { ChangeDetectionStrategy, Component, Inject, Input, LOCALE_ID } from '@angular/core';
import { CryptoApiService } from '../../api/crypto-api.service';
import { CommonModule, DatePipe } from '@angular/common';
import { PriceData } from '../../models/Interfaces/PriceData';
import { NgxChartsModule } from "@swimlane/ngx-charts";
@Component({
  selector: 'app-crypto-chart',
  standalone: true,
  imports: [
    CommonModule,
    NgxChartsModule
  ],
  templateUrl: './crypto-chart.component.html',
  styleUrl: './crypto-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CryptoChartComponent {
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
  xAxis: boolean = true;
  yAxis: boolean = true;
  showGridLanes: boolean = false;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Time';
  yAxisLabel: string = 'Price';
  timeline: boolean = true;
  yScaleMin: number = 0;

  constructor(
    private cryptoService: CryptoApiService,
    @Inject(LOCALE_ID) public locale: string){
      this.getChartData();
  }

  private getChartData(){
    if(this.chartData[0].series.length != 0){
      this.chartData[0].series = [];
    }

    if(this.chartTokenName == null)
      return;

    this.cryptoService.getTokenChartData$(this.chartTokenName, this.chartDurationPeriod).subscribe(
      response => {
        var min = response.prices[0][1];
        response.prices.map((p) => {
          if(p[1] < min){
            min = p[1];
          }
          var time = new DatePipe(this.locale);
          this.chartData[0].name = this.chartTokenName;
          this.chartData[0].series.push({name: time.transform(new Date(p[0]), 'medium'), value: p[1].toString()});
        });
        this.chartData = [...this.chartData];
        this.yScaleMin = min;
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
}
