import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { ChatService } from 'src/app/services/chat.service';
import { CommonService} from 'src/app/services/common.service';
import { Chat } from 'src/app/models/chat.model';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {
  recentChats: Chat[] = [];
  /* recentChats = [
    {
      avatar:'https://i.pravatar.cc/150',
      name: 'Fernando Quiroz',
      message: '¿A que hora salimos a comer?'
    },
    {
      avatar:'https://i.pravatar.cc/151',
      name: 'Juan Diaz',
      message: '¿A que hora salimos a comer?'
    },
    
]; */

  constructor(
    private common: CommonService,
    private usersService: UsersService,
    private chatService:ChatService,
  ) { }

  ngOnInit() {
    this.chatService.getChatList(this.common.user.uid).subscribe(
      
      (chatSnap) => {
        this.recentChats=[];
        chatSnap.forEach( chatData => {
          var item = new Chat(chatData.payload.doc.data() ) 
          item.id=chatData.payload.doc.id
          this.recentChats.push(item)
          //this.recentChats.push( new Chat(item) )
        })
        
      }
    );
   /* this.usersService.getUsers().subscribe(
      (userSnap) => {
        console.log(userSnap);
        userSnap.forEach( userData => {
          console.log(userData.payload.doc.data());
        })
      }
    );*/
  }

}
