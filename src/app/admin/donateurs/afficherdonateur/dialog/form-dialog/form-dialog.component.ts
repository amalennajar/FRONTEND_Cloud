import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";
import { DonateurService } from "../../../donateur.service";
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from "@angular/forms";
import { Donateur } from "../../../donateur.model";
import { formatDate } from "@angular/common";
@Component({
  selector: "app-form-dialog",
  templateUrl: "./form-dialog.component.html",
  styleUrls: ["./form-dialog.component.sass"],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  donateurlistform: FormGroup;
  donateur: Donateur;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public DonateurService: DonateurService,
    private fb: FormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === "edit") {
      console.log(data)
      this.dialogTitle = "modifier Donateur";
      this.donateur = data.donateur;
    } else {
      this.dialogTitle = "New DONATEUR";
      this.donateur = new Donateur({});
    }

    this.donateurlistform = this.createContactForm();
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
      idDonateur: [this.donateur.idDonateur],
      //tejrab
      nomDonateur: [this.donateur.nomDonateur],
      prenomDonateur: [this.donateur.prenomDonateur],
      typeS: [this.donateur.typeS],
      adresse: [this.donateur.adresse],
      quantiteTotale: [this.donateur.quantiteTotale],
      numeroTelephone:[this.donateur.numeroTelephone],
      dernierDon: [
        formatDate(this.donateur.dernierDon, "yyyy-MM-dd", "en"),
        [Validators.required],
      ],
      // //   // // price: [this.medicineList.price],
      // //   // // e_date: [
      // //   //   formatDate(this.medicineList.e_date, "yyyy-MM-dd", "en"),
      // //   //   [Validators.required],
      // //   // ],
      // //   stock: [this.medicineList.stock],
      // // });
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
   
      this.DonateurService.updateDonateur(
   this.donateurlistform.getRawValue()
     )
 }
  // public confirmAdd(): void {
  //   this.DonateurService.addDonateur
  //     this.donateurlistform.getRawValue()
     
  // }
}




