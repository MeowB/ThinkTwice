import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-table',
  imports: [TableModule],
  standalone: true,
  templateUrl: './table.component.html',
  styleUrl: './table.component.sass'
})
export class TableComponent {
  datas = [
    {WP: 'word 1', TI: 'red', URL: '1.1.1', DATE: '1/1'},
    {WP: 'word 2', TI: 'green', URL: '2.2.2', DATE: '1/1'},
    {WP: 'word 3', TI: 'red', URL: '1.1.1', DATE: '2/1'},
    {WP: 'word 4', TI: 'orange', URL: '1.1.1', DATE: '4/1'},
    {WP: 'word 5', TI: 'yellow', URL: '3.3.3', DATE: '5/5'},
    {WP: 'word 6', TI: 'red', URL: '3.3.3', DATE: '5/1'},
    {WP: 'word 7', TI: 'green', URL: '1.1.1', DATE: '8/1'},
    {WP: 'word 8', TI: 'green', URL: '3.3.3', DATE: '8/1'},
    {WP: 'word 9', TI: 'yellow', URL: '2.2.2', DATE: '8/1'},
    {WP: 'word 10', TI: 'red', URL: '2.2.2', DATE: '9/1'},
    {WP: 'word 11', TI: 'orange', URL: '2.2.2', DATE: '9/1'},
    {WP: 'word 12', TI: 'green', URL: '1.1.1', DATE: '9/1'},
    {WP: 'word 13', TI: 'yellow', URL: '1.1.1', DATE: '9/1'},
    {WP: 'word 14', TI: 'green', URL: '3.3.3', DATE: '10/1'},
    {WP: 'word 15', TI: 'green', URL: '2.2.2', DATE: '13/1'},
    {WP: 'word 16', TI: 'yellow', URL: '3.3.3', DATE: '16/1'},
    {WP: 'word 17', TI: 'yellow', URL: '1.1.1', DATE: '16/1'},
    {WP: 'word 18', TI: 'green', URL: '1.1.1', DATE: '16/1'},
    {WP: 'word 19', TI: 'yellow', URL: '3.3.3', DATE: '18/1'},
    {WP: 'word 20', TI: 'green', URL: '2.2.2', DATE: '18/1'},
    {WP: 'word 21', TI: 'red', URL: '1.1.1', DATE: '22/1'},
    {WP: 'word 22', TI: 'yellow', URL: '3.3.3', DATE: '23/1'},
    {WP: 'word 23', TI: 'orange', URL: '1.1.1', DATE: '25/1'},
    {WP: 'word 24', TI: 'green', URL: '1.1.1', DATE: '26/1'},
    {WP: 'word 25', TI: 'green', URL: '3.3.3', DATE: '26/1'},
    {WP: 'word 26', TI: 'green', URL: '2.2.2', DATE: '26/1'},
    {WP: 'word 27', TI: 'yellow', URL: '3.3.3', DATE: '26/1'},
    {WP: 'word 28', TI: 'red', URL: '1.1.1', DATE: '28/1'},
    {WP: 'word 29', TI: 'green', URL: '2.2.2', DATE: '29/1'},
    {WP: 'word 30', TI: 'orange', URL: '3.3.3', DATE: '31/1'}
  ]
}
