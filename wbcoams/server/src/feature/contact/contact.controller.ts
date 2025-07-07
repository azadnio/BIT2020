import { 
  Controller, 
  Post, 
  Get, 
  Put, 
  Body, 
  Param, 
  Query, 
  ValidationPipe, 
  ParseIntPipe,
  HttpStatus,
  HttpCode,
  UseGuards
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactMessageDto, ContactResponseDto, ContactQueryDto } from './dto/contact.dto';
import { ContactMessage, ContactSubmissionResponse } from '@SharedRepo/interfaces/contact.interface';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/core/auth/guards/roles.guard';
import { Roles } from 'src/core/auth/decorators/roles.decorators';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  /**
   * Submit a new contact message (public endpoint)
   * POST /api/contact/submit
   */
  @Post('submit')
  @HttpCode(HttpStatus.CREATED)
  async submitMessage(
    @Body(ValidationPipe) messageDto: ContactMessageDto
  ): Promise<ContactSubmissionResponse> {
    return this.contactService.submitContactMessage(messageDto);
  }

  /**
   * Get all contact messages (admin only)
   * GET /api/contact/messages
   */
  @Get('messages')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'manager', 'staff')
  async getAllMessages(
    @Query(ValidationPipe) queryDto: ContactQueryDto
  ): Promise<{ messages: ContactMessage[], total: number, page: number, limit: number }> {
    return this.contactService.getAllContactMessages(queryDto);
  }

  /**
   * Get a specific contact message by ID (admin only)
   * GET /api/contact/messages/:id
   */
  @Get('messages/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'manager', 'staff')
  async getMessageById(
    @Param('id', ParseIntPipe) id: number
  ): Promise<ContactMessage> {
    return this.contactService.getContactMessageById(id);
  }

  /**
   * Mark a message as read (admin only)
   * PUT /api/contact/messages/:id/read
   */
  @Put('messages/:id/read')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'manager', 'staff')
  async markAsRead(
    @Param('id', ParseIntPipe) id: number
  ): Promise<ContactMessage> {
    return this.contactService.markMessageAsRead(id);
  }

  /**
   * Add a response to a message (admin only)
   * PUT /api/contact/messages/:id/respond
   */
  @Put('messages/:id/respond')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'manager', 'staff')
  async respondToMessage(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) responseDto: ContactResponseDto
  ): Promise<ContactMessage> {
    return this.contactService.addResponseToMessage(id, responseDto);
  }

  /**
   * Get count of unread messages (admin only)
   * GET /api/contact/unread-count
   */
  @Get('unread-count')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'manager', 'staff')
  async getUnreadCount(): Promise<{ count: number }> {
    const count = await this.contactService.getUnreadMessagesCount();
    return { count };
  }

  /**
   * Get contact statistics (admin only)
   * GET /api/contact/statistics
   */
  @Get('statistics')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'manager', 'staff')
  async getStatistics(): Promise<{
    total: number;
    unread: number;
    responded: number;
    todayCount: number;
  }> {
    return this.contactService.getContactStatistics();
  }
}
