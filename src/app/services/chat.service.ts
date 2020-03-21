import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor( private firestore:AngularFirestore) { }

  getChatList(id:string){
    return this.firestore.collection('chats').doc(id).collection('chatlist').snapshotChanges()
  }
  addChatListItem(origen:string,destinatario:string, chatItem:any){
    return this.firestore.collection('chats').doc(origen).collection('chatlist').doc(destinatario).set(chatItem);
  }
  getChatMessages(origen:string, destinatario: string){
    var id= this.getChatId(origen, destinatario)
    return this.firestore.collection('messages').doc(id).collection('chats', ref => ref.orderBy('date')).snapshotChanges();
  }
  addChatMessage(origen:string, destinatario:string, messages:string){
    var id= this.getChatId(origen, destinatario)
    return this.firestore.collection('messages').doc(id).collection('chats').add({
      text: messages,
      date: new Date(),
      origin:origen,
      type: 'text'
    });
  }
  getChatId(origen:string, destinatario:string){
    return ( origen > destinatario) ? destinatario+'-'+origen : origen+'-'+destinatario;
  }
}
