import { Injectable, EventEmitter } from "@angular/core";
import { Observable } from "rxjs";

import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { Course } from "./courses.model";
import { UserDetails } from "src/app/core/models/userDetails";

@Injectable()
export class CoursesService extends UnsubscribeOnDestroyAdapter {
  isTblLoading = true;
  private readonly url = "http://localhost:8082/api/cours/";
  dataChange: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>([]);
// Temporarily stores data from dialogs
   dialogData: any;
  constructor(private http: HttpClient) {
    super();
  }
  getDialogData() {
    return this.dialogData;
  }
  get data(): Course[] {
    return this.dataChange.value;
  }

  getDoctors(){
    return  this.http.get<UserDetails[]>("http://localhost:8082/User/role/3")
  }

  getCoursById(id: string){
    return this.http.get<Course>(this.url+ `${id}`);
  }

  removeStFromCours(cID: string, sID: string ){
    this.http.delete(`http://localhost:8082/api/cours/${cID}/stagiaire/${sID}`).subscribe(
      (data) => {
        console.log(cID);
        console.log(sID)
      },
      (err: HttpErrorResponse) => {}
    );
  }

  getAllCourses(): void {
    this.subs.sink = this.http.get<Course[]>(this.url).subscribe(
      (data) => {
        console.log(data);
        this.isTblLoading = false;
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );
  }
  updateCourse(course: Course): void {
    this.http.put(this.url + course.id, course).subscribe(
      (data) => {
      console.log (data);
      },
      (err: HttpErrorResponse) => {
        console.log(err)
        // error code here
      }
    );
  }
  addCourse(course: Course): void {
    this.dialogData = course
    this.http.post(this.url, course).subscribe(
      (data) => {
        this.dialogData = course;
      },
      (err: HttpErrorResponse) => {
        console.log(err)
        // error code here
      }
    );
  }

  deleteCourse(id: string): void {
    console.log(id);
    this.http.delete(this.url + `${id}`).subscribe(
      (data) => {
        console.log(id);
      },
      (err: HttpErrorResponse) => {
        console.log(err)
      }
    );
  }
}