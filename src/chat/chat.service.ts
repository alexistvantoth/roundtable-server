import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from 'src/models/message.model';
import { Channel } from 'src/models/channel.model';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel('Message') private messageModel: Model<Message>,
    @InjectModel('Channel') private channelModel: Model<Channel>,
  ) {}

  async getAllTransactions(): Promise<Message[]> {
    const result = await this.messageModel.find();
    return result.map((message) => ({
      from: message.from,
      to: message.to,
      content: message.content,
      timestamp: message.timestamp,
    }));
  }

  async getChannels(): Promise<Channel[]> {
    const result = await this.channelModel.find();
    return result.map((channel) => ({
      name: channel.name,
      created: channel.created,
    }));
  }

  async createMessage(message: Message) {
    if (message) {
      const newMessage = new this.messageModel({
        from: message.from,
        to: message.to,
        content: message.content,
        timestamp: Date.now(),
      });
      await newMessage.save();
    }
  }

  async createUser(userName: string) {
    const newUser = new this.channelModel({
      name: userName,
      created: new Date(),
    });

    await newUser.save();
  }

  async deleteUserData(userName: string) {
    await this.channelModel.deleteOne({ name: userName });
    await this.messageModel.deleteMany({
      $or: [{ from: userName }, { to: userName }],
    });
  }

  async isUserNameTaken(username: string): Promise<boolean> {
    const result = await this.channelModel.findOne({ name: username });
    if (result != null) {
      return true;
    }
    return false;
  }
}
