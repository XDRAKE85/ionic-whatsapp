import { Component, OnInit, ViewChild } from '@angular/core';
import { Contacts, Contact } from '@ionic-native/contacts';
import { IonInput } from '@ionic/angular';
import { CommonService} from 'src/app/services/common.service';

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
    {
      avatar:'https://i.pravatar.cc/151',
      name: 'Juan Diaz',
      status: 'Disponible'
    },
    {
      avatar:'https://i.pravatar.cc/152',
      name: 'Pedro Juarez',
      status: 'Disponible'
    },
    {
      avatar:'https://i.pravatar.cc/153',
      name: 'Javier Zepeda',
      status: 'Disponible'
    },
    {
      avatar:'https://i.pravatar.cc/154',
      name: 'Luis Duran',
      status: 'Disponible'
    }
];*/

  constructor(
    private common: CommonService,
    private nativeContacts: Contacts
 ) { }

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
    this.filteredContacts= this.contacts.filter( el => el.displayName.toLowerCase().indexOf(searchString) != -1 );
    console.log(ev.target.value)
  }
}
