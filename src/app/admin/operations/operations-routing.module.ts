import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EditOperationComponent } from "./edit-operation/edit-operation.component";
import { AddOperationComponent } from "./add-operation/add-operation.component";
import { ListOperationsComponent } from "./list-operations/list-operations.component";
import { Page404Component } from "src/app/authentication/page404/page404.component";

const routes: Routes = [
  {
    path: "",
    component: ListOperationsComponent,
  },
  {
    path: "edit-operation/:id",
    component: EditOperationComponent,
  },
  {
    path: "add-operation",
    component: AddOperationComponent,
  },
  { path: "**", component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OperationsRoutingModule {}
