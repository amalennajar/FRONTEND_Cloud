import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BanqueComponent } from './afficherbanque/Banque.component';
import { Page404Component } from 'src/app/authentication/page404/page404.component';


const routes: Routes = [{
  path:"afficherbanque",
  component:BanqueComponent
  
},

{ path: "**", component: Page404Component },
  
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class BanquesangRoutingModule { }