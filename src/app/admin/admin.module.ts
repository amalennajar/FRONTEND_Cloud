import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminRoutingModule } from "./admin-routing.module";
import { ComponentsModule } from "../shared/components/components.module";
import { BanqueComponent } from "./banquesang/afficherbanque/Banque.component";
// import { BanquesComponent } from './banquesang/ajouterbanque/afficherBanque.component';

@NgModule({
    declarations: [
    
  ],
    imports: [CommonModule, AdminRoutingModule, ComponentsModule]
})
export class AdminModule {}
