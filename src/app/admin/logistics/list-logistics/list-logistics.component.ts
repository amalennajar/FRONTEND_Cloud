import { Component, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Logistique } from "src/app/admin/logistics/model/logistique";
import { LogisticsService } from "src/app/core/service/logistics.service";

@Component({
  selector: "app-list-logistics",
  templateUrl: "./list-logistics.component.html",
  styleUrls: ["./list-logistics.component.sass"],
})
export class ListLogisticsComponent implements OnInit {
  logistiques: Logistique[] = [];
  filteredLogistiques: Logistique[] = [];
  errorMessage = "";
  lowValue: number = 0;
  searchTerm: string = "";
  sortingCriteria: string = "";
  highValue: number = 10;

  constructor(
    private logistiqueService: LogisticsService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getLogistiques();
  }

  // used to build a slice of papers relevant at any given time
  public getPaginatorData(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }

  getLogistiques(): void {
    this.logistiqueService.getAllLogistiques().subscribe({
      next: (logistiques) => {
        this.logistiques = logistiques;
        this.sortLogisticss();
        this.filterLogistics();
      },
      error: (error) => {
        this.errorMessage = error;
      },
    });
  }

  sortByType() {
    this.sortingCriteria = "typeLogi";
    this.sortLogisticss();
  }

  sortByNom() {
    this.sortingCriteria = "nomLogi";
    this.sortLogisticss();
  }

  sortByNombre() {
    this.sortingCriteria = "nombreLogits";
    this.sortLogisticss();
  }

  sortByTypeAndNom() {
    this.sortingCriteria = "typeAndNom";
    this.sortLogisticss();
  }

  filterLogistics() {
    if (this.searchTerm) {
      this.filteredLogistiques = this.logistiques.filter(
        (operation) =>
          (operation.typeLogi &&
            operation.typeLogi
              .toLowerCase()
              .includes(this.searchTerm.toLowerCase())) ||
          (operation.nomLogi &&
            operation.nomLogi
              .toLowerCase()
              .includes(this.searchTerm.toLowerCase())) ||
          (operation.nombreLogi && operation.nombreLogi == +this.searchTerm)
      );
    } else {
      this.filteredLogistiques = this.logistiques;
    }
  }

  sortLogisticss() {
    if (this.sortingCriteria) {
      const criteriaArray = this.sortingCriteria.split("-");
      const isDescending = this.sortingCriteria.startsWith("-");

      this.logistiques.sort((a, b) => {
        for (let i = 0; i < criteriaArray.length; i++) {
          const field = criteriaArray[i];

          if (field === "nombreLogits") {
            const compareResult =
              a[field] > b[field] ? 1 : a[field] < b[field] ? -1 : 0;
            if (compareResult !== 0) {
              return isDescending ? -compareResult : compareResult;
            }
          } else if (field === "typeLogi") {
            const compareResult =
              a[field].toLowerCase() > b[field].toLowerCase()
                ? 1
                : a[field].toLowerCase() < b[field].toLowerCase()
                ? -1
                : 0;
            if (compareResult !== 0) {
              return isDescending ? -compareResult : compareResult;
            }
          } else if (field === "nomLogi") {
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
        return isDescending ? b.idLogi - a.idLogi : a.idLogi - b.idLogi;
      });
    }
  }

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  public deleteLogistique(id: number) {
    console.log(id);
    this.logistiqueService.deleteLogistique(id).subscribe({
      next: () => {
        this.logistiques = this.logistiques.filter((o) => o.idLogi !== id);
        this.sortLogisticss();
        this.filterLogistics();
      },
      error: (_) => {
        this.openSnackBar("Delete failed!", "😔");
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
    this.sortLogisticss();
    this.filterLogistics();
  }

  clearSortingCriteria() {
    this.sortingCriteria = "";
    this.sortLogisticss();
    this.filterLogistics();
  }
}
