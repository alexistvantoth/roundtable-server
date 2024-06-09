import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from 'src/models/message.model';

@Injectable()
export class ChatService {
  constructor(@InjectModel('Message') private messageModel: Model<Message>) {}

  async getAllTransactions(): Promise<Message[]> {
    const result = await this.messageModel.find();
    return result.map((message) => ({
      from: message.from,
      to: message.to,
      content: message.content,
      timestamp: message.timestamp,
    }));
  }
}
