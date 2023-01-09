import { Component } from '@angular/core';
import {io} from 'socket.io-client'
import { ChatService } from '../services/chat.service';
import { FirebaseService } from '../services/firebase.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  newMessage!: string;
  messageList: string[] = [];

  constructor(private chatService: ChatService,public firebaseService:FirebaseService){}

  ngOnInit(){
    this.chatService.getNewMessage().subscribe((message: string) => {
      this.messageList.push(message);
    })
  }

  sendMessage() {
    this.chatService.sendMessage(this.newMessage);
    if(this.newMessage=='')
    {
      alert("Message cant be empty")
    }
    this.newMessage = '';
  }
  cool()
  {
    alert("asdadas");
  }
}
