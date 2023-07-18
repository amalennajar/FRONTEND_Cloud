import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ForgetPassword } from "./forgot-password.model"
@Injectable({
    providedIn: 'root'
  })
  export class ForgotPassword {
    private url = 'http://localhost:8082/api/auth/'
    constructor(private http: HttpClient ) {}
    send(emailUser: string): Observable<ForgetPassword[]> {
        return this.http.post<ForgetPassword[]>(this.url+'sendme', { emailUser: emailUser });
      }
    }