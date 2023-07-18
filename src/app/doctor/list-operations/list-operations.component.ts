import { Component, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { Operation } from "src/app/admin/operations/model/operation";
import { OperationService } from "src/app/core/service/operation.service";

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

  constructor(private operationService: OperationService) {}

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
        this.sortOperations();
        this.filterOperations();
      },
      error: (error) => {
        console.log(error);
      },
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
