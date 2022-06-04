import { Prop, prop } from '@typegoose/typegoose';
import { ObjectId } from 'mongoose';
import { Transform } from '@nestjs/class-transformer';

export class User {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;
  @prop({
    required: [true, 'Message is required'],
  })
  uid: string;
  @prop({
    required: [true, 'Email is required'],
  })
  email: string;
  @prop({
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
