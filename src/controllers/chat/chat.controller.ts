import { Controller, Get, Param } from '@nestjs/common';
import { ChatService } from 'src/chat/chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  async getAllMessages() {
    return await this.chatService.getAllTransactions();
  }

  @Get('/channels')
  async getChannels() {
    return await this.chatService.getChannels();
  }

  @Get(':username')
  isUserNameTaken(@Param('username') username: string) {
    const userNameTaken = this.chatService.isUserNameTaken(username);
    return userNameTaken;
  }
}
