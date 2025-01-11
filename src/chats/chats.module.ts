import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { ChatMessage } from './entities/message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Chat, ChatMessage])],
  controllers: [ChatsController],
  providers: [ChatsService],
})
export class ChatsModule {}
