import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from "./courses/courses.component";
import { CourseDetailsComponent } from "./course-details/course-details.component";

const routes: Routes = [
  {
    path:"courses",
    component: CoursesComponent
  },  
  {
    path:"course/:id",
    component: CourseDetailsComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StageRoutingModule { }
