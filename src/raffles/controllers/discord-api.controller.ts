import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { DiscordApiService } from '../services';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';

@ApiTags('Discord Api')
@ApiBearerAuth('JWT')
@Auth(ValidRoles.ADMIN)
@Controller('discord-api')
export class DiscordApiController {
  constructor(private readonly discordApiService: DiscordApiService) {}

  @Get('guild/:guildId/search-members/:username')
  async searchMembers(
    @Param('guildId') guildId: string,
    @Param('username') username: string,
  ) {
    return await this.discordApiService.searchMembersInGuildByUsername(
      guildId,
      username,
    );
  }

  @Get('guild/:guildId/search-member/:memberId')
  async searchMemberById(
    @Param('guildId') guildId: string,
    @Param('memberId') memberId: string,
  ) {
    return await this.discordApiService.searchMemberById(guildId, memberId);
  }

  @Get('user-by-id/:id')
  async getUserById(@Param('id') id: string) {
    return await this.discordApiService.getUserById(id);
  }
}
