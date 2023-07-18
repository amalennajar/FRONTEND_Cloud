import { Component, Inject, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DayOff } from '../../../day-offs.model';
import {DayOffsService  } from "../../../day-offs.service";



@Component({
  selector: 'app-day-off-details-dialog',
  templateUrl: './day-off-details.component.html',
  styleUrls: ['./day-off-details.component.sass']
})
export class DayOffDetailsDialogComponent {

  dialogTitle: string;
  dayOff: DayOff
  statusUpdated = new EventEmitter<string>();


  constructor(
    public dialogRef: MatDialogRef<DayOffDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dayOffsService: DayOffsService
    

    ) {
      this.dialogTitle= "Day Off Details"
      this.dayOff = data.dayOff;
    }
     
  onNoClick(): void {
    this.dialogRef.close();
  }

  
  onAcceptClick(id: string) {
    this.dayOffsService.updateDayOffStatus(id, "approved", () => {
      this.statusUpdated.emit("approved");
      // close the dialog
      this.dialogRef.close();
     });
   }
 
   onRejectClick(id: string) {
     this.dayOffsService.updateDayOffStatus(id, "rejected", () => {
      this.statusUpdated.emit("rejected");
      // close the dialog
      this.dialogRef.close();

     });
   }

}
