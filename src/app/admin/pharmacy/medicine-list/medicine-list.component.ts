import { Component, ElementRef, OnInit, ViewChild ,ChangeDetectorRef } from "@angular/core";
import { MedicineListService } from "./medicine-list.service";
import { HttpClient } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MedicineList } from "./medicine-list.model";
import { DataSource } from "@angular/cdk/collections";
import { FormDialogComponent } from "./dialog/form-dialog/form-dialog.component";
import { DeleteDialogComponent } from "./dialog/delete/delete.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BehaviorSubject, fromEvent, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SelectionModel } from "@angular/cdk/collections";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexYAxis,
  ApexPlotOptions,
  ApexStroke,
  ApexLegend,
  ApexFill,
  ApexResponsive,
} from "ng-apexcharts";
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
  responsive: ApexResponsive[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  colors: string[];
};
@Component({
  selector: "app-medicine-list",
  templateUrl: "./medicine-list.component.html",
  styleUrls: ["./medicine-list.component.sass"],
})
export class MedicineListComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  public doughnutChartLabels: string[] =[];
  public doughnutChartData: number[]=[];
  public doughnutChartLegend = false;
  public doughnutChartColors: any[] = [
    {
      backgroundColor: []
    },
  ];
  public doughnutChartType = "doughnut";
  public doughnutChartOptions: any = {
    animation: false,
    responsive: true,
  };
  public cardChart1: any;
  public cardChart1Data: any;
  public cardChart1Label: any;

  public cardChart2: any;
  public cardChart2Data: any;
  public cardChart2Label: any;

  public cardChart3: any;
  public cardChart3Data: any;
  public cardChart3Label: any;

  public cardChart4: any;
  public cardChart4Data: any;
  public cardChart4Label: any;

  public areaChartOptions: Partial<ChartOptions>;
  public barChartOptions: Partial<ChartOptions>;
  
  displayedColumns = [
    "select",
    "nom",
    "prix",
    "description",
    "stock",
    "actions",
  ];
  displayedColumns2 = [
    "nom",
    "prix",
    "description",
    "stock",
    "counter",
    "TotalforItem",
    "removeCart"
  ];
  SumMedicines: number=0;
  BgColor: string[];
  MedListToChart: any[]=[];
  MedicineType:number=0;
  updateCount:number=0;
  updateTotal:number=0;
  sellsCount: number;
  sellsTotal: number;
  exampleDatabase: MedicineListService | null;
  dataSource: ExampleDataSource | null;
  selection = new SelectionModel<MedicineList>(true, []);
  index: number;
  selectedMedicines: any[] = [];
  selectedMedicinesDataSource:MatTableDataSource<any>;
  id: number;
  medicineList: MedicineList | null;
  
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public medicineListService: MedicineListService,
    private snackBar: MatSnackBar,
    private changeDetectorRefs: ChangeDetectorRef
  ) {
    super();
  }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatTable) table: MatTable<any>;
  ngOnInit() {
    this.getMedicineType()
    this.getSellsTotal()
    this.getSellsCount() 
    this.loadData();
    this.smallChart1();
    this.smallChart2();
    this.smallChart3();
    this.smallChart4();
    this.loadchart();

  }
  
  smallChart4() {
    this.cardChart4 = {
      responsive: true,
      tooltips: {
        enabled: false,
      },
      legend: {
        display: false,
      },
      scales: {
        yAxes: [
          {
            gridLines: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              beginAtZero: true,
              display: false,
            },
          },
        ],
        xAxes: [
          {
            gridLines: {
              drawBorder: false,
              display: false,
            },
            ticks: {
              display: false,
            },
          },
        ],
      },
      title: {
        display: false,
      },
    };
    this.cardChart4Data = [
      {
        label: "New Patients",
        data: [30, 45, 70, 40, 93, 63, 50, 62, 50, 61, 80, 50, 72, 52, 60, 41],
        borderWidth: 4,
        pointStyle: "circle",
        pointRadius: 4,
        borderColor: "rgba(0,123,255,.7)",
        pointBackgroundColor: "rgba(0,123,255,.2)",
        backgroundColor: "rgba(0,123,255,.2)",
        pointBorderColor: "transparent",
      },
    ];
    this.cardChart4Label = [
      "16-07-2018",
      "17-07-2018",
      "18-07-2018",
      "19-07-2018",
      "20-07-2018",
      "21-07-2018",
      "22-07-2018",
      "23-07-2018",
      "24-07-2018",
      "25-07-2018",
      "26-07-2018",
      "27-07-2018",
      "28-07-2018",
      "29-07-2018",
      "30-07-2018",
      "31-07-2018",
    ];
  }
  smallChart3() {
    this.cardChart3 = {
      responsive: true,
      tooltips: {
        enabled: false,
      },
      legend: {
        display: false,
      },
      scales: {
        yAxes: [
          {
            gridLines: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              beginAtZero: true,
              display: false,
            },
          },
        ],
        xAxes: [
          {
            gridLines: {
              drawBorder: false,
              display: false,
            },
            ticks: {
              display: false,
            },
          },
        ],
      },
      title: {
        display: false,
      },
    };
    this.cardChart3Data = [
      {
        label: "New Patients",
        data: [52, 60, 41, 30, 45, 70, 50, 61, 80, 50, 72, 40, 93, 63, 50, 62],
        borderWidth: 4,
        pointStyle: "circle",
        pointRadius: 4,
        borderColor: "rgba(40,167,69,.7)",
        pointBackgroundColor: "rgba(40,167,69,.2)",
        backgroundColor: "rgba(40,167,69,.2)",
        pointBorderColor: "transparent",
      },
    ];
    this.cardChart3Label = [
      "16-07-2018",
      "17-07-2018",
      "18-07-2018",
      "19-07-2018",
      "20-07-2018",
      "21-07-2018",
      "22-07-2018",
      "23-07-2018",
      "24-07-2018",
      "25-07-2018",
      "26-07-2018",
      "27-07-2018",
      "28-07-2018",
      "29-07-2018",
      "30-07-2018",
      "31-07-2018",
    ];
  }
  smallChart2() {
    this.cardChart2 = {
      responsive: true,
      tooltips: {
        enabled: false,
      },
      legend: {
        display: false,
      },
      scales: {
        yAxes: [
          {
            gridLines: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              beginAtZero: true,
              display: false,
            },
          },
        ],
        xAxes: [
          {
            gridLines: {
              drawBorder: false,
              display: false,
            },
            ticks: {
              display: false,
            },
          },
        ],
      },
      title: {
        display: false,
      },
    };
    this.cardChart2Data = [
      {
        label: "New Patients",
        data: [50, 61, 80, 50, 40, 93, 63, 50, 62, 72, 52, 60, 41, 30, 45, 70],
        borderWidth: 4,
        pointStyle: "circle",
        pointRadius: 4,
        borderColor: "rgba(253,126,20,.7)",
        pointBackgroundColor: "rgba(253,126,20,.2)",
        backgroundColor: "rgba(253,126,20,.2)",
        pointBorderColor: "transparent",
      },
    ];
    this.cardChart2Label = [
      "16-07-2018",
      "17-07-2018",
      "18-07-2018",
      "19-07-2018",
      "20-07-2018",
      "21-07-2018",
      "22-07-2018",
      "23-07-2018",
      "24-07-2018",
      "25-07-2018",
      "26-07-2018",
      "27-07-2018",
      "28-07-2018",
      "29-07-2018",
      "30-07-2018",
      "31-07-2018",
    ];
  }
  smallChart1() {
    this.cardChart1 = {
      responsive: true,
      tooltips: {
        enabled: false,
      },
      legend: {
        display: false,
      },
      scales: {
        yAxes: [
          {
            gridLines: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              beginAtZero: true,
              display: false,
            },
          },
        ],
        xAxes: [
          {
            gridLines: {
              drawBorder: false,
              display: false,
            },
            ticks: {
              display: false,
            },
          },
        ],
      },
      title: {
        display: false,
      },
    };
    this.cardChart1Data = [
      {
        label: "New Patients",
        data: [50, 61, 80, 50, 72, 52, 60, 41, 30, 45, 70, 40, 93, 63, 50, 62],
        borderWidth: 4,
        pointStyle: "circle",
        pointRadius: 4,
        borderColor: "rgba(103,119,239,.7)",
        pointBackgroundColor: "rgba(103,119,239,.2)",
        backgroundColor: "rgba(103,119,239,.2)",
        pointBorderColor: "transparent",
      },
    ];
    this.cardChart1Label = [
      "16-07-2018",
      "17-07-2018",
      "18-07-2018",
      "19-07-2018",
      "20-07-2018",
      "21-07-2018",
      "22-07-2018",
      "23-07-2018",
      "24-07-2018",
      "25-07-2018",
      "26-07-2018",
      "27-07-2018",
      "28-07-2018",
      "29-07-2018",
      "30-07-2018",
      "31-07-2018",
    ];
  }
  refresh() {
    this.loadData();
  }
  countMedicines() {
    this.SumMedicines = this.dataSource.renderedData.reduce((acc, curr) => acc + Number(curr.stock), 0);
    return this.SumMedicines;
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
        medicineList: this.medicineList,
        action: "add",
      },
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.exampleDatabase.dataChange.value.unshift(
          this.medicineListService.getDialogData()
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
  getMedicineType()
  {
    this.medicineListService.getMedicineTypes().subscribe(result => {
      this.MedicineType = result;
    });
  }
  editCall(row) {
    this.id = row.id;
    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        medicineList: row,
        action: "edit",
      },
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
          (x) => x.id === this.id
        );
        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase.dataChange.value[foundIndex] =
          this.medicineListService.getDialogData();
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
    this.id = row.id;
    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: row,
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
          (x) => x.id === this.id
        );
        // for delete we use splice in order to remove single object from DataService
        this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
        this.showNotification(
          "snackbar-danger",
          "Delete Record Successfully",
          "bottom",
          "center"
        );
      }
    });
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
  checkMin(Quan){
    if(Quan.counter<= 1 )
    {
      const index = this.selectedMedicines.indexOf(Quan);
    this.selectedMedicines.splice(index, 1);
    this.selectedMedicinesDataSource = new MatTableDataSource(this.selectedMedicines);
  this.changeDetectorRefs.detectChanges();
    }
  }
  checkMax(Quan){
    if(Quan.counter >= Quan.stock)
    return true;
  }
  Sell()
  {
    
    for (let item of this.selectedMedicines) {
      item.stock=item.stock-item.counter;
      this.updateTotal=this.updateTotal+(item.prix*item.counter)
    }
    this.medicineListService.sellMedicines(this.selectedMedicines)
    this.medicineListService.setAddSellTotal(this.updateTotal); 
    this.medicineListService.setAddSellCount(1)
  }
  checkCart(){
    return this.selectedMedicines.length==0
  }
  getTotal() {
    
    let sum = 0;
    for (let item of this.selectedMedicines) {
      sum += item.prix*item.counter;
    }
    return sum;
 
  }
  getSellsCount() {
    this.medicineListService.getSellCount().subscribe(result => {
      this.sellsCount = result;
    });
  }
  getSellsTotal() {
  
    this.medicineListService.getSellTotal().subscribe(result => {
      this.sellsTotal = result;
    });
  }
  
  addItemtoCart(row){
    const existingItem = this.selectedMedicines.find(item => item.id === row.id);
  if (existingItem) {
    existingItem.counter += 1;
  } else {
    row.counter = 1;
    this.selectedMedicines.push(row);
  }
  this.selectedMedicinesDataSource = new MatTableDataSource(this.selectedMedicines);
  this.changeDetectorRefs.detectChanges();
  }
  checkStock(row)
  {
    if(row.stock <=0 ||row.counter >= row.stock)
    return true;
  }
  removecart(row)
  {
    const index = this.selectedMedicines.indexOf(row);
    this.selectedMedicines.splice(index, 1);
    this.selectedMedicinesDataSource = new MatTableDataSource(this.selectedMedicines);
  this.changeDetectorRefs.detectChanges();
  }
  removeSelectedRows() {
    const totalSelect = this.selection.selected.length;
    this.selection.selected.forEach((item) => {
      const index: number = this.dataSource.renderedData.findIndex(
        (d) => d === item
      ); 
      this.exampleDatabase.dataChange.value.splice(index, 1);
      this.refreshTable();
      this.selection = new SelectionModel<MedicineList>(true, []);
    });
    this.showNotification(
      "snackbar-danger",
      totalSelect + " Record Delete Successfully",
      "bottom",
      "center"
    );
  }
  public loadData() {
    this.exampleDatabase = new MedicineListService(this.httpClient);
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
  loadchart(){
    this.medicineListService.getMedicineListforChart().subscribe(result => {
      this.MedListToChart = result;
      this.doughnutChartLabels = this.MedListToChart.map((medicine) => medicine.nom);
      this.doughnutChartData = this.MedListToChart.map((medicine) => Number((medicine.stock)));
      this.doughnutChartColors[0].backgroundColor = this.doughnutChartData.map(() => {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r},${g},${b})`;
        
      });
      this.BgColor = this.doughnutChartColors[0].backgroundColor;
    });
  } 
 
}



export class ExampleDataSource extends DataSource<MedicineList> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: MedicineList[] = [];
  renderedData: MedicineList[] = [];
  constructor(
    public exampleDatabase: MedicineListService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<MedicineList[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getAllMedicineLists();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((medicineList: MedicineList) => {
            const searchStr = (
              medicineList.nom +
              medicineList.description +
              medicineList.prix +
              medicineList.stock
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
  sortData(data: MedicineList[]): MedicineList[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";
      switch (this._sort.active) {
        case "id":
          [propertyA, propertyB] = [a.id, b.id];
          break;
        case "nom":
          [propertyA, propertyB] = [a.nom, b.nom];
          break;
        case "description":
          [propertyA, propertyB] = [a.description, b.description];
          break;
        case "prix":
          [propertyA, propertyB] = [a.prix, b.prix];
          break;
        case "stock":
          [propertyA, propertyB] = [a.stock, b.stock];
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
