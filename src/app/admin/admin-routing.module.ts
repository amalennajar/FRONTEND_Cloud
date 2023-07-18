import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "dashboard",
    loadChildren: () =>
      import("./dashboard/dashboard.module").then((m) => m.DashboardModule),
  },
  {
    path: "stage",
    loadChildren: () =>
      import("./stage/stage.module").then((m) => m.StageModule),
  },
  {
    path: "day-off",
    loadChildren: () =>
      import("./day-offs/day-offs.module").then((m) => m.DayOffsModule),
  },
  {
    path: "donateurs",
    loadChildren: () =>
      import("./donateurs/donateurs.module").then((m) => m.DonateursModule),
  },
  {
    path: "BanqueSang",
    loadChildren: () =>
      import("./banquesang/banquesang.module").then((m) => m.BanquesangModule),
  },
  


  {
    path: "operations",
    loadChildren: () =>
      import("./operations/operations.module").then((m) => m.OperationsModule),
  },
  {
    path: "logistics",
    loadChildren: () =>
      import("./logistics/logistics.module").then((m) => m.LogisticsModule),
  },
  {
    path: "staff",
    loadChildren: () =>
      import("./staff/staff.module").then((m) => m.StaffModule),
  },
  {
    path: "patients",
    loadChildren: () =>
      import("./patients/patients.module").then((m) => m.PatientsModule),
  },
  {
    path: "inventory",
    loadChildren: () =>
      import("./inventory/inventory.module").then((m) => m.InventoryModule),
  },
  {
    path: "pharmacy",
    loadChildren: () =>
      import("./pharmacy/pharmacy.module").then((m) => m.PharmacyModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
