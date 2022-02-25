import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
changeDetection: ChangeDetectionStrategy.OnPush,
selector: 'app-confirm-dialog',
templateUrl: './confirm-dialog.component.html',
styleUrls: ['./confirm-dialog.component.sass']
})

export class ConfirmDialogComponent {
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: {
                  cancelText: string,
                  confirmText: string,
                  message: string,
                  title: string
              }, private mdDialogRef: MatDialogRef<ConfirmDialogComponent>) { }
              
  public cancel() {
    this.close(false);
  }

  public close(value: any) {
    this.mdDialogRef.close(value);
  }
  
  public confirm() {
    this.close(true);
  }

}
