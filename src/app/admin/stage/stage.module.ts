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
import { MatTabsModule } from "@angular/material/tabs";
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule,
} from "@angular-material-components/datetime-picker";

import { MultiSelectModule } from "@syncfusion/ej2-angular-dropdowns";

import { SharedModule } from "src/app/shared/shared.module";
import { ComponentsModule } from "src/app/shared/components/components.module";

import { StageRoutingModule } from "./stage-routing.module";
import { CoursesComponent } from "./courses/courses.component";
import { CoursesService } from "./courses.service";
import { CourseDetailsComponent } from "./course-details/course-details.component";
import { FormDialogComponent } from "./form-dialog/form-dialog.component";
import { FormdialogcoursesComponent } from "./formdialogcourses/formdialogcourses.component";
import { DeleteDialogComponent } from "./delete/delete.component";
@NgModule({
  declarations: [
    FormdialogcoursesComponent,
    DeleteDialogComponent,
    CoursesComponent,
    CourseDetailsComponent,
    FormDialogComponent,
  ],
  imports: [
    MultiSelectModule,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule,
    NgxMatDatetimePickerModule,
    MatTabsModule,
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
    SharedModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    StageRoutingModule,
  ],
  providers: [CoursesService],
})
export class StageModule {}
