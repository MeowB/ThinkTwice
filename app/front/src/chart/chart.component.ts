import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  imports: [],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.sass'
})
export class ChartComponent implements OnInit {
  public config: any = {
    type: 'pie',
    data: {
      labels: ['Red', 'Blue', 'Yellow'],
      datasets: [{
        label: 'My First Dataset',
        data: [300, 50, 100],
        backgroundColor: 'blue'
      },
      {
        label: 'My Second Dataset',
        data: [30, 80, 300],
        backgroundColor: 'red'
      },
      ],
    },
  };
  chart: any;
  ngOnInit(): void {
    this.chart = new Chart('myChart', this.config);
  }
}
