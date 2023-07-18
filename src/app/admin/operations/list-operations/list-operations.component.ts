import { Component, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Operation } from "src/app/admin/operations/model/operation";
import { LogisticsService } from "src/app/core/service/logistics.service";
import { OperationService } from "src/app/core/service/operation.service";
import { Logistique } from "../../logistics/model/logistique";

@Component({
  selector: "app-list-operations",
  templateUrl: "./list-operations.component.html",
  styleUrls: ["./list-operations.component.sass"],
})
export class ListOperationsComponent implements OnInit {
  operations: Operation[] = [];
  filteredOperations: Operation[] = [];
  searchTerm: string = "";
  successRates: Map<string, number> = new Map<string, number>();
  sortingCriteria: string = "";
  lowValue: number = 0;
  highValue: number = 10;

  constructor(
    private operationService: OperationService,
    private logisService: LogisticsService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getAllOperations();
    this.getSuccessRatesByType();
  }

  // used to build a slice of papers relevant at any given time
  public getPaginatorData(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }

  getAllOperations() {
    this.operationService.getAllOperations().subscribe({
      next: (data) => {
        this.operations = data;
        this.setLogistics();
        this.sortOperations();
        this.filterOperations();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  setLogistics() {
    this.operations.forEach((op) => {
      let logist: Logistique[] = [];

      console.table(op);

      op.logistiques.forEach((logis: any) =>
        this.logisService.getLogistiqueById(logis).subscribe({
          next: (lo) => logist.push(lo),
        })
      );

      op.logistiques = logist;
    });
  }

  sortByType() {
    this.sortingCriteria = "typeOp";
    this.sortOperations();
  }

  sortByDate() {
    this.sortingCriteria = "dateOp";
    this.sortOperations();
  }

  sortByTypeAndDate() {
    this.sortingCriteria = "typeAndDate";
    this.sortOperations();
  }

  sortOperations() {
    if (this.sortingCriteria) {
      const criteriaArray = this.sortingCriteria.split("-");
      const isDescending = this.sortingCriteria.startsWith("-");

      this.operations.sort((a, b) => {
        for (let i = 0; i < criteriaArray.length; i++) {
          const field = criteriaArray[i];

          if (field === "dateOp") {
            const compareResult =
              a[field] > b[field] ? 1 : a[field] < b[field] ? -1 : 0;
            if (compareResult !== 0) {
              return isDescending ? -compareResult : compareResult;
            }
          } else if (field === "typeOp") {
            const compareResult =
              a[field].toLowerCase() > b[field].toLowerCase()
                ? 1
                : a[field].toLowerCase() < b[field].toLowerCase()
                ? -1
                : 0;
            if (compareResult !== 0) {
              return isDescending ? -compareResult : compareResult;
            }
          }
        }
        // If all criteria match, sort by idOp
        return isDescending ? b.idOp - a.idOp : a.idOp - b.idOp;
      });
    }
  }

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  toggleSuccess(operation: Operation): void {
    operation.success = !operation.success;
    this.operationService.updateOperation(operation).subscribe({
      next: (updatedOperation) => {
        const index = this.filteredOperations.indexOf(operation);
        if (index !== -1) {
          this.filteredOperations[index].success = updatedOperation.success;
          this.successRates.set(
            operation.typeOp,
            this.successRates.get(operation.typeOp) +
              (operation.success ? 1 : -1)
          );
        }
      },
      error: (_) => {
        this.openSnackBar("Add failed!", "😔");
      },
    });
  }

  filterOperations() {
    if (this.searchTerm) {
      this.filteredOperations = this.operations.filter(
        (operation) =>
          (operation.typeOp &&
            operation.typeOp
              .toLowerCase()
              .includes(this.searchTerm.toLowerCase())) ||
          (operation.nomChi &&
            operation.nomChi
              .toLowerCase()
              .includes(this.searchTerm.toLowerCase())) ||
          (operation.nomP &&
            operation.nomP
              .toLowerCase()
              .includes(this.searchTerm.toLowerCase()))
      );
    } else {
      this.filteredOperations = this.operations;
    }
  }

  getSuccessRatesByType() {
    this.operationService.getSuccessRatesByType().subscribe(
      (rates) => {
        this.successRates = rates;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public deleteOperation(id: number) {
    console.log(id);
    this.operationService.deleteOperation(id).subscribe({
      next: () => {
        this.operations = this.operations.filter((o) => o.idOp !== id);
        this.sortOperations();
        this.filterOperations();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  setSortingCriteria(criteria: string) {
    if (this.sortingCriteria === criteria) {
      // toggle sorting direction
      this.sortingCriteria = "-" + criteria;
    } else {
      this.sortingCriteria = criteria;
    }
    this.sortOperations();
    this.filterOperations();
  }

  clearSortingCriteria() {
    this.sortingCriteria = "";
    this.sortOperations();
    this.filterOperations();
  }
}
