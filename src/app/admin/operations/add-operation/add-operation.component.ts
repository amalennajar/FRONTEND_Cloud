import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Logistique } from "src/app/admin/logistics/model/logistique";
import { Operation } from "src/app/admin/operations/model/operation";
import { Role } from "src/app/core/models/role";
import { LogisticsService } from "src/app/core/service/logistics.service";
import { OperationService } from "src/app/core/service/operation.service";
@Component({
  selector: "app-add-operation",
  templateUrl: "./add-operation.component.html",
  styleUrls: ["./add-operation.component.sass"],
})
export class AddOperationComponent implements OnInit {
  operation: Operation;
  addOpForm: FormGroup;
  docNames: string[] = [];
  operations: Operation[] = [];
  selectedLogistics = new FormControl("");
  defaultLogistics: Logistique[] = [];
  selectedDocNumberOfOperations = 0;

  constructor(
    private fb: FormBuilder,
    private operationService: OperationService,
    private logsService: LogisticsService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.addOpForm = this.fb.group({
      nomP: ["", [Validators.required]],
      dateOp: ["", [Validators.required]],
      typeOp: ["", [Validators.required]],
      nomChi: [""],
      idChambre: [0],
      emailP: ["", [Validators.required, Validators.email]],
      success: [false],
    });
    this.fetchLogistics();
    this.fetchDoctors();
    this.fetchOps();
  }

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  onSubmit() {
    if (
      this.selectedLogistics.value.filter((l) => l.nombreLogi == 0).length > 0
    ) {
      this.openSnackBar("Logistics are CLAWZED", "🤡");
      return;
    } else {
      const nomChir = { nomChi: this.addOpForm.value.nomChi[0] };
      const value = {
        ...this.addOpForm.value,
        ...nomChir,
      };

      const logistics: any[] = [];

      for (let i = 0; i < this.selectedLogistics.value.length; i++) {
        logistics.push(this.selectedLogistics.value[i]);
      }

      this.operationService.addOperation(value, logistics).subscribe({
        next: (v) => {
          this.openSnackBar("Operation saved!", "✅");
        },
        error: (_) => {
          this.openSnackBar("Operation not saved!", "❌");
        },
      });
    }
  }

  private fetchLogistics() {
    this.logsService.getAllLogistiques().subscribe({
      next: (v) => (this.defaultLogistics = v),
    });
  }

  private fetchDoctors() {
    this.operationService.getAllUsers().subscribe({
      next: (v) => {
        this.docNames = v
          .filter((user) => user.role[0]["name"] === Role.Doctor)
          .map((d) => d["nom"]);
          console.log(this.docNames);
      },
    });
  }

  private fetchOps() {
    this.operationService.getAllOperations().subscribe({
      next: (v) => {
        this.operations = v;
        // fill docNamesDates
        this.operations.forEach((op) => {});
      },
    });
  }

  overlappingDocs = (): boolean => {
    this.selectedDocNumberOfOperations = 0;
    const finalDate = new Date(`${this.addOpForm.value.dateOp}`)
      .toISOString()
      .split("T")[0];

    const selectedDoc = this.addOpForm.value.nomChi[0];

    const selectedDocOperations = this.operations.filter(
      (op) => op.nomChi === selectedDoc
    );

    selectedDocOperations.forEach((op) => {
      // test the date with finalDate
      console.log(op, finalDate, op.dateOp.toString() === finalDate);
      if (op.dateOp.toString() === finalDate) {
        this.selectedDocNumberOfOperations++;
      }
    });

    return this.selectedDocNumberOfOperations > 0;
  };

  filterDocsPerDateGiven() {
    if (this.addOpForm.value.nomChi[0] && this.overlappingDocs()) {
      this.openSnackBar("Invalid date or doctor!", "❌");
    }
  }
}
