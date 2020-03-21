import { Component, OnInit, ViewChild } from '@angular/core';
import { Contacts, Contact } from '@ionic-native/contacts';
import { IonInput } from '@ionic/angular';
import { CommonService} from 'src/app/services/common.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UsersService } from 'src/app/services/users.service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {
  @ViewChild('searchInput', {static:false}) searchInput: IonInput;
  search:boolean = false;
  contacts : Contact [];
  filteredContacts : Contact [];
/*  contacts = [
    {
      avatar:'https://i.pravatar.cc/150',
      name: 'Fernando Quiroz',
      status: 'No molestar'
    },
   
];*/
  user:any
  constructor(
    private common: CommonService,
    private nativeContacts: Contacts,
    private afAuth:AngularFireAuth,
    private fbs:FirebaseService,
    private userServices:UsersService,
    private chatService:ChatService
 ) { 
   
 }

  ngOnInit() {
    this.common.presentLoading(); //Mostrar el loading
    this.nativeContacts.find(['displayName','name', 'photos'], {filter:"",multiple: true, hasPhoneNumber:true}).then(
      (data) => {
        console.log( data );
        this.contacts= data;
        this.filteredContacts= this.contacts;
        setTimeout( () => {
          this.common.dismissLoading();
        },1500);
      },
      (error) => {
        console.log( error );
      }
    )
    
  }
  closeSearch( ev:any){
    this.search=false;
    this.filteredContacts= this.contacts;
  }
  showSearch(){
    this.search=true;
    this.searchInput.setFocus();
    console.log('focus')
  }
  filterSearch( ev:any){
    var searchString = ev.target.value.toLowerCase();
    this.filteredContacts= this.contacts.filter( el =>{
    console.log(el); el.displayName.toLowerCase().indexOf(searchString) != -1 });
    //console.log(ev.target.value)
    console.log(this.filteredContacts)
  }
  addChat(contact: any){
    console.log(contact.phoneNumbers[0].value)
    //contact.phoneNumbers[0].value
    var resultado=this.userServices.getUserByPhone(contact.phoneNumbers[0].value).subscribe(
      (userSnap) => {
        if( userSnap.length > 0){
          var userId=userSnap[0].payload.doc.id;
          var userInfo=userSnap[0].payload.doc.data();
          console.log(userId)
          console.log(userInfo)
          this.chatService.addChatListItem(this.common.user.uid, userId,userInfo)
          console.log("Item update")
          this.common.msg('El usuario registrado en Whatsapp')
          this.common.navForward('home/chats/details/'+userId)
          
        } else {
          this.common.msg('El usuario no está registrado en Whatsapp')
        }
        
      }
    );
    //console.log(contact.phoneNumbers[0].value)
  }
}
