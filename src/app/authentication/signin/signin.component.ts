import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/core/service/auth.service";
import { Role } from "src/app/core/models/role";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { MessagingService } from "src/app/core/service/messaging.service";

// import axios from 'axios';

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"],
})
export class SigninComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit {
    title = "push-notification";
    message;
  authForm: FormGroup;
  submitted = false;
  loading = false;
  error = "";
  hide = true;
  constructor(
    private messagingService: MessagingService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    super();
  }

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
    });
  }
  get f() {
    return this.authForm.controls;
  }
  adminSet() {
    this.authForm.get("username").setValue("pharmatest");
    this.authForm.get("password").setValue("123456789");
  }
  doctorSet() {
    this.authForm.get("email").setValue("doctor@email.com");
    this.authForm.get("password").setValue("password");
  }
  patientSet() {
    this.authForm.get("email").setValue("patient@email.com");
    this.authForm.get("password").setValue("password");
  }
  async onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.error = "";
    if (this.authForm.invalid) {
      this.error = "Email and Password not valid !";
      return;
    } else {
      // await axios.post('https://lucky-voice-0294.us-east1.kalix.app:443', {
      //   email: this.f.email.value,
      //   password: this.f.password.value
      // }).catch(error => {
      //   console.log(error);
      // })      
      this.subs.sink = this.authService
        .login(this.f.email.value, this.f.password.value)
        .subscribe(
          (res) => {
            if (res) {
              const role = this.authService.currentUserValue.role;
                this.router.navigate(["/apps/staff-profile"]); 
              this.loading = false;
              this.messagingService.requestPermission();
              this.messagingService.receiveMessage();
              this.message = this.messagingService.currentMessage;
            } else {
              this.error = "Invalid Login";
            }
          },
          (error) => {            
            this.error = error;
            this.submitted = false;
            this.loading = false;
          }
        );
    }
  }
}
