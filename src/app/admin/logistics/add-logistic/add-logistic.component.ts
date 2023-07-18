import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { Logistique } from "src/app/admin/logistics/model/logistique";
import { LogisticsService } from "src/app/core/service/logistics.service";

@Component({
  selector: "app-add-logistic",
  templateUrl: "./add-logistic.component.html",
  styleUrls: ["./add-logistic.component.sass"],
})
export class AddLogisticComponent implements OnInit {
  private sub: Subscription;
  addLogForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private logServ: LogisticsService,
    private _snackBar: MatSnackBar
  ) {
    this.addLogForm = this.fb.group({
      typeLogi: ["", [Validators.required]],
      nomLogi: ["", [Validators.required]],
      nombreLogi: [0, [Validators.required]],
    });
  }

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  onSubmit() {
    let value = this.addLogForm.value;

    this.logServ.addLogistique(value).subscribe({
      next: (res) => {
        this.openSnackBar("Add success!", "😁");
      },
      error: (err) => {
        console.log("error updating operation!");
        this.openSnackBar("Add failed!", "😔");
      },
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
