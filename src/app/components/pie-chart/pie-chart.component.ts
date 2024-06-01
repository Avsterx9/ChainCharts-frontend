import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule, MatButton } from '@angular/material/button';
import { MatRadioModule, MatRadioGroup } from '@angular/material/radio';
import { NgxChartsModule } from '@swimlane/ngx-charts';

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
export class PieChartComponent {
  view: [number, number] = [800, 300];

  chartData: any = [
    {
      "name": "Germany",
      "value": 40632,
    },
    {
      "name": "United States",
      "value": 50000,
    },
    {
      "name": "France",
      "value": 36745,
    },
    {
      "name": "United Kingdom",
      "value": 36240,
    },
    {
      "name": "Spain",
      "value": 33000,
    },
    {
      "name": "Italy",
      "value": 35800,
    }
  ];
}
