import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  phone_number:Number ;
  public recaptchaVerifier:firebase.auth.RecaptchaVerifier;
  constructor( private common: CommonService, private afAuth:AngularFireAuth,
    private router:Router, public alertController: AlertController) {
    
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
    //this.askCode();
  }

  savePhone(){
    this.afAuth.auth.signInWithPhoneNumber('+52'+this.phone_number, this.recaptchaVerifier).then(
      (data) =>{
        console.log('data',data)
        this.askCode( data )
        
      },
      (err) => {

        console.log('error',err)
      }
    )
    /*this.common.setItem('phone-number',this.phone_number).then(
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
  async askCode( smsRequest:any) {
    const alert = await this.alertController.create({
      header: 'Verificacion',
      message: 'Por favor introduce el codigo enviado por SMS.',
      inputs: [{ name:'confirmationCode', placeholder:'Código SMS'}],
      buttons: [{
        text: 'Validar',
        handler: data =>{
          console.log( data);
          smsRequest.confirm(data.confirmationCode).then( (result) =>{
          //User signed in successfully
          console.log('signed in', result);
          this.router.navigate(['/home']);
        }, (err) => {
          console.log(err)
        }).catch( function(error){
          //User couldn't sign in (bad verification code?
          console.log('error', error);
        })
        }
      }]
    });

    await alert.present();
  }
}
