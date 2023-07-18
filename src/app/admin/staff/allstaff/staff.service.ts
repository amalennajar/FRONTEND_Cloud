import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Staff } from "./staff.model";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
@Injectable()
export class StaffService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = "http://localhost:8082/User";
  private readonly AP_URL ="http://localhost:8082/User/block"
  private readonly AAP_URL ="http://localhost:8082/User/deblock"
  isTblLoading = true;
  dataChange: BehaviorSubject<Staff[]> = new BehaviorSubject<Staff[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Staff[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllStaffs(): void {
    this.subs.sink = this.httpClient.get<Staff[]>(this.API_URL).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data);
        console.log(data);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );
  }
  addStaff(staff: Staff): void {
    this.dialogData = staff;

    /*  this.httpClient.post(this.API_URL, staff).subscribe(data => {
      this.dialogData = staff;
      },
      (err: HttpErrorResponse) => {
     // error code here
    });*/
  }
  updateStaff(idUser:number,staff: Staff): void {
    this.dialogData = staff;

    this.httpClient.put(this.API_URL + `/${idUser}`, staff).subscribe(data => {
      this.dialogData = staff;
    },
    (err: HttpErrorResponse) => {
      // error code here
    }
  );
  }
  deleteStaff(idUser: number): void {
    console.log(idUser);

      this.httpClient.delete<Staff[]>(this.API_URL+ `/${idUser}` ).subscribe(data => {
      console.log(idUser);
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );
  }
  blockStaff(idUser: number): void {
    console.log("Blocking user with ID:", idUser);
  
    this.httpClient.delete<Staff[]>(this.AP_URL+ `/${idUser}`).subscribe(
      (data: Staff[]) => {
        console.log("Successfully blocked user:", data);
        // Perform any necessary state updates or other actions here
      },
      (err: HttpErrorResponse) => {
        console.error("Error blocking user:", err);
        // Handle the error and provide appropriate feedback to the user
      }
    );
  }
  deblockStaff(idUser: number): void {
    console.log("deBlocking user with ID:", idUser);
  
    this.httpClient.delete<Staff[]>(this.AAP_URL + `/${idUser}`).subscribe(
      (data: Staff[]) => {
        console.log("Successfully deblocked user:", data);
        // Perform any necessary state updates or other actions here
      },
      (err: HttpErrorResponse) => {
        console.error("Error deblocking user:", err);
        // Handle the error and provide appropriate feedback to the user
      }
    );
  }
}
