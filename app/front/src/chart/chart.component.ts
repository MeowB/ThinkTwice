import { Component } from '@angular/core';
import { type ChartData } from 'chart.js';
import { ChartjsComponent } from '@coreui/angular-chartjs';

@Component({
  selector: 'app-chart',
  imports: [ChartjsComponent],
  standalone: true,
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.sass'
})
export class ChartComponent {
  data: ChartData = {
    labels: ['i tox 1', 'i tox 2', 'i tox 3', 'i tox 4'],
    datasets: [
      {
        backgroundColor: ['#008000', '#fff700', '#ff7b00', '#c90000'],
        data: [120, 82, 58, 15]
      }
    ]
  };
}