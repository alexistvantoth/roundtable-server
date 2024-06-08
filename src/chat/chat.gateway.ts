import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'http';
import { Message } from 'src/models/message';

@WebSocketGateway({ cors: { origin: ['http://localhost:4200'] } })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('sendMessage')
  handleMessage(client: any, message: Message): void {
    this.server.emit('newMessage', message);
  }

  @SubscribeMessage('privateMessage')
  handlePrivateMessage(client: any, message: Message): void {
    client.broadcast.to(message.recipient).emit('privateMessage', message);
  }
}
