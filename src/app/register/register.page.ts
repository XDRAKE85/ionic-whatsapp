import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  phone_number:Number = 5518493218;
  public recaptchaVerifier:firebase.auth.RecaptchaVerifier;
  constructor( private common: CommonService, private afAuth:AngularFireAuth) {
    
   }
   
  ngAfterViewInit(){
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      'size':'invisible',
      'callback':function(response){
        console.log('recaptcha resolved auto');
      }
    });
  }
  ngOnInit() {

  }

  savePhone(){
    this.afAuth.auth.signInWithPhoneNumber('+52'+this.phone_number, this.recaptchaVerifier).then(
      (data) =>{
        console.log('data',data)
        data.confirm('123456').then( (result) =>{
          //User signed in successfully
          console.log('signed in', result);

        }, (err) => {
          console.log(err)
        }).catch( function(error){
          //User couldn't sign in (bad verification code?
          console.log('error', error);
        })
      },
      (err) => {

        console.log('error',err)
      }
    )
    /*console.log('guardar',this.phone_number)
    this.common.setItem('phone-number',this.phone_number).then(
        (response) => {
          if(response){
            this.common.msg('El numero ha sido asignado')
            this.common.navRoot('/home')
          } else {
            this.common.msg('Ha ocurrido un error al guardar el numero')
          }
        }
      );
      */
  }
}
