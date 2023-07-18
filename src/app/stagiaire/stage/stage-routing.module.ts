import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllStagesComponent } from "./all-stages/all-stages.component";

const routes: Routes = [
  {
    path:"all",
    component: AllStagesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StageRoutingModule { }
