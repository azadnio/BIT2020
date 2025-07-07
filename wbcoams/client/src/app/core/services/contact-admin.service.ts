import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactMessage } from '../models/contact.model';
import { environment } from '../../../environments/environment';

export interface ContactMessagesResponse {
  messages: ContactMessage[];
  total: number;
  page: number;
  limit: number;
}

export interface ContactStatistics {
  total: number;
  unread: number;
  responded: number;
  todayCount: number;
}

export interface ContactQueryParams {
  page?: string;
  limit?: string;
  isRead?: string;
}

export interface ContactResponseDto {
  response: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactAdminService {
  private http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl || 'http://localhost:3000'}/api/contact`;

  /**
   * Get all contact messages with pagination and filtering
   */
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

    return this.http.get<ContactMessagesResponse>(`${this.baseUrl}/messages`, { params: httpParams });
  }

  /**
   * Get a specific contact message by ID
   */
  getMessageById(id: number): Observable<ContactMessage> {
    return this.http.get<ContactMessage>(`${this.baseUrl}/messages/${id}`);
  }

  /**
   * Mark a message as read
   */
  markAsRead(id: number): Observable<ContactMessage> {
    return this.http.put<ContactMessage>(`${this.baseUrl}/messages/${id}/read`, {});
  }

  /**
   * Add a response to a message
   */
  addResponse(id: number, response: string): Observable<ContactMessage> {
    const responseDto: ContactResponseDto = { response };
    return this.http.put<ContactMessage>(`${this.baseUrl}/messages/${id}/respond`, responseDto);
  }

  /**
   * Get count of unread messages
   */
  getUnreadCount(): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(`${this.baseUrl}/unread-count`);
  }

  /**
   * Get contact statistics
   */
  getStatistics(): Observable<ContactStatistics> {
    return this.http.get<ContactStatistics>(`${this.baseUrl}/statistics`);
  }
}
