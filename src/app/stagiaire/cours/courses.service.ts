import { Injectable, EventEmitter,  } from "@angular/core";
import { Observable } from 'rxjs';

import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { Course } from "./courses.model";

@Injectable()
export class CoursesService extends UnsubscribeOnDestroyAdapter {
  isTblLoading = true;
  private readonly url = "http://localhost:8082/api/cours";
  dataChange: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>([]);

  constructor(private http: HttpClient) {
    super();
  }

  get data(): Course[] {
    return this.dataChange.value;
  }

  getCoursById(id: string): Observable<Course> {
    return this.http.get<Course>(`${this.url}/${id}`);
    
  }


  getStagiaireCourses(stagiaireId): Observable<Course[]> {
    return this.http.get<Course[]>(this.url+`/stagiaire/${stagiaireId}`)
  }

  deleteCourse(id: string): void {
    this.http.delete(this.url + `${id}`).subscribe(
      (data) => {
      },
      (err: HttpErrorResponse) => {}
    );
  }
}
