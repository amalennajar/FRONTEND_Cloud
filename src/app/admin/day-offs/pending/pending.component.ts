import { Component, OnInit, ElementRef,ViewChild } from '@angular/core';
import {DayOffsService} from "../day-offs.service"
import { HttpClient } from "@angular/common/http";
import {DayOff} from "../day-offs.model"
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { delay, map } from "rxjs/operators";
import { DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, fromEvent, merge, Observable } from "rxjs";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { SelectionModel } from "@angular/cdk/collections";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DayOffDetailsDialogComponent } from '../all-day-offs/dialogs/day-off-details/day-off-details.component';




@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.sass']
})
export class PendingComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  displayedColumns = [
    "id",
    "img",
    "name",
    "status",
    "dateDebut",
    "reason",
    "actions",
  ];

  exampleDatabase: DayOffsService | null;
  dataSource: ExampleDataSource | null;
  selection = new SelectionModel<DayOff>(true, []);
  index: number;
  id: string;
  pendings: DayOff | null;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public dayOffsService: DayOffsService,
    private snackBar: MatSnackBar
  ) {
    super();
  }



  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;

  ngOnInit(): void {
    this.loadData();
    this.dayOffsService.dayOffStatusUpdated.subscribe(() => {
      this.refreshTable();
    });

  }
  refresh() {
    this.loadData();
  }

  onAcceptClick(id: string) {
   this.dayOffsService.updateDayOffStatus(id, "approved", () => {
      this.refresh();
      this.refreshTable()
    });
  }

  onRejectClick(id: string) {
    this.dayOffsService.updateDayOffStatus(id, "rejected", () => {
      this.refresh();
      this.refreshTable()
    });
  }
  openDetailsDialog(row) {
    const dialogRef = this.dialog.open(DayOffDetailsDialogComponent, {
      data: {
        dayOff: row,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
    dialogRef.componentInstance.statusUpdated.subscribe((status: string) => {
      // refresh the table
      this.refresh();
      this.refreshTable();

      // show a snackbar message
      this.snackBar.open(`Day off ${status} successfully`, "Close", {
        duration: 2000,
      });
    });
  }


  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }


  public loadData() {
    this.exampleDatabase = new DayOffsService(this.httpClient);
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
      this.paginator,
      this.sort
    );
    this.subs.sink = fromEvent(this.filter.nativeElement, "keyup").subscribe(
      () => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      }
    );
  }

}
export class ExampleDataSource extends DataSource<DayOff> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: DayOff[] = [];
  renderedData: DayOff[] = [];
  constructor(
    public exampleDatabase: DayOffsService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<DayOff[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];

    this.exampleDatabase.getPendingDayOffs();
    console.log(this.renderedData)
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((dayOff: DayOff) => {
            const searchStr = (
              dayOff.user.nom +
              dayOff.user.prenom +
              dayOff.user.username+
              dayOff.user.role
            ).toLowerCase();
            return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
          });
        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());
        // Grab the page's slice of the filtered sorted data.
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        this.renderedData = sortedData.splice(
          startIndex,
          this.paginator.pageSize
        );
        return this.renderedData;
      })
    );
  }
  disconnect() {}
  /** Returns a sorted copy of the database data. */
  sortData(data: DayOff[]):DayOff[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: Date | number | string = "";
      let propertyB: Date | number | string = "";
      switch (this._sort.active) {
        case "id":
          [propertyA, propertyB] = [a.id, b.id];
          break;
        case "status":
          [propertyA, propertyB] = [a.status, b.status];
          break;
        case "reason":
          [propertyA, propertyB] = [a.reason, b.reason];
          break;
        case "startDate":
          [propertyA, propertyB] = [a.startDate, b.startDate];
          break;
        case "endDate":
          [propertyA, propertyB] = [a.endDate, b.endDate];
          break;
      }
      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction === "asc" ? 1 : -1)
      );
    });
  }
}
