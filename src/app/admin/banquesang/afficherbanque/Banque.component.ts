
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import {Banquesangservice} from "../banquesang.service";
import { HttpClient } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { BanqueSang } from "../banquesang.model";
import { DataSource } from "@angular/cdk/collections";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BehaviorSubject, fromEvent, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SelectionModel } from "@angular/cdk/collections"; 
import { FormDialogComponent } from "./dialog/form-dialog/form-dialog.component";
import {BreadcrumbComponent} from "src/app/shared/components/breadcrumb/breadcrumb.component"

@Component({
  selector: 'app-banques',
  templateUrl: './Banque.component.html',
  styleUrls: ['./Banque.component.sass']
})
export class BanqueComponent extends UnsubscribeOnDestroyAdapter implements OnInit{
  displayedColumns = [
  "select",
  "idBanqueSang",
  //"nomDonateur",
  "category",
  "company",
  "sang",
  //"p_date",
 // "price",
  //"stock",
 // "quantite",
 // "sangRetire"
  //"actions",
];

exampleDatabase: Banquesangservice | null;
dataSource: ExampleDataSource | null;
selection = new SelectionModel<BanqueSang>(true, []);
index: number;
id: number;
BanqueSang: BanqueSang| null;
quantiteSangRetiree: number;
idBanqueSang: number;
sangRetireTotal = 0;
banques: BanqueSang[] = [];
constructor(
  public httpClient: HttpClient,
  public dialog: MatDialog,
  public Banquesangservice: Banquesangservice,
  private snackBar: MatSnackBar
) {
  super();
}
@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
@ViewChild(MatSort, { static: true }) sort: MatSort;
@ViewChild("filter", { static: true }) filter: ElementRef;
// donateurs: Donateur[] = [];
 Banquesang: any;

ngOnInit() {
  this.loadData();
  this.Banquesangservice.getAllBanqueSangsStat().subscribe((data: BanqueSang[]) => {
    this.banques = data;
    this.getSangRetirePercentages();
  });

  
}
refresh() {
  this.loadData();
}
getSangRetirePercentages(): void {
  this.Banquesangservice.getAllBanqueSangsStat().subscribe((data: BanqueSang[]) => {
    const totalSangRetire = data.reduce((acc, curr) => acc + curr.sangRetire, 0);
    this.banques = data.map(banque => ({
      ...banque,
      sangRetirePercentage: banque.sangRetire / totalSangRetire * 100
    }));
  });
}

retirerSang() {
  const requestBody = { quantiteSangRetiree: this.quantiteSangRetiree };
  this.Banquesangservice.retirerSang(this.idBanqueSang, requestBody).subscribe(
    response => console.log(response),
    error => console.error(error)
    
  );
}
calculateMostBlood(data: any[]) {
  const total = data.reduce((acc, item) => acc + item.sangRetire, 0);
  const rates = {};
  for (const item of data) {
    const rate = Math.round((item.sangRetire / total) * 100);
    rates[item.typeSang] = rate;
  }
  return rates;
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
       BanqueSang: this.BanqueSang,
       action: "add",
     },
     direction: tempDirection,
   });
   this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
   if (result === 1) {
        
       this.exampleDatabase.dataChange.value.unshift(
         this.Banquesangservice.getDialogData()
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

// editCall(row) {
//   this.id = row.idDonateur;
//   // this.nomDonateur = row.nomDonateur;
//   let tempDirection;
//   if (localStorage.getItem("isRtl") === "true") {
//     tempDirection = "rtl";
//   } else {
//     tempDirection = "ltr";
//   }
//   const dialogRef = this.dialog.open(FormDialogComponent, {
//     data: {
//       donateur: row,
//       action: "edit",
//     },
//     direction: tempDirection,
//   });
//   this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
//     if (result === 1) {
//       // When using an edit things are little different, firstly we find record inside DataService by id
//       const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
//         (x) => x.idDonateur === this.id
//       );
//       // Then you update that record using data from dialogData (values you enetered)
//       this.exampleDatabase.dataChange.value[foundIndex] =
//         this.DonateurService.getDialogData();
//       // And lastly refresh table
//       this.refreshTable();
//       this.showNotification(
//         "black",
//         "Edit Record Successfully...!!!",
//         "bottom",
//         "center"
//       );
//     }
//   });
// }


 private refreshTable() {
   this.paginator._changePageSize(this.paginator.pageSize);
 }
// /** Whether the number of selected elements matches the total number of rows. */
// isAllSelected() {
//   const numSelected = this.selection.selected.length;
//   const numRows = this.dataSource.renderedData.length;
//   return numSelected === numRows;
// }

// /** Selects all rows if they are not all selected; otherwise clear selection. */
// masterToggle() {
//   this.isAllSelected()
//     ? this.selection.clear()
//     : this.dataSource.renderedData.forEach((row) =>
//         this.selection.select(row)
//       );
// }
// removeSelectedRows() {
//   const totalSelect = this.selection.selected.length;
//   this.selection.selected.forEach((item) => {
//     const index: number = this.dataSource.renderedData.findIndex(
//       (d) => d === item
//     );
//     // console.log(this.dataSource.renderedData.findIndex((d) => d === item));
//     this.exampleDatabase.dataChange.value.splice(index, 1);
//     this.refreshTable();
//     this.selection = new SelectionModel<Donateur>(true, []);
//   });
//   this.showNotification(
//     "snackbar-danger",
//     totalSelect + " Record Delete Successfully...!!!",
//     "bottom",
//     "center"
//   );
// }
 public loadData() {
  this.exampleDatabase = new Banquesangservice(this.httpClient);
  this.dataSource = new ExampleDataSource(
    this.exampleDatabase,
     this.paginator,
     this.sort
   );
  this.subs.sink = fromEvent(this.filter.nativeElement, "keyup").subscribe(
     () => {
             if (!this.dataSource) {
        return;
      }      this.dataSource.filter = this.filter.nativeElement.value;
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

export class ExampleDataSource extends DataSource<BanqueSang> {
filterChange = new BehaviorSubject("");
get filter(): string {
  return this.filterChange.value;
}
set filter(filter: string) {
  this.filterChange.next(filter);
}
filteredData: BanqueSang[] = [];
renderedData: BanqueSang[] = [];
constructor(
  public exampleDatabase: Banquesangservice,
  public paginator: MatPaginator,
  public _sort: MatSort
) {
  super();
  // Reset to the first page when the user changes the filter.
  this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
}
/** Connect function called by the table to retrieve one stream containing the data to render. */
connect(): Observable<BanqueSang[]> {
  // Listen for any changes in the base data, sorting, filtering, or pagination
  const displayDataChanges = [
    this.exampleDatabase.dataChange,
    this._sort.sortChange,
    this.filterChange,
    this.paginator.page,
  ];
  this.exampleDatabase.getAllBanqueSangs();
  return merge(...displayDataChanges).pipe(
    map(() => {
      // Filter data
      this.filteredData = this.exampleDatabase.data
        .slice()
        .filter((BanqueSang: BanqueSang) => {
          const searchStr = (
            BanqueSang.idBanqueSang +
            BanqueSang.typeSanguin +
            BanqueSang.quantiteTotale +
            BanqueSang.sangRetire 
          
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
sortData(data: BanqueSang[]): BanqueSang[] {
  if (!this._sort.active || this._sort.direction === "") {
    return data;
  }
  return data.sort((a, b) => {
    let propertyA: Date |number | string = "";
    let propertyB: Date | number | string = "";
    switch (this._sort.active) {
      case "idBanqueSang":
        [propertyA, propertyB] = [a.idBanqueSang, b.idBanqueSang];
        break;
      case "m_no":
        [propertyA, propertyB] = [a.typeSanguin, b.typeSanguin];
        break;
      case "m_name":
        [propertyA, propertyB] = [a.quantiteTotale, b.quantiteTotale];
        break;
      case "typesanguin":
        [propertyA, propertyB] = [a.typeSanguin, b.typeSanguin];
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

