export interface ContactMessage {
  id?: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt?: Date;
  isRead?: boolean;
  response?: string;
  respondedAt?: Date;
}

export interface ContactSubmissionResponse {
  success: boolean;
  message: string;
  id?: number;
}
