import { Injectable } from "@angular/core";
import { AngularFireMessaging } from "@angular/fire/compat/messaging";
import { BehaviorSubject } from "rxjs";
import { AuthService } from "src/app/core/service/auth.service";
import { HttpClient } from "@angular/common/http";


@Injectable()
export class MessagingService {
  currentMessage = new BehaviorSubject(null);
  constructor(
    private angularFireMessaging: AngularFireMessaging,
    private authService: AuthService,
    public http: HttpClient
  ) {
    this.angularFireMessaging.messages.subscribe((_messaging) => {
      // _messaging.onMessage = _messaging.onMessage.bind(_messaging);
      // _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
      this.angularFireMessaging.onMessage =
        this.angularFireMessaging.onMessage.bind(this.angularFireMessaging);
    });
  }
  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        console.log(token);
        this.sendTokenToServer(token);
      },
      (err) => {
        console.error("Unable to get permission to notify.", err);
      }
    );
  }
  receiveMessage() {
    this.angularFireMessaging.messages.subscribe((payload) => {
      console.log("new message received. ", payload);
      this.currentMessage.next(payload);
    });
  }
  sendTokenToServer(token: string): void {
    const url = "http://localhost:8082/firebaseToken";
    const userId = this.authService.currentUserValue.id;
    const body = { deviceToken:token , userId:userId };
    this.http.post(url, body).subscribe(
      () => console.log("Token sent to server successfully"),
      (error) => console.error("Failed to send token to server:", error)
    );
  }
}
