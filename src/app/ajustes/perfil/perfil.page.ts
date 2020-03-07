import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AngularFireAuth } from '@angular/fire/auth'
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  user :any;
  profilePicture: string;
  options: CameraOptions = {
    quality: 70,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation:true
  }
  constructor(
    private camera: Camera,
    private router:Router,
    private afAuth:AngularFireAuth
  ) { 
    this.user = this.afAuth.auth.currentUser
    console.log(this.user)
  }

  ngOnInit() {

  }

  takePicture(){
    this.camera.getPicture(this.options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.profilePicture = 'data:image/jpeg;base64,' + imageData;

      this.user.updateProfile({
        photoURL: 'https://cdn.ticbeat.com/src/uploads/2018/02/vender-fotos-por-internet-810x540.jpeg'
      }).then(function() {
        //Update successful.
        console.log('profile updated')
      }).catch(function(error) {
        //An error happened
        console.log('profile updated error')
      })
      
     }, (err) => {
      // Handle error
      console.log(err)
     });
  }
  closeSession(){
    this.afAuth.auth.signOut().then(
      () => {
        this.router.navigate(['/register']);
      },
      () => {
        alert('Error closing session')
      }
    )
  }
  updateUser(ev:any){
    console.log('Send to firebase', ev)
    this.user.updateProfile({
      displayName: ev.target.value
    }).then(function() {
      //Update successful.
      console.log('profile updated')
    }).catch(function(error) {
      //An error happened
      console.log('profile updated error')
    })
  }
}
