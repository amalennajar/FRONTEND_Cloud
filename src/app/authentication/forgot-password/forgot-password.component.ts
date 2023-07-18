import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ForgotPassword } from "./forgot-password.service";


@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"],
})
export class ForgotPasswordComponent implements OnInit {
  authForm: FormGroup;
  submitted = false;
  loading = false;
  forme : String;
  returnUrl: string;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private ForgotPassword:ForgotPassword,
    
    
  ) {}
  ngOnInit() {
    this.authForm = this.formBuilder.group({
      emailUser: [
        "",
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }
  get f() {
    return this.authForm.controls;
  }
  getEmailUser(): string {
    return this.authForm.get('emailUser').value as string;
  }
  onSubmit() {
    this.submitted = true;
  
    if (this.authForm.invalid) {
      return;
    }
  
    this.loading = true;
    this.ForgotPassword.send(this.f.emailUser.value).subscribe(
      (data) => {
        console.log(data);
        this.router.navigate(["/authentication/signin"]);
      },
      (error) => {
        console.log(error);
        this.loading = false;
      }
    );
  }
  
}
