import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { DataService } from '../app/services/data.service'; // adjust path if needed

@Component({
  selector: 'app-table',
  imports: [TableModule],
  standalone: true,
  templateUrl: './table.component.html',
  styleUrl: './table.component.sass'
})
export class TableComponent implements OnInit {
  datas: any[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getData().subscribe((entries) => {
      this.datas = entries; 
    });
  }
}
