import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StageRoutingModule } from './stage-routing.module';
import { AllStagesComponent } from './all-stages/all-stages.component';


@NgModule({
  declarations: [
    AllStagesComponent
  ],
  imports: [
    CommonModule,
    StageRoutingModule
  ]
})
export class StageModule { }
