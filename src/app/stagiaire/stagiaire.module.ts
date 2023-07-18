import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StagiaireRoutingModule } from './stagiaire-routing.module';
import { ComponentsModule } from "../shared/components/components.module";



@NgModule({
  declarations: [],
  imports: [
    ComponentsModule,
    CommonModule,
    StagiaireRoutingModule
  ]
})
export class StagiaireModule { }
