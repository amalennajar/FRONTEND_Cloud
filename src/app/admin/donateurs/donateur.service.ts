import { Injectable, EventEmitter } from "@angular/core";
import { BehaviorSubject, Observable, catchError, throwError } from "rxjs";
import { Donateur } from "./donateur.model";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { environment } from "src/environments/environment";
@Injectable()


export class DonateurService extends UnsubscribeOnDestroyAdapter {

  private readonly API_URL = "http://localhost:8082/api/donateurs/";
  isTblLoading = false;
  dataChange: BehaviorSubject<Donateur[]> = new BehaviorSubject<Donateur[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Donateur[] {
    return this.dataChange.value;
  }
  

  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllDonateurs(): void {
    this.subs.sink = this.httpClient.get<Donateur[]>(this.API_URL).subscribe(
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

  addDonateur(idBanque: number, donateur: Donateur): Observable<Donateur> {
    const url = `${this.API_URL}banques/${idBanque}/donateurs`;
    return this.httpClient.post<Donateur>(url, donateur);
  }
  updateDonateur(donateur: Donateur): void {
    this.dialogData = donateur;

  this.httpClient.put(this.API_URL + donateur.idDonateur, donateur).subscribe(data => {
      this.dialogData = donateur;
    },
    (err: HttpErrorResponse) => {
      // error code here
    }
  );
  }
  public donateurDeleted  =new EventEmitter<void>();
  deleteDonateur(id: number, callback: () => void): void {
    console.log(id);

    this.httpClient.delete(this.API_URL + id).subscribe(data => {
      console.log(id);
      callback();
      // Emit the event when the update succeeds
      this.donateurDeleted.emit();
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );
  }
 
  // Implement the other methods here
}
