import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";
import { StaffService } from "../../staff.service";
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from "@angular/forms";
import { Staff } from "../../staff.model";
import { formatDate } from "@angular/common";
@Component({
  selector: "app-form-dialog",
  templateUrl: "./form-dialog.component.html",
  styleUrls: ["./form-dialog.component.sass"],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  staffForm: FormGroup;
  staff: Staff;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public staffService: StaffService,
    private fb: FormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === "edit") {
      this.dialogTitle = data.staff.nom;
      this.staff = data.staff;
    } else {
      this.dialogTitle = "New Staff";
      this.staff = new Staff({});
    }
    this.staffForm = this.createContactForm();
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
  createContactForm(): FormGroup {
    return this.fb.group({
     idUser: [this.staff.idUser],
      nom: [this.staff.nom],
      prenom: [this.staff.prenom],
      email: [this.staff.email],
      username:[this.staff.username],
      password: [this.staff.password],
      
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.staffService.updateStaff(this.staff.idUser,this.staffForm.getRawValue());
  }
  public block(): void {
    if(this.staff.statut==true){
      this.staffService.blockStaff(this.staff.idUser);
    }
    else{
      this.staffService.deblockStaff(this.staff.idUser);
    }
  }
}
