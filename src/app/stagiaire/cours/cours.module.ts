import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursRoutingModule } from './cours-routing.module';
import { MesCoursComponent } from './mes-cours/mes-cours.component';
import { ComponentsModule } from "../../shared/components/components.module";
import { CoursesService } from "./courses.service";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";




@NgModule({
  declarations: [
    MesCoursComponent
  ],
  imports: [
    ComponentsModule,
    CommonModule,
    CoursRoutingModule,
    MatButtonModule,

  ],
  providers:[CoursesService]
})
export class CoursModule { }
