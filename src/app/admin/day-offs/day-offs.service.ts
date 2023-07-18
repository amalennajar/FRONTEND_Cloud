import { Injectable, EventEmitter } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { DayOff } from "./day-offs.model";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";

@Injectable()
export class DayOffsService extends UnsubscribeOnDestroyAdapter {
  isTblLoading = true;
  dialogData: any;
  private readonly url = "http://localhost:8082/api/day-offs/";
  dataChange: BehaviorSubject<DayOff[]> = new BehaviorSubject<DayOff[]>([]);

  constructor(private http: HttpClient) {
    super();
  }
  get data(): DayOff[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  getAllDayOffs(): void {
    this.subs.sink = this.http.get<DayOff[]>(this.url).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );
  }
  getPendingDayOffs(): void {
    this.subs.sink = this.http.get<DayOff[]>(this.url + "pending").subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );
  }

  public dayOffStatusUpdated = new EventEmitter<void>();
  updateDayOffStatus(
    id: string,
    newStatus: string,
    callback: () => void
  ): void {
    const url = this.url + `${id}/status`;
    const params = new HttpParams().set("newStatus", newStatus);
    this.http.put(url, null, { params }).subscribe(
      (response) => {
        this.isTblLoading = false;
        console.log(response);
        // Do something after the update succeeds, if needed
        callback();
        // Emit the event when the update succeeds
        this.dayOffStatusUpdated.emit();
        // Do something after the update succeeds, if needed
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
        // Handle the error as needed
      }
    );
  }

  addDayOff(dayOff: DayOff): void {
    this.dialogData = dayOff;

    this.http.post(this.url, dayOff).subscribe(
      (data) => {
        this.dialogData = dayOff;
      },
      (err: HttpErrorResponse) => {
        // error code here
      }
    );
  }

  updateDayOff(dayOff: DayOff): void {
    this.dialogData = dayOff;

    this.http.put(this.url + dayOff.id, dayOff).subscribe(
      (data) => {
        this.dialogData = dayOff;
      },
      (err: HttpErrorResponse) => {
        // error code here
      }
    );
  }

  deleteDayOff(id: string): void {
    console.log(id);
    this.http.delete(this.url + `${id}`).subscribe(
      (data) => {
        console.log(id);
      },
      (err: HttpErrorResponse) => {}
    );
  }
}
