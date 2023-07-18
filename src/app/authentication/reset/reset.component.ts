import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ResetPass } from "./reset.service";

@Component({
  selector: "app-reset",
  templateUrl: "./reset.component.html",
  styleUrls: ["./reset.component.sass"],
})
export class ResetComponent implements OnInit {
  authForm: FormGroup;
  submitted = false;
  loading = false;
  hide = true;
  returnUrl: string;
  errormessage: String;
  email: string;
  resetPasswordLink: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private resetpass: ResetPass
  ) {}

  ngOnInit(): void {
    this.authForm = this.formBuilder.group({
      newPassword: [Validators.required],
      confirmPassword: [Validators.required],
    });
    this.email = this.route.snapshot.queryParams["email"];
    
    this.resetPasswordLink = `http://localhost:4200/#/authentication/reset?email=${this.email}`;
  }

  get f() {
    return this.authForm.controls;
  }

  onSubmit(): void {
    console.log(this.email)
    this.submitted = true;

    if (this.authForm.invalid) {
      return;
    } else {
      this.loading = true;

      this.resetpass
        .reset(
          this.email,
          this.f.newPassword.value,
          this.f.confirmPassword.value
        )
        .subscribe(
          (data) => {
            console.log(data);
            this.router.navigate(["/authentication/signin"]);
          },
          (error) => {
            console.log(error);
            this.loading = false;
          }
        );

      // Trigger form submission
      const form = document.forms["authForm"];
      form.submit();
    }
  }
}
