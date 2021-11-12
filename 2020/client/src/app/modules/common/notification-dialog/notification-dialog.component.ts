import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

export enum NotificationDialogType { ntOk, ntOkCancel, ntYesNo }
export enum NotificationDialogBtn { btNo, btYes, btOk, btCancel }
export enum NotificationType { error, warn, success };


export interface NotificationDialogData {
  title: string;
  message?: string;
  html?: string;
  dialogType?: NotificationDialogType;
  initialFocusBtn?: NotificationDialogBtn;
  notificationType?: NotificationType;
  btnTxt?: {
    ok: string;
    cancel: string;
    no: string;
    yes: string;
  }
}

@Component({
  selector: 'app-notification-dialog',
  templateUrl: './notification-dialog.component.html',
  styleUrls: ['./notification-dialog.component.scss']
})
export class NotificationDialogComponent implements OnInit {

  dialogType = NotificationDialogType;
  buttons = NotificationDialogBtn;
  notificationType = NotificationType;

  constructor(
    public dialogRef: MatDialogRef<NotificationDialogComponent>,
    private sanitizer: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public data: NotificationDialogData
  ) {

    if (!this.data.dialogType)
      this.data.dialogType = NotificationDialogType.ntOk;

    if (this.data.html)
      this.data.html = <string>this.sanitizer.bypassSecurityTrustHtml(this.data.html);
  }

  ngOnInit(): void {
  }

}
