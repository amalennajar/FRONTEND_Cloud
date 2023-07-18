import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DonateurService } from '../donateur.service';
import { BanqueSang } from '../../banquesang/banquesang.model';

@Component({
  selector: 'app-ajouterdonateur',
  templateUrl: './ajouterdonateur.component.html',
  styleUrls: ['./ajouterdonateur.component.sass']
  
})
export class AjouterdonateurComponent  {
  donateurlistform: FormGroup;
  id:number
   banqueSangs: BanqueSang[];
  isTblLoading: boolean;

  
  

  constructor(private fb: FormBuilder ,private donateurService: DonateurService) {

    this.donateurlistform = this.fb.group({
      //m_no: [""],
      nomDonateur : ['', [Validators.required, Validators.pattern('[^0-9]*')]],
      prenomDonateur: ['', [Validators.required, Validators.pattern('[^0-9]*')]],
      adresse: ["", [Validators.required]],
      numeroTelephone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      typeS: ["", [Validators.required]],
      quantiteTotale:  ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      dernierDon: ["", [Validators.required]],
    
    });

  }
  

  onSubmit() {
    //console.log("Form Veeeeeeeeeeeeeeeeeeeeealue", this.donateurlistform.value);
    console.log("Form Value", this.donateurlistform.value);
    this.add();
  }
  
  add() {
    // id:number
    if (this.donateurlistform.valid) {
      const formData = this.donateurlistform.value;
      if (this.donateurlistform.value.typeS==("A_NEGATIF"))
      {this.id=1}
      else if (this.donateurlistform.value.typeS==("A_POSITIF"))
      {this.id=2}
      else if (this.donateurlistform.value.typeS==("B_POSITIF"))
      {this.id=3} 
      else if (this.donateurlistform.value.typeS==("B_NEGATIF"))
      {this.id=4} 
      //terminate 
      this.donateurService.addDonateur(this.id,formData).subscribe(
        response => {
          console.log("Donateur added successfully", response);
          // Reset the form after adding the donateur
          this.donateurlistform.reset();
        },
        error => {
          console.log("Error adding donateur", error);
        }
      );
    } else {
      console.log("Invalid form data");
    }
  }
  
}
//




