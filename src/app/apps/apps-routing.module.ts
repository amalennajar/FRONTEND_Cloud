import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ChatComponent } from "./chat/chat.component";

import { StaffProfileComponent} from "./staff-profile/staff-profile.component"
const routes: Routes = [
  {
    path: "chat",
    component: ChatComponent,
  },
  {
    path:"staff-profile",
    component: StaffProfileComponent
  }
  
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppsRoutingModule {}
