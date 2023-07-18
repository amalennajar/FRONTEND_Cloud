import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";
import { IssuedItemsService } from "../../issued-items.service";
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from "@angular/forms";
import { IssuedItems } from "../../issued-items.model";
import { formatDate } from "@angular/common";
@Component({
  selector: "app-form-dialog",
  templateUrl: "./form-dialog.component.html",
  styleUrls: ["./form-dialog.component.sass"],
})

export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  issuedItemsForm: FormGroup;
  issuedItems: IssuedItems;
  testType:any
  tesstypes:any;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public issuedItemsService: IssuedItemsService,
    private fb: FormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === "edit") {
      this.dialogTitle = data.issuedItems.i_name;
      this.issuedItems = data.issuedItems;
    } else {
      this.dialogTitle = "New Item Issue";
      this.issuedItems = new IssuedItems({});
    }
    this.issuedItemsForm = this.createContactForm();
  }
  formControl = new FormControl("", [
    Validators.required,
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl.hasError("required")
      ? "Required field"
      : this.formControl.hasError("email")
      ? "Not a valid email"
      : "";
  }
  createContactForm(): FormGroup {  
    this.issuedItemsService.getTestTypesHames().subscribe(data=>{
      this.tesstypes=data;
      console.log('types',this.tesstypes)
    })

    
    return this.fb.group({
      id: [this.issuedItems.id],
      description: [this.issuedItems.description],
      testDate: [
        formatDate(this.issuedItems.testDate, "yyyy-MM-dd", "en"),
        [Validators.required],
      ],
      testType: [this.issuedItemsService.getTestTypes],
      resultat: [this.issuedItems.resultat],
      status: [this.issuedItems.status],
      email:[this.issuedItems.email]
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.issuedItemsService.addIssuedItems(this.issuedItemsForm.getRawValue());
  }
}
