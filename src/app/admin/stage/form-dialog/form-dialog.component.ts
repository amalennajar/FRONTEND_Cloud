import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";
import { CoursesService } from "../../stage/courses.service";
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from "@angular/forms";
import { Course } from "../../stage/courses.model";
import { UserDetails } from "src/app/core/models/userDetails";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-form-dialog",
  templateUrl: "./form-dialog.component.html",
  styleUrls: ["./form-dialog.component.sass"],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  courseForm: FormGroup;
  course: Course;
  doctors: UserDetails[] = [];
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public courseService: CoursesService,
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === "edit") {
      this.course = data.course;
      this.dialogTitle = this.course.course_name;
    } else {
      this.dialogTitle = "New Coursepos";
      this.course = new Course({});
    }

    this.http
      .get<UserDetails[]>("http://localhost:8082/User/role/3")
      .subscribe((doctors) => {
        this.doctors = doctors;
      });

    this.courseForm = this.createContactForm();
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
      id: [this.course.id],
      course_name: [this.course.course_name],
      description: [this.course.description],
      date: [this.course.date],
      doctor: [this.course?.doctor?.idUser, [Validators.required]],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    const courseData = this.courseForm.value;
    const newCourse = new Course({
      id: courseData.id,
      course_name: courseData.course_name,
      date: new Date(courseData.date),
      description: courseData.description,
      doctor: new UserDetails({ idUser: courseData.doctor }),
      stagiaires: this.course.stagiaires,
    });
    console.log(newCourse);
    this.courseService.addCourse(newCourse);
  }
}
