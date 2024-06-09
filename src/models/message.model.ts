import * as mongoose from 'mongoose';

export const MessageSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, required: true },
});

export interface Message {
  from: string;
  to: string;
  content: string;
  timestamp: Date;
}
