import { Controller, Get } from '@nestjs/common';
import { ChatService } from 'src/chat/chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  async getAllMessages() {
    return await this.chatService.getAllTransactions();
  }
}
