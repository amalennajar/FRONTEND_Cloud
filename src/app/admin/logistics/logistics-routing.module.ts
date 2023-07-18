import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListLogisticsComponent } from "./list-logistics/list-logistics.component";
import { EditLogisticComponent } from "./edit-logistic/edit-logistic.component";
import { AddLogisticComponent } from "./add-logistic/add-logistic.component";
import { Page404Component } from "src/app/authentication/page404/page404.component";

const routes: Routes = [
  {
    path: "",
    component: ListLogisticsComponent,
  },
  {
    path: "edit-logistic/:id",
    component: EditLogisticComponent,
  },
  {
    path: "add-logistic",
    component: AddLogisticComponent,
  },
  { path: "**", component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogisticsRoutingModule {}
