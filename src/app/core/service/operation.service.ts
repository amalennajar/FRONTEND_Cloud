import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { Operation } from "../../admin/operations/model/operation";
import { Logistique } from "../../admin/logistics/model/logistique";
import { tap } from "rxjs/operators";
import httpOptions from "./HTTP_OPTIONS";
import { User } from "../models/user";

@Injectable({
  providedIn: "root",
})
export class OperationService {
  private baseUrl = "http://localhost:8082/api/operations";
  private logisticsUrl = "http://localhost:8082/api/logistiques";

  constructor(private http: HttpClient) {}

  getAllOperations(): Observable<Operation[]> {
    return this.http
      .get<Operation[]>(`${this.baseUrl}`)
      .pipe(catchError(this.handleError));
  }

  getAllUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(`${this.baseUrl}/users`)
      .pipe(catchError(this.handleError));
  }

  getOperationById(id: number): Observable<Operation> {
    return this.http
      .get<Operation>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  addOperation(
    operation: Operation,
    logisticsIds: number[]
  ): Observable<Operation> {
    const payload = { ...operation, logistiques: logisticsIds };
    return this.http
      .post<Operation>(`${this.baseUrl}/oplogi`, payload, httpOptions)
      .pipe(catchError(this.handleError));
  }

  getLogistiques(): Observable<Logistique[]> {
    return this.http.get<Logistique[]>(this.logisticsUrl);
  }

  updateOperation(operation: Operation): Observable<Operation> {
    return this.http
      .put<Operation>(`${this.baseUrl}`, operation, httpOptions)
      .pipe(catchError(this.handleError));
  }

  deleteOperation(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  findByTypeOp(type: string): Observable<Operation[]> {
    return this.http
      .get<Operation[]>(`${this.baseUrl}/operations/type/${type}`)
      .pipe(catchError(this.handleError));
  }

  searchOperationByType(type: string): Observable<Operation[]> {
    return this.http
      .get<Operation[]>(`${this.baseUrl}/operations/anytype/${type}`)
      .pipe(catchError(this.handleError));
  }

  getTypeOpStatistics(): Observable<any> {
    return this.http
      .get<any>(`${this.baseUrl}/typeOp`)
      .pipe(catchError(this.handleError));
  }

  getSuccessRatesByType(): Observable<any> {
    return this.http
      .get<any>(`${this.baseUrl}/success-rates`)
      .pipe(catchError(this.handleError));
  }

  searchLogistiques(term: string): Observable<Logistique[]> {
    if (!term.trim()) {
      // if not search term, return empty array.
      return of([]);
    }
    return this.http
      .get<Logistique[]>(`${this.logisticsUrl}/search/${term}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = "An unknown error occurred";
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
