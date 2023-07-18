import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllStagesComponent } from "./stage/all-stages/all-stages.component";

const routes: Routes = [
    {
      path: "stage",
      loadChildren: () =>
        import("./stage/stage.module").then(
          (m) => m.StageModule
        ),
    },
    {
      path: "cours",
      loadChildren: () =>
        import("./cours/cours.module").then(
          (m) => m.CoursModule
        ),
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StagiaireRoutingModule { }
