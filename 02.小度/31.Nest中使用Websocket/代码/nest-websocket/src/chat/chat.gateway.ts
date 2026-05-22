import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class ChatGateway {
  constructor(private readonly chatService: ChatService) {}

  users = [];

  @SubscribeMessage('login')
  login(@MessageBody() data: string, @ConnectedSocket() socket: Socket) {
    if (
      data === '所有人' ||
      this.users.filter((u) => u.username === data).length > 0
    ) {
      //昵称不可用
      socket.emit('login', false);
    } else {
      // 昵称可用
      this.users.push({
        username: data,
        socket,
      });
      socket.data.username = data;
      socket.emit('login', true);
      // 新用户进入了
      socket.broadcast.emit('userin', data);
    }
  }

  @SubscribeMessage('users')
  getUsers(@MessageBody() data: string, @ConnectedSocket() socket: Socket) {
    const arr = this.users.map((u) => u.username);
    socket.emit('users', arr);
  }

  @SubscribeMessage('msg')
  sendMsg(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {
    const fromUser = socket.data.username;
    if (data.to) {
      // 发送给指定的用户
      const us = this.users.filter((u) => u.username === data.to);
      const u = us[0];
      u.socket.emit('new msg', {
        from: fromUser,
        content: data.content,
        to: data.to,
      });
    } else {
      // 发送给所有人
      socket.broadcast.emit('new msg', {
        from: fromUser,
        content: data.content,
        to: data.to,
      });
    }
  }

  @SubscribeMessage('disconnect')
  disconnect(@ConnectedSocket() socket: Socket) {
    const user = socket.data.username;
    socket.broadcast.emit('userout', user);
    this.users = this.users.filter((u) => u.username !== user);
  }

  @SubscribeMessage('chatMessage')
  handleMessage(@MessageBody() msg: string, @ConnectedSocket() socket: Socket) {
    console.log('后端接收---', msg);
    // return {
    //   event: 'aaa',
    //   data: msg + '---' + new Date().toLocaleString(),
    // };

    socket.emit('aaa', msg + '+++');
  }

  @SubscribeMessage('createChat')
  create(@MessageBody() createChatDto: CreateChatDto) {
    console.log(createChatDto);
    return this.chatService.create(createChatDto);
  }

  @SubscribeMessage('findAllChat')
  findAll() {
    return this.chatService.findAll();
  }

  @SubscribeMessage('findOneChat')
  findOne(@MessageBody() id: number) {
    return this.chatService.findOne(id);
  }

  @SubscribeMessage('updateChat')
  update(@MessageBody() updateChatDto: UpdateChatDto) {
    return this.chatService.update(updateChatDto.id, updateChatDto);
  }

  @SubscribeMessage('removeChat')
  remove(@MessageBody() id: number) {
    return this.chatService.remove(id);
  }
}
