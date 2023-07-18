import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { StaffService } from "../staff.service"
import { Role } from "src/app/admin/staff/roles"
import { Userr } from "src/app/admin/staff/staff.model"

@Component({
  selector: "app-add-staff",
  templateUrl: "./add-staff.component.html",
  styleUrls: ["./add-staff.component.sass"],
})
export class AddStaffComponent {
  staffForm: FormGroup;
  hide3 = true;
  agree3 = false;
  submitted= false;
  
  selectedRole: Role;

  constructor(private fb: FormBuilder,private staffservice: StaffService) {
    this.staffForm = this.fb.group({
      nom: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
      prenom: [""],
      role: ["", [Validators.required]],
      username:["",[Validators.required]],
      password: ["", [Validators.required]],     
      email: [
        "",
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
    });
  }

  get f() {
    return this.staffForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.staffForm.invalid) {
      return;
    } else {
      this.staffservice.addStaff(
        this.f.nom.value, 
        this.f.prenom.value, 
        [this.selectedRole], 
        this.f.username.value,
        this.f.password.value,
        this.f.email.value
      ).subscribe(
        (data: Userr[]) => {
          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  onRoleSelected(role: Role) {
    this.selectedRole = role;
  }
}
