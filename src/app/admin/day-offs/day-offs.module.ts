import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSortModule } from "@angular/material/sort";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatRadioModule } from "@angular/material/radio";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MaterialFileInputModule } from "ngx-material-file-input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";


import { SharedModule } from "src/app/shared/shared.module";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { DayOffsRoutingModule } from "./day-offs-routing.module";
import { PendingComponent } from "./pending/pending.component";
import { DayOffsService } from "./day-offs.service";
import { AllDayOffsComponent } from "./all-day-offs/all-day-offs.component";
import { DayOffDetailsDialogComponent } from "./all-day-offs/dialogs/day-off-details/day-off-details.component";
import { DeleteDialogComponent } from "./all-day-offs/dialogs/delete/delete.component";
import { FormDialogComponent } from './all-day-offs/dialogs/form-dialog/form-dialog.component';

@NgModule({
  declarations: [
    PendingComponent,
    AllDayOffsComponent,
    DayOffDetailsDialogComponent,
    DeleteDialogComponent,
    FormDialogComponent
  ],
  imports: [
    MatProgressSpinnerModule,
    MaterialFileInputModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSortModule,
    MatToolbarModule,
    MatSelectModule,
    MatDatepickerModule,
    CommonModule,
    DayOffsRoutingModule,
    SharedModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
  ],
  providers: [DayOffsService],
})
export class DayOffsModule {}
