import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";
import { Banquesangservice } from "../../../banquesang.service";
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from "@angular/forms";
import { BanqueSang } from "../../../banquesang.model";
import { formatDate } from "@angular/common";
@Component({
  selector: "app-form-dialog",
  templateUrl: "./form-dialog.component.html",
  styleUrls: ["./form-dialog.component.sass"],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  BanqueSanglistform: FormGroup;
  BanqueSang: BanqueSang;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public Banquesangservice: Banquesangservice,
    private fb: FormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === "edit") {
      console.log(data)
      this.dialogTitle = "modifier Donateur";
      this.BanqueSang = data.BanqueSang;
    } else {
      this.dialogTitle = "New BanqueSang";
      this.BanqueSang = new BanqueSang();
    }

    this.BanqueSanglistform = this.createContactForm();
  }
  formControl = new FormControl("", [
    Validators.required,
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl.hasError("required")
      ? "Required field"
      : this.formControl.hasError("email")
        ? "Not a valid email"
        : "";
  }
  //updateeeeeeeeeeeeeeeeeeee 
  createContactForm(): FormGroup {
    return this.fb.group({
      idBanqueSang: [this.BanqueSang.idBanqueSang],
      //tejrab
      quantiteTotale: [this.BanqueSang.quantiteTotale],
      typeSanguin: [this.BanqueSang.typeSanguin],
      sangRetire: [this.BanqueSang.sangRetire],
      
    }
    )
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
   }

   public confirmAdd(): void {
    //  this.Banquesangservice.addBanqueSang
       this.BanqueSanglistform.getRawValue()
     
  // }
}

}


