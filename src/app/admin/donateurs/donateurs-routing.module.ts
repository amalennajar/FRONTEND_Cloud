import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DonateurComponent } from './afficherdonateur/donateur.component';
import { AjouterdonateurComponent } from './ajouterdonateur/ajouterdonateur.component';
import { Page404Component } from 'src/app/authentication/page404/page404.component';



const routes: Routes = [{
  path:"donateur",
  component:DonateurComponent
},
{
  path: "ajouterdonateur",
  component:AjouterdonateurComponent,
},
{ path: "**", component: Page404Component },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule]
})
export class DonateursRoutingModule { }
