import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DayOffsService } from "../../../day-offs.service";
import { MAT_DATE_LOCALE } from "@angular/material/core";
import { formatDate } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from "@angular/forms";
import { DayOff } from "../../../day-offs.model";
import { UserDetails } from "src/app/core/models/userDetails";
import { AuthService } from "src/app/core/service/auth.service";

@Component({
  selector: "app-form-dialog",
  templateUrl: "./form-dialog.component.html",
  styleUrls: ["./form-dialog.component.sass"],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: "en-GB" }],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  dayOffForm: FormGroup;
  dayOff: DayOff;
  users: UserDetails[] = [];
  constructor(
    public authService : AuthService,
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dayOffService: DayOffsService,
    private fb: FormBuilder,
    private http: HttpClient // <-- Inject the HttpClient service here
  ) {
    this.action = data.action;
    if (this.action === "edit") {
      this.dayOff = data.dayOff;
      this.dialogTitle = "edit dayoff " + this.dayOff.id;
    } else {
      this.dialogTitle = "New DayOff";
      this.dayOff = new DayOff({});
    }
    this.http
      .get<UserDetails[]>("http://localhost:8082/User")
      .subscribe((users) => {
        this.users = users;
        console.log(this.users);
      });
    this.dayOffForm = this.createContactForm();
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
    const startDateValue = this.dayOff.startDate
      ? formatDate(this.dayOff.startDate, "yyyy-MM-dd", "en")
      : null;
    const endDateValue = this.dayOff.endDate
      ? formatDate(this.dayOff.endDate, "yyyy-MM-dd", "en")
      : null;
    console.log(this.dayOff.user);
    return this.fb.group({
      id: [this.dayOff.id],
      startDate: [startDateValue, [Validators.required]],
      endDate: [endDateValue, [Validators.required]],
      user: [this.dayOff.user.idUser, [Validators.required]],
      reason: [this.dayOff.reason],
      status: [this.dayOff.status],
    });
  }
  submit() {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  
  public confirmAdd(): void {
    const dayOffData = this.dayOffForm.value;
    const dayOff = new DayOff({
      id: dayOffData.id,
      startDate: new Date(dayOffData.startDate),
      endDate: new Date(dayOffData.endDate),
      user: new UserDetails({ idUser: dayOffData.user }),
      reason: dayOffData.reason,
      status: dayOffData.status
    })
    switch(this.action){
      case 'edit':
      this.dayOffService.updateDayOff(dayOff);
      default :
      this.dayOffService.addDayOff(dayOff);
    }
  }
}
