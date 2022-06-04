import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    TypegooseModule.forRoot(
      'mongodb+srv://kalozfauzan:kalozfauzan2@chat.e0eq6tx.mongodb.net/?retryWrites=true&w=majority',
    ),
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
