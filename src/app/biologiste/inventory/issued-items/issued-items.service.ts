import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { IssuedItems } from "./issued-items.model";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
@Injectable()
export class IssuedItemsService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = "http://localhost:8082/Sample";
  isTblLoading = true;
  dataChange: BehaviorSubject<IssuedItems[]> = new BehaviorSubject<
    IssuedItems[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  test:String[]=[];


  constructor(private httpClient: HttpClient) {
    super();
  }


  get data(): IssuedItems[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllIssuedItemss(): void {
    this.subs.sink = this.httpClient.get<IssuedItems[]>(`${this.API_URL}/getAllSample`).subscribe(
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
  addIssuedItems(issuedItems: IssuedItems): void {
    this.dialogData = issuedItems;
    console.log(issuedItems)
    this.httpClient.post(`${this.API_URL}/add-sample`, issuedItems).subscribe(data => {
      this.dialogData = issuedItems;
      },
      (err: HttpErrorResponse) => {
     // error code here
    });
  }
  updateIssuedItems(issuedItems: IssuedItems): void {
    console.log(issuedItems)
    this.dialogData = issuedItems;
    this.httpClient.put(`${this.API_URL}/${issuedItems.id}`, issuedItems).subscribe(data => {
      this.dialogData = IssuedItems;
    },
    (err: HttpErrorResponse) => {
      // error code here
    }
  );
  }
  updateIssuedItemToReady(issuedItems: IssuedItems): void {
    console.log(issuedItems);
    this.dialogData = issuedItems;

     this.httpClient.put(`${this.API_URL}/setSampleReady/`,issuedItems).subscribe(data => {
      this.dialogData = issuedItems;
      console.log(issuedItems);
    },
    (err: HttpErrorResponse) => {
      // error code here
    }
  );
  }
  deleteIssuedItems(id: number): void {
    console.log(id);

    console.log(`deleteMedicineList(${id}) called`);
     this.httpClient.delete(`${this.API_URL}/delete-sample/${id}`).subscribe(data => {
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );
  }
  getTestTypes(): any {
    this.httpClient.get<String[]>(`${this.API_URL}/types`).subscribe(data=>{
      this.test=data
    })
    return this.test
 
  }

  getTestTypesHames(){
    return this.httpClient.get<String[]>(`${this.API_URL}/types`);
  }
} 
