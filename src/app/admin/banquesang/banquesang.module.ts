import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BanquesangRoutingModule } from './banquesang-routing.module';
import { BanqueComponent } from './afficherbanque/Banque.component';
import { SharedModule } from "src/app/shared/shared.module";
import { ComponentsModule } from "src/app/shared/components/components.module";
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
import { FormDialogComponent } from './afficherbanque/dialog/form-dialog/form-dialog.component'
import { Banquesangservice } from "../banquesang/banquesang.service"


@NgModule({
  declarations: [
    //  BanquesComponent,
    BanqueComponent,
    FormDialogComponent
  ],
  imports: [
    CommonModule,
    BanquesangRoutingModule,
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
    SharedModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
  ],
  providers: [Banquesangservice]
})
export class BanquesangModule { }
