import { Component, OnInit, AfterViewInit, ViewChild, Input, Output, EventEmitter } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort, Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Post } from "src/app/core/models/Post.model";
import { TableColumn } from "../../core/models/TableColumn.model";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent implements OnInit, AfterViewInit {
  

  public tableDataSource = new MatTableDataSource([]);
  public displayedColumns!: string[];
  @ViewChild(MatPaginator, {static: false}) matPaginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) matSort!: MatSort;

  @Input() isPageable = false;
  @Input() isSortable = false;
  @Input() isFilterable = false;
  @Input() tableColumns: TableColumn[] = []
  @Input() paginationSizes: number[] = [5, 10, 15];
  @Input() defaultPageSize = this.paginationSizes[1];

  @Output() sort: EventEmitter<Sort> = new EventEmitter();
  @Output() rowActionEdit: EventEmitter<any> = new EventEmitter<any>();
  @Output() rowActionDelete: EventEmitter<any> = new EventEmitter<any>();

  
  @Input() set tableData(data: any[] | null) {
   if(data) this.setTableDataSource(data);
  }

  constructor() {}

  ngOnInit(): void {
    const columnNames = this.tableColumns.map((tableColumn: TableColumn) => tableColumn.name);
      this.displayedColumns = [...columnNames, "actions"]
  }

  ngAfterViewInit(): void {
    this.tableDataSource.paginator = this.matPaginator;
  }

  setTableDataSource(data: any) {
    this.tableDataSource = new MatTableDataSource<never>(data);
    this.tableDataSource.paginator = this.matPaginator;
    this.tableDataSource.sort = this.matSort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableDataSource.filter = filterValue.trim().toLowerCase();
  }

  sortTable(sortParameters: any) {
    if(this.tableColumns.length > 0) {
      sortParameters.active = this.tableColumns.find((column: any) => column.name === sortParameters.active)!.dataKey;
      this.sort.emit(sortParameters);
    }

  }

  emitRowActionEdit(row: Post) {
    this.rowActionEdit.emit(row);
  }

  emitRowActionDelete(row: Post) {
    console.log('row delete:', row)
    this.rowActionDelete.emit(row);
  }
}
