import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { MedicineList } from "./medicine-list.model";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
@Injectable()
export class MedicineListService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = "http://localhost:8082/Medicament";
  private readonly API_URL_Phar = "http://localhost:8082/Pharmacie";
  isTblLoading = true;
  dataChange: BehaviorSubject<MedicineList[]> = new BehaviorSubject<
    MedicineList[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): MedicineList[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllMedicineLists(): void {
    this.subs.sink = this.httpClient
      .get<MedicineList[]>(`${this.API_URL}/getAllMedicament`)
      .subscribe(
        (data) => {
          this.isTblLoading = false;
          this.dataChange.next(data);
        },
        (error: HttpErrorResponse) => {
          this.isTblLoading = false;
        }
      );
  }
  getMedicineListforChart(){
    return this.httpClient.get<MedicineList[]>(`${this.API_URL}/getAllMedicament`);
  }
  addMedicineList(medicineList: MedicineList): void {
    this.dialogData = medicineList;

  this.httpClient.post(`${this.API_URL}/add-medicament`, medicineList).subscribe(data => {
      this.dialogData = medicineList;
      },
      (err: HttpErrorResponse) => {
     // error code here
    });
  }
  updateMedicineList(medicineList: MedicineList): void {
    this.dialogData = medicineList;

     this.httpClient.put(`${this.API_URL}/${medicineList.id}`, medicineList).subscribe(data => {
      this.dialogData = medicineList;
    },
    (err: HttpErrorResponse) => {
      // error code here
    }
  );
  }
  deleteMedicineList(id: number): void {
     this.httpClient.delete(`${this.API_URL}/delete-medicament/${id}`).subscribe(data => {
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );
  }
  sellMedicines(medicineList: MedicineList[]): void {
    this.httpClient.put(`${this.API_URL}/update-stock`, medicineList).subscribe(data => {
      this.dialogData = medicineList;
    },
    (err: HttpErrorResponse) => {
      // error code here
    }
  );

  }
  getSellCount(){
    return this.httpClient.get<number>(`${this.API_URL_Phar}/get-sells-count`);
  }
  getSellTotal(){
    return this.httpClient.get<number>(`${this.API_URL_Phar}/get-sells-total`);
  }
  setAddSellCount(m)
  {
    this.httpClient.post(`${this.API_URL_Phar}/add-sells-count/${m}`,null).subscribe((response) => {

    }, error => {
    });
  }
  setAddSellTotal(m) {
    this.httpClient.post(`${this.API_URL_Phar}/add-sells-total/${m}`, null)
      .subscribe((response) => {
      
      }, error => {
      });
  }
  getMedicineTypes()
  {
    return this.httpClient.get<number>(`${this.API_URL}/getcounttypes`);
  }
  

}
