import { Component, OnInit } from "@angular/core";
import { Course } from "../courses.model";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { CoursesService } from "../courses.service";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { AuthService } from "src/app/core/service/auth.service";

@Component({
  selector: "app-mes-cours",
  templateUrl: "./mes-cours.component.html",
  styleUrls: ["./mes-cours.component.sass"],
})
export class MesCoursComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  exampleDatabase: CoursesService | null;
  index: number;
  id: string;
  course: Course | null;
  courseData : Course[];
  constructor(
    private authService: AuthService,
    private router: Router,
    public httpClient: HttpClient,
    public coursesService: CoursesService
  ) {
    super();
  }

  ngOnInit(): void {
    const userId = this.authService.currentUserValue.id
    this.loadData(userId);
  }
  public loadData(userId: string): void {
    this.coursesService.getStagiaireCourses(1).subscribe(
      (response: Course[]) => {
        this.courseData = response;
      },
      (error: any) => {
      }
    );
  }
}
