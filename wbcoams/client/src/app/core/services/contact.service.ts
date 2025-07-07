import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactSubmissionRequest, ContactSubmissionResponse } from '../models/contact.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl || 'http://localhost:3000'}/api/contact`;

  /**
   * Submit a contact message
   */
  submitContactMessage(contactData: ContactSubmissionRequest): Observable<ContactSubmissionResponse> {
    return this.http.post<ContactSubmissionResponse>(`${this.baseUrl}/submit`, contactData);
  }
}
