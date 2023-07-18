import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PendingComponent } from "./pending/pending.component"
import { Page404Component } from "./../../authentication/page404/page404.component";
import { AllDayOffsComponent } from "./all-day-offs/all-day-offs.component";


const routes: Routes = [
  {
    path: "pending",
    component: PendingComponent,
  },
  {
    path: "all-day-offs",
    component: AllDayOffsComponent

  },
  { path: "**", component: Page404Component },

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DayOffsRoutingModule {}
