import { Component, OnInit,ViewChild, ElementRef  } from "@angular/core";
import firebase from 'firebase/compat/app';

import { environment } from 'src/environments/environment'
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Database, getDatabase, ref, set, onValue  } from "firebase/database";
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { Chat } from "./chat.model";
import { AuthService } from "src/app/core/service/auth.service";
import { AngularFireMessaging } from "@angular/fire/compat/messaging";


// const config = {
//   apiKey: "AAAAYPXCbrc:APA91bEhtnEKbmHTUBbcI4XTVf_5dxOtBkrLUbkgi2_LvOHadn_uSkXKTEUUj3_PSyEksOpDlcGp20DBfgGzuGbMHpIUuzjT4d0tzo3c442VBTE_SaTNhuefJVk-zJzz0Gbe2H3kYT09",
//   databaseURL: "https://healthcloud-b2935-default-rtdb.europe-west1.firebasedatabase.app",
// };
@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"],
})
export class ChatComponent {
  @ViewChild('target') private myScrollContainer: ElementRef;
  
  title = 'firechat';
  app: FirebaseApp;
  db: Database;
  form: FormGroup;
  username ='';
  message = '';
  chats: Chat[] = [];
  
  constructor(private formBuilder: FormBuilder, private authService: AuthService ) {
    this.app = initializeApp(environment.firebaseConfig);
    this.db = getDatabase(this.app);
    this.form = this.formBuilder.group({
      'message' : [],
      'username' : `${this.authService.currentUserValue.firstName} ${this.authService.currentUserValue.lastName}` 
    });
  }


  onChatSubmit(form: any) {
    const chat = form;
    chat.timestamp = new Date().toString();
    chat.id = uuidv4();
    set(ref(this.db, `chats/${chat.id}`), chat);
    this.form = this.formBuilder.group({
      'message' : [],
      'username' : `${this.authService.currentUserValue.firstName} ${this.authService.currentUserValue.lastName}` 
    });
  }
  
  ngOnInit(): void {
    
    const chatsRef = ref(this.db, 'chats');
    onValue(chatsRef, (snapshot: any) => {
      const data = snapshot.val();
      for(let id in data) {
        if (!this.chats.map(chat => chat.id).includes(id)) {
          this.chats.push(data[id])
        }
      }
    });
  }


}
