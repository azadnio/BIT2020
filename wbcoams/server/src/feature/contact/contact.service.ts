import { Injectable, NotFoundException } from '@nestjs/common';
import { ContactRepository } from './repositories/contact.repository';
import { ContactMessage, ContactSubmissionResponse } from '@SharedRepo/interfaces/contact.interface';
import { ContactMessageDto, ContactResponseDto, ContactQueryDto } from './dto/contact.dto';

@Injectable()
export class ContactService {
  constructor(private readonly contactRepository: ContactRepository) {}

  async submitContactMessage(messageDto: ContactMessageDto): Promise<ContactSubmissionResponse> {
    try {
      const messageData: Omit<ContactMessage, 'id' | 'createdAt'> = {
        name: messageDto.name,
        email: messageDto.email,
        subject: messageDto.subject,
        message: messageDto.message,
        isRead: false
      };

      const savedMessage = await this.contactRepository.createMessage(messageData);

      return {
        success: true,
        message: 'Your message has been sent successfully. We will get back to you soon.',
        id: savedMessage.id
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to send your message. Please try again later.'
      };
    }
  }

  async getAllContactMessages(queryDto: ContactQueryDto): Promise<{ messages: ContactMessage[], total: number, page: number, limit: number }> {
    const page = parseInt(queryDto.page || '1');
    const limit = parseInt(queryDto.limit || '20');
    const isRead = queryDto.isRead ? queryDto.isRead === 'true' : undefined;

    const result = await this.contactRepository.getAllMessages(page, limit, isRead);

    return {
      ...result,
      page,
      limit
    };
  }

  async getContactMessageById(id: number): Promise<ContactMessage> {
    const message = await this.contactRepository.getMessageById(id);
    
    if (!message) {
      throw new NotFoundException(`Contact message with ID ${id} not found`);
    }

    return message;
  }

  async markMessageAsRead(id: number): Promise<ContactMessage> {
    const message = await this.contactRepository.markAsRead(id);
    
    if (!message) {
      throw new NotFoundException(`Contact message with ID ${id} not found`);
    }

    return message;
  }

  async addResponseToMessage(id: number, responseDto: ContactResponseDto): Promise<ContactMessage> {
    const message = await this.contactRepository.addResponse(id, responseDto.response);
    
    if (!message) {
      throw new NotFoundException(`Contact message with ID ${id} not found`);
    }

    return message;
  }

  async getUnreadMessagesCount(): Promise<number> {
    const result = await this.contactRepository.getAllMessages(1, 1, false);
    return result.total;
  }

  async getContactStatistics(): Promise<{
    total: number;
    unread: number;
    responded: number;
    todayCount: number;
  }> {
    // Get all messages to calculate statistics
    const allMessages = await this.contactRepository.getAllMessages(1, 1000);
    const unreadMessages = await this.contactRepository.getAllMessages(1, 1000, false);
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const respondedCount = allMessages.messages.filter(msg => msg.response).length;
    const todayCount = allMessages.messages.filter(msg => {
      const msgDate = new Date(msg.createdAt!);
      msgDate.setHours(0, 0, 0, 0);
      return msgDate.getTime() === today.getTime();
    }).length;

    return {
      total: allMessages.total,
      unread: unreadMessages.total,
      responded: respondedCount,
      todayCount
    };
  }
}
