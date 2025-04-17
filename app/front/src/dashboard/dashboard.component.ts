import { Component } from '@angular/core';
import { ChartComponent } from '../chart/chart.component';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-dashboard',
  imports: [ChartComponent, TableComponent],
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.sass'
})
export class DashboardComponent {

}
