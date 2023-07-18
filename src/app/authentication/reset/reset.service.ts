import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reset } from "./reset.model"
@Injectable({
    providedIn: 'root'
  })
  export class ResetPass {
    private url = 'http://localhost:8082/api/auth/'
    constructor(private http: HttpClient ) {}
    reset(emailUser: string,newPassword:String,confirmPassword:String): Observable<Reset[]> {
        return this.http.post<Reset[]>(this.url+'updatepassword', { emailUser: emailUser,newPassword:newPassword,confirmPassword:confirmPassword });
      }
    
    }