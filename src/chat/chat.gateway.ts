import { InjectModel } from '@nestjs/mongoose';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'http';
import { Model } from 'mongoose';
import { Message } from 'src/models/message.model';

@WebSocketGateway({ cors: { origin: ['http://localhost:4200'] } })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(@InjectModel('Message') private messageModel: Model<Message>) {}

  @SubscribeMessage('sendMessage')
  async handleMessage(client: any, message: Message): Promise<void> {
    this.server.emit('newMessage', message);

    const newMessage = new this.messageModel({
      from: message.from,
      to: message.to,
      content: message.content,
      timestamp: Date.now(),
    });

    await newMessage.save();
  }

  @SubscribeMessage('privateMessage')
  handlePrivateMessage(client: any, message: Message): void {
    client.broadcast.to(message.to).emit('privateMessage', message);
  }
}
