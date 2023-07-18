import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-add-medicine",
  templateUrl: "./add-medicine.component.html",
  styleUrls: ["./add-medicine.component.sass"],
})
export class AddMedicineComponent {
  medicineListForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.medicineListForm = this.fb.group({
      nom: ["", [Validators.required]],
      description: ["", [Validators.required]],
      prix: ["", [Validators.required]],
      stock: ["", [Validators.required]],
    });
  }
  onSubmit() {
  }
}
