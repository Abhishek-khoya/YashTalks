import { Component } from '@angular/core';
import {io} from 'socket.io-client'
//import { ChatService } from '../services/chat.service';
import { FirebaseService } from '../services/firebase.service';

import { environment } from '../../environments/environment'
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Database, getDatabase, ref, set, onValue  } from "firebase/database";
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { Chat } from '../models/chat'
import { Auth, authState, User } from '@angular/fire/auth';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent 
{
  currentUser$ = authState(this.auth);
  title = 'firechat';
  app!: FirebaseApp;
  db!: Database;
  form!: FormGroup;
  username = '';
  message = '';
  chats: Chat[] = [];
  constructor(public firebaseService:FirebaseService,private formBuilder:FormBuilder,private auth:Auth){
    this.app = initializeApp(environment.firebase);
    this.db = getDatabase(this.app);
    this.form = this.formBuilder.group({
      'message' : [],
      'username' : []
    });
  }


// {{user?.displayName}}

  onChatSubmit(form: any) {
    const chat = form;
    chat.timestamp = new Date().toString();
    chat.id = uuidv4();
    set(ref(this.db, `chats/${chat.id}`), chat);
    this.form = this.formBuilder.group({
      'message' : [],
      'username' : [chat.username],
    });
  }

  ngOnInit(){
    // this.chatService.getNewMessage().subscribe((message: string) => {
    //   this.messageList.push(message);
    // })
    //console.log(this.currentUser$.subscribe({next:(response)=>{console.log(response)},error:(response)=>{console.log(response)}}));

    const chatsRef = ref(this.db, 'chats');
    onValue(chatsRef, (snapshot: any) => {
      const data = snapshot.val();
      for(let id in data) {
        if (!this.chats.map(chat => chat.id).includes(id)) {
          this.chats.push(data[id])
        }
      }
    });
  }


//   sendMessage() {
//     this.chatService.sendMessage(this.newMessage);
//     if(this.newMessage=='')
//     {
//       alert("Message cant be empty")
//     }
//     this.newMessage = '';
//   }
//   cool()
//   {
//     alert("asdadas");
//   }
 }
