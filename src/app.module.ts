import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGateway } from './chat/chat.gateway';
import { ChatService } from './chat/chat.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageSchema } from './models/message.model';
import { ConfigModule } from '@nestjs/config';
import { ChatController } from './controllers/chat/chat.controller';
import { ChannelSchema } from './models/channel.model';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/?${process.env.DB_CFG}`,
    ),
    MongooseModule.forFeature([
      { name: 'Message', schema: MessageSchema },
      { name: 'Channel', schema: ChannelSchema },
    ]),
  ],
  controllers: [AppController, ChatController],
  providers: [AppService, ChatGateway, ChatService],
})
export class AppModule {}
