import { Controller, Get, Param, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { LogService } from './log.service';
import { LogPaginationDto } from './dto/lg-pagination.dto';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/core/auth/guards/roles.guard';
import { Roles } from 'src/core/auth/decorators/roles.decorators';
import { UserRole } from '@SharedRepo/enums/user-roles.enum';

@Controller('log')
@UseGuards(JwtAuthGuard, RolesGuard)
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Get()
  public async getLogs(@Query() query: LogPaginationDto): Promise<any> {
    return await this.logService.select(query);
  }

  @Get('user/:id')
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  public async getUserLogs(@Param('id', ParseIntPipe) userId: number, @Query() query: LogPaginationDto): Promise<any> {
    return await this.logService.selectUserLogs(userId, query);
  }
}
