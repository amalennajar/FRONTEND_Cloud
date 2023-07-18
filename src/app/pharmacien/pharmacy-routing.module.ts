import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Page404Component } from "src/app/authentication/page404/page404.component";
import { AddMedicineComponent } from "./pharmacy/add-medicine/add-medicine.component";
import { PharmacyComponent } from "./pharmacy/medicine-list/medicine-list.component";

const routes: Routes = [
  {
    path: "medicine-list",
    component: PharmacyComponent,
  },
  {
    path: "add-medicine",
    component: AddMedicineComponent,
  },
  { path: "**", component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PharmacyRoutingModule {}
