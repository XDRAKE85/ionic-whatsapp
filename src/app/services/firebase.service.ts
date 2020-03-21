import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor( private firestore:AngularFirestore) { }

  public createDocumentChat(id_user_from:string, id_user_to:string){
    let data ={
      user_from: id_user_from,
      user_to: id_user_to
    }
    return this.firestore.collection('chats').add(data)
    
  }
  
/*  public getChats(){
    return this.firestore.collection('chats').snapshotChanges();
  }*/
  //public createDocumentChat( id_user_from: string,)
}
