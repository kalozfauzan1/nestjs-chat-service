import { index, Prop } from '@typegoose/typegoose';
import { ObjectId } from 'mongoose';
import { Transform } from '@nestjs/class-transformer';

export class User {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;
  @Prop({
    required: [true, 'Message is required'],
    unique: true,
    type: String,
  })
  uid: string;
  @Prop({
    required: [true, 'Email is required'],
    unique: true,
    type: String,
  })
  email: string;
  @Prop({
    required: [true, 'Name is required'],
  })
  name: string;
  @Prop()
  provider: string;
  @Prop()
  photoUrl: string;
  @Prop()
  token: string;

  constructor(chat?: Partial<User>) {
    Object.assign(this, chat);
  }
}
