import { Component } from '@angular/core';
import { type ChartData } from 'chart.js';
import { ChartjsComponent } from '@coreui/angular-chartjs';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  standalone: true,
  imports: [ChartjsComponent]
})
export class ChartComponent {
  data: ChartData = {
    labels: ['VueJs', 'EmberJs', 'ReactJs', 'Angular', 'NodeJs'],
    datasets: [
      {
        backgroundColor: ['#8BC7B0', '#FEF5EC', '#775897', '#C2A8EB', '#6E57A5'],
        data: [40, 20, 80, 10]
      }
    ]
  };
}