import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';
import { ContactMessage } from '../../../core/models/contact.model';
import { ContactMessageDetailDialogComponent } from './contact-message-detail-dialog/contact-message-detail-dialog.component';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

// Inline ContactAdminService to avoid import issues
@Injectable({
  providedIn: 'root'
})
class ContactAdminService {
  private baseUrl = 'http://localhost:3000/api/contact';

  constructor(private http: HttpClient) {}

  getAllMessages(params?: ContactQueryParams): Observable<ContactMessagesResponse> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        const value = params[key as keyof ContactQueryParams];
        if (value !== undefined) {
          httpParams = httpParams.set(key, value);
        }
      });
    }
    return this.http.get<ContactMessagesResponse>(`${this.baseUrl}/admin`, { params: httpParams });
  }

  getStatistics(): Observable<ContactStatistics> {
    return this.http.get<ContactStatistics>(`${this.baseUrl}/admin/statistics`);
  }

  markAsRead(id: number): Observable<ContactMessage> {
    return this.http.patch<ContactMessage>(`${this.baseUrl}/admin/${id}/read`, {});
  }

  addResponse(id: number, response: string): Observable<ContactMessage> {
    return this.http.patch<ContactMessage>(`${this.baseUrl}/admin/${id}/response`, { response });
  }
}

// Local interfaces to fix TypeScript issues
interface ContactMessagesResponse {
  messages: ContactMessage[];
  total: number;
  page: number;
  limit: number;
}

interface ContactStatistics {
  total: number;
  unread: number;
  responded: number;
  todayCount: number;
}

interface ContactQueryParams {
  page?: string;
  limit?: string;
  isRead?: string;
}

@Component({
  selector: 'app-contact-messages',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatMenuModule,
    MatDialogModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatBadgeModule
  ],
  templateUrl: './contact-messages.component.html',
  styleUrl: './contact-messages.component.scss'
})
export class ContactMessagesComponent implements OnInit {
  private contactAdminService = inject(ContactAdminService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  messages: ContactMessage[] = [];
  displayedColumns: string[] = ['status', 'name', 'email', 'subject', 'createdAt', 'actions'];
  
  // Pagination
  totalMessages = 0;
  pageSize = 20;
  pageIndex = 0;
  
  // Filtering
  statusFilter: string = 'all';
  
  // Loading states
  isLoading = false;
  isLoadingStats = false;
  
  // Statistics
  statistics = {
    total: 0,
    unread: 0,
    responded: 0,
    todayCount: 0
  };

  ngOnInit(): void {
    this.loadMessages();
    this.loadStatistics();
  }

  loadMessages(): void {
    this.isLoading = true;
    
    const params = {
      page: (this.pageIndex + 1).toString(),
      limit: this.pageSize.toString(),
      ...(this.statusFilter !== 'all' && { isRead: this.statusFilter === 'read' ? 'true' : 'false' })
    };
console.log('Loading messages with params:', params);   
    this.contactAdminService.getAllMessages(params).subscribe({
      next: (response: ContactMessagesResponse) => {console.log('Messages loaded:', response);
        this.messages = response.messages;
        this.totalMessages = response.total;
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error loading messages:', error);
        this.snackBar.open('Error loading messages', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
        this.isLoading = false;
      }
    });
  }

  loadStatistics(): void {
    this.isLoadingStats = true;
    
    this.contactAdminService.getStatistics().subscribe({
      next: (stats: ContactStatistics) => {
        this.statistics = stats;
        this.isLoadingStats = false;
      },
      error: (error: any) => {
        console.error('Error loading statistics:', error);
        this.isLoadingStats = false;
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadMessages();
  }

  onFilterChange(filter: string): void {
    this.statusFilter = filter;
    this.pageIndex = 0; // Reset to first page
    this.loadMessages();
  }

  viewMessage(message: ContactMessage): void {
    const dialogRef = this.dialog.open(ContactMessageDetailDialogComponent, {
      width: '800px',
      maxWidth: '90vw',
      data: message
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.updated) {
        this.loadMessages();
        this.loadStatistics();
      }
    });
  }

  markAsRead(message: ContactMessage, event: Event): void {
    event.stopPropagation();
    
    if (message.isRead) {
      return; // Already read
    }

    this.contactAdminService.markAsRead(message.id!).subscribe({
      next: (updatedMessage: ContactMessage) => {
        const index = this.messages.findIndex(m => m.id === message.id);
        if (index !== -1) {
          this.messages[index] = updatedMessage;
        }
        this.loadStatistics(); // Refresh stats
        this.snackBar.open('Message marked as read', 'Close', {
          duration: 2000,
          panelClass: ['success-snackbar']
        });
      },
      error: (error: any) => {
        console.error('Error marking message as read:', error);
        this.snackBar.open('Error updating message', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  getStatusChipColor(message: ContactMessage): string {
    if (message.response) return 'primary';
    if (message.isRead) return 'accent';
    return 'warn';
  }

  getStatusText(message: ContactMessage): string {
    if (message.response) return 'Responded';
    if (message.isRead) return 'Read';
    return 'Unread';
  }

  refreshData(): void {
    this.loadMessages();
    this.loadStatistics();
  }

  formatDate(date: Date | string | undefined): string {
    if (!date) return 'N/A';
    
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString() + ' ' + dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}
