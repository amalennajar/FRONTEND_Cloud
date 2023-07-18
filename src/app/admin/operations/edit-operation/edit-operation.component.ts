import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { Operation } from "src/app/admin/operations/model/operation";
import { OperationService } from "src/app/core/service/operation.service";

@Component({
  selector: "app-edit-operation",
  templateUrl: "./edit-operation.component.html",
  styleUrls: ["./edit-operation.component.sass"],
})
export class EditOperationComponent implements OnInit {
  private id: number = 0;
  private sub: Subscription;
  editOpForm: FormGroup;
  private fetched: Operation;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private opServ: OperationService,
    private _snackBar: MatSnackBar
  ) {}

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  onSubmit() {
    let value = this.editOpForm.value;

    value = { ...this.fetched, ...value };

    this.opServ.updateOperation(value).subscribe({
      next: (res) => {
        this.openSnackBar("Edit success!", "😁");
      },
      error: (err) => {
        console.log("error updating operation!");
        this.openSnackBar("Edit failed!", "😔");
      },
    });
  }

  fetchData() {
    this.opServ.getOperationById(this.id).subscribe({
      next: (l) => {
        const copyOp = l;
delete l.logistiques
        console.log(l);
        this.fetched = l;
        this.editOpForm = this.fb.group({
          nomChi: [l.nomChi, [Validators.required]],
          nomP: [l.nomP, [Validators.required]],
          dateOp: [l.dateOp, [Validators.required]],
          typeOp: [l.typeOp, [Validators.required]],
          idChambre: [l.idChambre, [Validators.required]],
          emailP: [l.emailP, [Validators.required, Validators.email]],
          success: [l.success],

        });
        l.logistiques=copyOp.logistiques;
      },
      error: (err) => {},
    });
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      this.id = +params["id"]; // (+) converts string 'id' to a number
    });
    this.fetchData();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
