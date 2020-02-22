import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {
  recentChats = [];
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
    {
      avatar:'https://i.pravatar.cc/152',
      name: 'Pedro Juarez',
      message: '¿A que hora salimos a comer?'
    },
    {
      avatar:'https://i.pravatar.cc/153',
      name: 'Javier Zepeda',
      message: '¿A que hora salimos a comer?'
    },
    {
      avatar:'https://i.pravatar.cc/154',
      name: 'Luis Duran',
      message: '¿A que hora salimos a comer?'
    }
]; */

  constructor() { }

  ngOnInit() {
  }

}
