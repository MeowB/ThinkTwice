import { Component } from '@angular/core';
import { ChartComponent } from '../chart/chart.component';
import { TableComponent } from '../table/table.component';
import { StackComponent } from '../stack/stack.component';

@Component({
  selector: 'app-dashboard',
  imports: [ChartComponent, TableComponent, StackComponent],
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.sass'
})
export class DashboardComponent {

}
