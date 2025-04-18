import { Component, OnInit } from '@angular/core';
import { type ChartData } from 'chart.js';
import { ChartModule } from 'primeng/chart';
import { DataService } from '../app/services/data.service'; // adjust path if needed

@Component({
  selector: 'app-chart',
  imports: [ChartModule],
  standalone: true,
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.sass'
})
export class ChartComponent implements OnInit {
  data: ChartData<'doughnut'> = {
    labels: [],
    datasets: [
      {
        backgroundColor: ['#fff700', '#ff7b00', '#c90000', '#008000'],
        data: []
      }
    ]
  };

  options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  };

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getData().subscribe((entries) => {
      this.prepareChartData(entries);
    });
  }

  prepareChartData(entries: any[]) {
    const levels = ['green', 'yellow', 'orange', 'red'];
    const colorMap: { [key: string]: string } = {
      green: '#008000',
      yellow: '#fff700',
      orange: '#ff7b00',
      red: '#c90000'
    };
  
    const counts: { [key: string]: number } = {
      green: 0,
      yellow: 0,
      orange: 0,
      red: 0
    };
  
    entries.forEach((entry) => {
      const ti = entry.TI.toLowerCase();
      if (counts[ti] !== undefined) {
        counts[ti]++;
      }
    });
  
    this.data = {
      labels: levels,
      datasets: [
        {
          backgroundColor: levels.map(level => colorMap[level]),
          data: levels.map(level => counts[level])
        }
      ]
    };
  }
}
