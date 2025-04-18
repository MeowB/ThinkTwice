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
    const urlCount: { [key: string]: { red: number, yellow: number, orange: number, green: number } } = {};

    this.jsonData.forEach(item => {
      const url = item.URL;
      const ti = item.TI;

      if (!urlCount[url]) {
        urlCount[url] = { red: 0, yellow: 0, orange: 0, green: 0 };
      }

      if (ti === 'red') urlCount[url].red++;
      if (ti === 'yellow') urlCount[url].yellow++;
      if (ti === 'orange') urlCount[url].orange++;
      if (ti === 'green') urlCount[url].green++;
    });

    const labels = Object.keys(urlCount); 
    const redData = labels.map(url => urlCount[url].red);
    const yellowData = labels.map(url => urlCount[url].yellow);
    const orangeData = labels.map(url => urlCount[url].orange);
    const greenData = labels.map(url => urlCount[url].green);

    this.data = {
      labels: labels,
      datasets: [
        {
          type: 'bar',
          label: 'Red',
          backgroundColor: '#c90000', 
          data: redData
        },
        {
          type: 'bar',
          label: 'Yellow',
          backgroundColor: '#fff700',
          data: yellowData
        },
        {
          type: 'bar',
          label: 'Orange',
          backgroundColor: '#ff7b00',
          data: orangeData
        },
        {
          type: 'bar',
          label: 'Green',
          backgroundColor: '#008000', 
          data: greenData
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