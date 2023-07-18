import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Logistique } from "../../admin/logistics/model/logistique";
import { Observable } from "rxjs";
import httpOptions from "./HTTP_OPTIONS";

@Injectable({
  providedIn: "root",
})
export class LogisticsService {
  constructor(private http: HttpClient) {}

  private apiUrl = "http://localhost:8082/api/logistiques";

  getAllLogistiques(): Observable<Logistique[]> {
    return this.http.get<Logistique[]>(`${this.apiUrl}`);
  }

  getLogistiqueById(id: number): Observable<Logistique> {
    return this.http.get<Logistique>(`${this.apiUrl}/${id}`);
  }

  addLogistique(logistique: Logistique): Observable<Logistique> {
    return this.http.post<Logistique>(
      `${this.apiUrl}`,
      logistique,
      httpOptions
    );
  }

  updateLogistique(logistique: Logistique): Observable<Logistique> {
    return this.http.put<Logistique>(`${this.apiUrl}`, logistique, httpOptions);
  }

  deleteLogistique(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  searchLogistiqueByType(typeLogi: string): Observable<Logistique[]> {
    return this.http.get<Logistique[]>(`${this.apiUrl}/type/${typeLogi}`);
  }

  getLogistiquesByOperation(idOp: number): Observable<Logistique[]> {
    return this.http.get<Logistique[]>(`${this.apiUrl}/operation/${idOp}`);
  }
}
