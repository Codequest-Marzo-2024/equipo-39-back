import * as Discord from 'discord.js';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import config from '../../configurations/env-config';

@Injectable()
export class DiscordApiService {
  private readonly client: Discord.Client;

  constructor(
    @Inject(config.KEY)
    private readonly configService: ConfigType<typeof config>,
  ) {
    this.client = new Discord.Client({
      intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMembers,
      ],
    });

    this.client.on('ready', () => {
      console.log(`Logged in as ${this.client.user.tag}!`);
    });

    this.loginOnDiscord();
  }

  async loginOnDiscord() {
    try {
      await this.client.login(this.configService.discord.botToken);
    } catch (error) {
      console.error('Error logging in to Discord:', error);
    }
  }

  async searchMembersInGuildByUsername(guildId: string, username: string) {
    try {
      const guild = await this.getGuildById(guildId);

      const members = await guild.members.search({
        query: username,
        limit: 2,
      });

      return {
        message: `Members found in guild ${guild.name}`,
        members: members.map((member) => ({
          id: member.id,
          username: member.user.username,
        })),
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async searchMemberById(guildId: string, memberId: string) {
    try {
      const guild = await this.getGuildById(guildId);

      const member = await guild.members.fetch({
        user: memberId,
      });

      return {
        message: `Member found in guild ${guild.name}`,
        id: member.id,
        username: member.user.username,
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getGuildById(guildId: string) {
    try {
      const guild = await this.client.guilds.fetch({
        guild: guildId,
      });

      return guild;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getUserById(id: string) {
    try {
      const member = await this.client.users.fetch(id);

      // get servers where the user is a member and bot is present
      const guilds = this.client.guilds.cache
        .filter((guild) => guild.members.cache.has(id))
        .map((guild) => guild.name);

      return {
        message: 'Member found',
        id: member.id,
        username: member.username,
        guilds: guilds,
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
