import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { ChatService } from 'src/app/services/chat.service';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  destinatario: string;
  origin: string;
  newMessage:string='';
  displayName:string='';
  message: any[] = [];

  constructor(
    private route:ActivatedRoute,
    private common: CommonService,
    private chatService: ChatService,
    private userService:UsersService,
  ) { 
    this.destinatario= this.route.snapshot.paramMap.get('userId');
    this.origin= this.common.user.uid;
    /*this.userService.getUserById(this.destinatario).subscribe(
      (userSnap) => {
        var name=userSnap[0].payload.doc.displayName;
        console.log('destinatarioInfo',name);
        //this.destinatarioName=name
      }
    )*/
  }

  ngOnInit() {
    this.chatService.getChatMessages(this.origin,this.destinatario).subscribe(
      msg => {
        if( this.message.length == 0){
          msg.forEach( m => {
            console.log(m.payload.doc.data());
            return m.payload.doc.data();
          });  
        } else {
          this.message.push( msg[msg.length - 1].payload.doc.data());
        }
      }
    )
  }
  sendMessage(){
    console.log('origin',this.origin)
    console.log('destinatario',this.destinatario)
    console.log('enviar',this.newMessage)
    this.chatService.addChatMessage(this.origin,this.destinatario,this.newMessage)
  }
}
