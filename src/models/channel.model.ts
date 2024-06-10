import * as mongoose from 'mongoose';

export const ChannelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  created: { type: Date, required: true },
});

export interface Channel {
  name: string;
  created: Date;
}
