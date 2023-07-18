import { Component, OnInit, ViewEncapsulation, Inject } from "@angular/core";
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { HttpClient } from "@angular/common/http";
import { UserDetails } from "src/app/core/models/userDetails";
import { CoursesService } from "../../stage/courses.service";
import { forkJoin } from "rxjs";

@Component({
  selector: "app-formdialogcourses",
  templateUrl: "./formdialogcourses.component.html",
  styleUrls: ["./formdialogcourses.component.sass"],
  encapsulation: ViewEncapsulation.None,
})
export class FormdialogcoursesComponent implements OnInit {
  stagiares: UserDetails[] = [];
  stForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<FormdialogcoursesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public courseService: CoursesService,
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.http
      .get<UserDetails[]>("http://localhost:8082/User/role/5")
      .subscribe((st) => {
        this.stagiares = st;
      });
  }

  ngOnInit(): void {
    // Subscribe to value changes of the stagiare form control
    this.stagiare.valueChanges.subscribe(selectedValues => {
      console.log(selectedValues); // This will log the selected values array whenever it changes
    });
  }


  onSave(): void {
    const selectedValues = this.stagiare.value;
    const requests = selectedValues.map(value => {
      console.log()
      console.log(value)
      console.log(this.data.idCourse)
      return this.http.post(`http://localhost:8082/api/cours/${this.data.idCourse}/stagiaire/${value}`,{});
    });

    forkJoin(requests).subscribe(responses => {
      console.log(responses);
    });
  }

  stagiare = new FormControl("");
}
