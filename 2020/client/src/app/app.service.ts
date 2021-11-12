import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificationDialogComponent, NotificationDialogType, NotificationType } from 'src/app/modules/common/notification-dialog/notification-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    public dialog: MatDialog
  ) { }

  showErrorMessage(message: string = 'An unexpected ERROR occurred.', title: string = 'Error!', width: string = '350px') {

    return this.dialog.open(NotificationDialogComponent, {
      width: width,
      data: {
        title: title,
        message: message,
        dialogType: NotificationDialogType.ntOk,
        notificationType: NotificationType.error
      }
    });
  }

  showSuccessMessage(message: string, title: string = 'Success!', width: string = '350px') {

    return this.dialog.open(NotificationDialogComponent, {
      width: width,
      data: {
        title: title,
        message: message,
        dialogType: NotificationDialogType.ntOk,
        notificationType: NotificationType.success
      }
    });
  }

  showWarningMessage(message: string, title: string = 'Warning!', width: string = '350px') {

    return this.dialog.open(NotificationDialogComponent, {
      width: width,
      data: {
        title: title,
        message: message,
        dialogType: NotificationDialogType.ntOk,
        notificationType: NotificationType.success
      }
    });
  }
}
