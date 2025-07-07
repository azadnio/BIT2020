import { Component, inject, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { ContactMessage } from '../../../../core/models/contact.model';
import { ContactAdminService } from '../../../../core/services/contact-admin.service';

@Component({
  selector: 'app-contact-message-detail-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatDividerModule
  ],
  templateUrl: './contact-message-detail-dialog.component.html',
  styleUrl: './contact-message-detail-dialog.component.scss'
})
export class ContactMessageDetailDialogComponent {
  private fb = inject(FormBuilder);
  private contactAdminService = inject(ContactAdminService);
  private snackBar = inject(MatSnackBar);
  
  message: ContactMessage;
  isSubmittingResponse = false;
  isMarkingAsRead = false;
  hasUpdated = false;

  responseForm: FormGroup = this.fb.group({
    response: ['', [Validators.required, Validators.minLength(10)]]
  });

  constructor(
    public dialogRef: MatDialogRef<ContactMessageDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ContactMessage
  ) {
    this.message = { ...data };
    
    // Pre-fill response if it exists
    if (this.message.response) {
      this.responseForm.patchValue({
        response: this.message.response
      });
      this.responseForm.get('response')?.disable();
    }
  }

  onClose(): void {
    this.dialogRef.close({ updated: this.hasUpdated });
  }

  markAsRead(): void {
    if (this.message.isRead) {
      return; // Already read
    }

    this.isMarkingAsRead = true;

    this.contactAdminService.markAsRead(this.message.id!).subscribe({
      next: (updatedMessage) => {
        this.message = updatedMessage;
        this.hasUpdated = true;
        this.isMarkingAsRead = false;
        
        this.snackBar.open('Message marked as read', 'Close', {
          duration: 2000,
          panelClass: ['success-snackbar']
        });
      },
      error: (error) => {
        console.error('Error marking message as read:', error);
        this.isMarkingAsRead = false;
        
        this.snackBar.open('Error updating message status', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  submitResponse(): void {
    if (this.responseForm.valid && !this.message.response) {
      this.isSubmittingResponse = true;
      
      const responseText = this.responseForm.value.response;

      this.contactAdminService.addResponse(this.message.id!, responseText).subscribe({
        next: (updatedMessage) => {
          this.message = updatedMessage;
          this.hasUpdated = true;
          this.isSubmittingResponse = false;
          
          // Disable the form since response has been added
          this.responseForm.get('response')?.disable();
          
          this.snackBar.open('Response added successfully', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
        },
        error: (error) => {
          console.error('Error adding response:', error);
          this.isSubmittingResponse = false;
          
          this.snackBar.open('Error adding response', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      });
    }
  }

  getStatusChipColor(): string {
    if (this.message.response) return 'primary';
    if (this.message.isRead) return 'accent';
    return 'warn';
  }

  getStatusText(): string {
    if (this.message.response) return 'Responded';
    if (this.message.isRead) return 'Read';
    return 'Unread';
  }

  formatDate(date: Date | string | undefined): string {
    if (!date) return 'N/A';
    
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString() + ' at ' + dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  copyEmail(): void {
    navigator.clipboard.writeText(this.message.email).then(() => {
      this.snackBar.open('Email copied to clipboard', 'Close', {
        duration: 2000,
        panelClass: ['success-snackbar']
      });
    }).catch(() => {
      this.snackBar.open('Failed to copy email', 'Close', {
        duration: 2000,
        panelClass: ['error-snackbar']
      });
    });
  }
}
