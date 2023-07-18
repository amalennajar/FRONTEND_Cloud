import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { CoursesService } from "../courses.service";
import { Course } from "../courses.model";
import { ActivatedRoute } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { FormdialogcoursesComponent } from "../formdialogcourses/formdialogcourses.component";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-course-details",
  templateUrl: "./course-details.component.html",
  styleUrls: ["./course-details.component.sass"],
})
export class CourseDetailsComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  public courseId: string;

  courseData: Course;
  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    public coursesService: CoursesService,
    private route: ActivatedRoute,
    private http: HttpClient

  ) {
    
    super();
  }
  displayedColumns: string[] = ["id", "nom", "email", "actions"];

  ngOnInit(): void {
    this.courseId = this.route.snapshot.params.id;
    this.loadCoursesData();
    
  }

  openInviteStudentsDialog(): void {
    const dialogRef = this.dialog.open(FormdialogcoursesComponent, {
      data: { idCourse: this.courseId },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
    });
  }

  loadCoursesData(): void {
    this.coursesService.getCoursById(this.courseId).subscribe(
      (response: Course) => {
        this.courseData = response;
        console.log(response);
      },
      (error: any) => {
        console.error("Failed to fetch API data:", error);
      }
    );
  }
  
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  deleteItem(row): void {
    console.log(row.idUser)
    
    this.coursesService.removeStFromCours(this.courseId, row.idUser)

    // console.log(this.http.delete(`http://localhost:8082/api/cours/${this.courseId}/stagiaire/${row.idUser}`));
    
  }
}
