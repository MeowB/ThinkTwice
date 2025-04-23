import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { DataService } from '../app/services/data.service';

@Component({
  selector: 'app-stack',
  imports: [ChartModule],
  standalone: true,
  templateUrl: './stack.component.html',
  styleUrl: './stack.component.sass'
})
export class StackComponent implements OnInit {
  data: any;
  options: any;

  jsonData: any[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getData().subscribe(
      (data: any[]) => {
        this.jsonData = data; 
        this.processData(); 
        this.initChart();
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  processData() {
    const urlCount: { [key: string]: { danger: number, warning: number, alert: number, safe: number } } = {};

    this.jsonData.forEach(item => {
      const url = item.URL;
      const ti = item.TI;

      if (!urlCount[url]) {
        urlCount[url] = { danger: 0, warning: 0, alert: 0, safe: 0 };
      }

      if (ti === 'danger') urlCount[url].danger++;
      if (ti === 'warning') urlCount[url].warning++;
      if (ti === 'alert') urlCount[url].alert++;
      if (ti === 'safe') urlCount[url].safe++;
    });

    const labels = Object.keys(urlCount); 
    const dangerData = labels.map(url => urlCount[url].danger);
    const warningData = labels.map(url => urlCount[url].warning);
    const alertData = labels.map(url => urlCount[url].alert);
    const safeData = labels.map(url => urlCount[url].safe);

    this.data = {
      labels: labels,
      datasets: [
        {
          type: 'bar',
          label: 'Danger',
          backgroundColor: '#ffb3b3', 
          data: dangerData
        },
        {
          type: 'bar',
          label: 'Warning',
          backgroundColor: '#fdc48e',
          data: warningData
        },
        {
          type: 'bar',
          label: 'Alert',
          backgroundColor: '#fff89a',
          data: alertData
        },
        {
          type: 'bar',
          label: 'Safe',
          backgroundColor: '#b3e3c2', 
          data: safeData
        }
      ]
    };
  }

  initChart() {
    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        tooltip: {
          mode: 'index',
          intersect: false
        },
        legend: {
          labels: {
            color: '#000'
          }
        }
      },
      scales: {
        x: {
          stacked: true
        },
        y: {
          stacked: true
        }
      }
    };
  }
}