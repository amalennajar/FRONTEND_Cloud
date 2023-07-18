import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import {DonateurService} from "../donateur.service";
import { HttpClient } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { Donateur } from "../donateur.model";
import { DataSource } from "@angular/cdk/collections";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BehaviorSubject, fromEvent, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SelectionModel } from "@angular/cdk/collections";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { FormDialogComponent } from "./dialog/form-dialog/form-dialog.component";
@Component({
  selector: 'app-donateur',
  templateUrl: './donateur.component.html',
  styleUrls: ['./donateur.component.sass']
})
export class DonateurComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  TypeSanguin: string[] = ['A_POSITIF']; 
  displayedColumns = [
    "select",
    "m_no",
    "nomDonateur",
    "category",
    "company",
    "p_date",
    "price",
    "stock",
    "quantite",
    "actions",
  ];


  exampleDatabase: DonateurService | null;
  dataSource: ExampleDataSource | null;
  selection = new SelectionModel<Donateur>(true, []);
  index: number;
  id: number;
  Donateur: Donateur| null;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public DonateurService: DonateurService,
    private snackBar: MatSnackBar
  ) {
    super();
  }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
// donateurs: Donateur[] = [];
donateurs: any;

ngOnInit() {
  this.loadData();
}
refresh() {
  this.loadData();
}

addNew() {
  let tempDirection;
  if (localStorage.getItem("isRtl") === "true") {
    tempDirection = "rtl";
  } else {
    tempDirection = "ltr";
  }
  const dialogRef = this.dialog.open(FormDialogComponent, {
    data: {
      Donateur: this.Donateur,
      action: "add",
    },
    direction: tempDirection,
  });
  this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
    if (result === 1) {
      // After dialog is closed we're doing frontend updates
      // For add we're just pushing a new row inside DataService
      this.exampleDatabase.dataChange.value.unshift(
        this.DonateurService.getDialogData()
      );
      this.refreshTable();
      this.showNotification(
        "snackbar-success",
        "Add Record Successfully...!!!",
        "bottom",
        "center"
      );
    }
  });
}

editCall(row) {
  this.id = row.idDonateur;
  // this.nomDonateur = row.nomDonateur;
  let tempDirection;
  if (localStorage.getItem("isRtl") === "true") {
    tempDirection = "rtl";
  } else {
    tempDirection = "ltr";
  }
  const dialogRef = this.dialog.open(FormDialogComponent, {
    data: {
      donateur: row,
      action: "edit",
    },
    direction: tempDirection,
  });
  this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
    if (result === 1) {
      // When using an edit things are little different, firstly we find record inside DataService by id
      const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
        (x) => x.idDonateur === this.id
      );
      // Then you update that record using data from dialogData (values you enetered)
      this.exampleDatabase.dataChange.value[foundIndex] =
        this.DonateurService.getDialogData();
      // And lastly refresh table
      this.refreshTable();
      this.showNotification(
        "black",
        "Edit Record Successfully...!!!",
        "bottom",
        "center"
      );
    }
  });
}

deleteItem(row) {
  this.id = row.idDonateur;
  this.DonateurService.deleteDonateur(this.id, () => {
    this.refresh();
    this.refreshTable()
  })
}
private refreshTable() {
  this.paginator._changePageSize(this.paginator.pageSize);
}
/** Whether the number of selected elements matches the total number of rows. */
isAllSelected() {
  const numSelected = this.selection.selected.length;
  const numRows = this.dataSource.renderedData.length;
  return numSelected === numRows;
}

/** Selects all rows if they are not all selected; otherwise clear selection. */
masterToggle() {
  this.isAllSelected()
    ? this.selection.clear()
    : this.dataSource.renderedData.forEach((row) =>
        this.selection.select(row)
      );
}
removeSelectedRows() {
  const totalSelect = this.selection.selected.length;
  this.selection.selected.forEach((item) => {
    const index: number = this.dataSource.renderedData.findIndex(
      (d) => d === item
    );
    // console.log(this.dataSource.renderedData.findIndex((d) => d === item));
    this.exampleDatabase.dataChange.value.splice(index, 1);
    this.refreshTable();
    this.selection = new SelectionModel<Donateur>(true, []);
  });
  this.showNotification(
    "snackbar-danger",
    totalSelect + " Record Delete Successfully...!!!",
    "bottom",
    "center"
  );
}
public loadData() {
  this.exampleDatabase = new DonateurService(this.httpClient);
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
showNotification(colorName, text, placementFrom, placementAlign) {
  this.snackBar.open(text, "", {
    duration: 2000,
    verticalPosition: placementFrom,
    horizontalPosition: placementAlign,
    panelClass: colorName,
  });
}
}
export class ExampleDataSource extends DataSource<Donateur> {
filterChange = new BehaviorSubject("");
get filter(): string {
  return this.filterChange.value;
}
set filter(filter: string) {
  this.filterChange.next(filter);
}
filteredData: Donateur[] = [];
renderedData: Donateur[] = [];
constructor(
  public exampleDatabase: DonateurService,
  public paginator: MatPaginator,
  public _sort: MatSort
) {
  super();
  // Reset to the first page when the user changes the filter.
  this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
}
/** Connect function called by the table to retrieve one stream containing the data to render. */
connect(): Observable<Donateur[]> {
  // Listen for any changes in the base data, sorting, filtering, or pagination
  const displayDataChanges = [
    this.exampleDatabase.dataChange,
    this._sort.sortChange,
    this.filterChange,
    this.paginator.page,
  ];
  this.exampleDatabase.getAllDonateurs();
  return merge(...displayDataChanges).pipe(
    map(() => {
      // Filter data
      this.filteredData = this.exampleDatabase.data
        .slice()
        .filter((donateur: Donateur) => {
          const searchStr = (
            donateur.adresse +
            donateur.banqueSang +
            donateur.dernierDon +
            donateur.nomDonateur +
            donateur.numeroTelephone +
            donateur.prenomDonateur +
            donateur.typeS +
            donateur.quantiteTotale
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
sortData(data: Donateur[]): Donateur[] {
  if (!this._sort.active || this._sort.direction === "") {
    return data;
  }
  return data.sort((a, b) => {
    let propertyA: Date |number | string = "";
    let propertyB: Date | number | string = "";
    switch (this._sort.active) {
      case "id":
        [propertyA, propertyB] = [a.adresse, b.adresse];
        break;
      case "m_no":
        [propertyA, propertyB] = [a.banqueSang, b.banqueSang];
        break;
      case "m_name":
        [propertyA, propertyB] = [a.dernierDon, b.dernierDon];
        break;
      case "nomDonateur":
        [propertyA, propertyB] = [a.nomDonateur, b.nomDonateur];
        break;
      case "company":
        [propertyA, propertyB] = [a.prenomDonateur, b.prenomDonateur];
        break;
      case "p_date":
        [propertyA, propertyB] = [a.quantiteTotale, b.quantiteTotale];
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

