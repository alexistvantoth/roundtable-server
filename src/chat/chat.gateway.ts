import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Message } from 'src/models/message.model';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({ cors: { origin: ['http://localhost:4200'] } })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('login')
  async handleLogin(client: Socket, userName: string): Promise<void> {
    this.chatService.createUser(userName);

    this.server.emit('userJoined', userName);
  }

  @SubscribeMessage('logout')
  async handleLogout(client: Socket, userName: string): Promise<void> {
    this.chatService.deleteUserData(userName);
    this.server.emit('userDisconnected', userName);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(client: Socket, message: Message): Promise<void> {
    this.server.emit('newMessage', message);

    this.chatService.createMessage(message);
  }

  // @SubscribeMessage('private message')
  // handlePrivateMessage(client: any, data: any) {
  //   client.to(data.to).emit('private message', {
  //     from: client.id,
  //     message: data.message,
  //   });
  // }
}
