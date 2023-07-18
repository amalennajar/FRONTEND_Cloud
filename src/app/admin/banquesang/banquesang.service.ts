import { Injectable, EventEmitter } from "@angular/core";
import { BehaviorSubject, Observable, catchError, map, throwError } from "rxjs";
import { BanqueSang } from "./banquesang.model";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { environment } from "src/environments/environment";
@Injectable()


export class Banquesangservice extends UnsubscribeOnDestroyAdapter {

  private readonly API_URL = "http://localhost:8082/api/banquesang";
  isTblLoading = false;
  dataChange: BehaviorSubject<BanqueSang[]> = new BehaviorSubject<BanqueSang[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): BanqueSang[] {
    return this.dataChange.value;
  }
  addBanqueSang(idBanque: number, BanqueSang: BanqueSang): Observable<BanqueSang> {
    const url = `${this.API_URL}BanqueSang/${idBanque}/BanqueSang`;
    return this.httpClient.post<BanqueSang>(url, BanqueSang);
  }

  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllBanqueSangs(): void {
    this.subs.sink = this.httpClient.get<BanqueSang[]>(this.API_URL).subscribe(
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
  getAllBanqueSangsStat(): Observable<BanqueSang[]> {
    return this.httpClient.get<BanqueSang[]>(this.API_URL).pipe(
      map(data => {
        const totalSangRetire = data.reduce((acc, curr) => acc + curr.sangRetire, 0);
        const banques = data.map(banque => ({
          ...banque,
          sangRetirePercentage: banque.sangRetire / totalSangRetire * 100
        }));
        return banques;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
        return throwError('Something went wrong while fetching the data.');
      })
    );
  }
  
  retirerSang(idBanqueSang: number, requestBody: { quantiteSangRetiree: number }) {
    const url = `${this.API_URL}/${idBanqueSang}/retirerSang`;
    return this.httpClient.post(url, requestBody);
  }





}