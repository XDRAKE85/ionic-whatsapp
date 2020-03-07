import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AngularFireAuth } from '@angular/fire/auth'
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/storage';
import { CommonService } from 'src/app/services/common.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  @ViewChild('nameInput',{static:true}) nameInput: ElementRef;
  user :any;
  profilePicture: any;

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
    public actionSheetController: ActionSheetController,
    public commonService:CommonService,
    private afAuth:AngularFireAuth,
    private storage: AngularFireStorage,
    private usersService: UsersService
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
      //this.profilePicture = 'data:image/jpeg;base64,' + imageData;
      this.commonService.presentLoading();
      this.uploadFile(this.user.uid+'.jpg', 'data:image/jpeg;base64,' + imageData).then(
        (result) => {
          console.log(result)
          this.user.updateProfile({
            photoURL:result
          }).then(
            () => {
              this.profilePicture=result;
              this.commonService.dismissLoading();
              this.commonService.msg('El avatar se ha actualizado')
            }
          ).catch(
            (err) =>{
              this.commonService.dismissLoading();
              this.commonService.msg('Ha ocurrido un error')
            }
          )
        }
        ).catch( 
          (err) => {
            console.log(err)
          });
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
  uploadFile(filename:string, base64:string){
   return new Promise( (resolve, reject) =>{
     const filePath = 'avatars/'+filename;
     const ref= this.storage.ref(filePath)
     ref.putString(base64, 'data_url').then(
       (data) =>{
        data.ref.getDownloadURL().then(
          (url) => {
            resolve(url);
          }
        ).catch(
          ( err ) => {
            reject(err);
          }
        )
       }
     ).catch( (err) =>{
      reject(err)
     })
   }) 
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
  /*updateUser(ev:any){
    console.log('Send to firebase', ev)
    this.user.updateProfile({
      displayName: ev.target.value
      
    }).then(function() {
      //Update successful.
      this.usersService.updateUser( this.user.uid,{ diplayName:this.user.displayName});
      console.log('profile updated')
    }).catch(function(error) {
      //An error happened
      console.log('profile updated error')
    })
  }
  */
  updateUser(field:string, ev:any){
      //Update successful.
      var data={};
      data[field]=ev.target.value;
      this.usersService.updateUser( this.user.uid,data).then(
        () => {
          console.log('La informacion se ha actualizado')
        }
      ).catch(
        () => {
          console.log('Ha ocurrido un error al actualizar')
        }
      );
  }
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Seleccionar avatar',
      buttons: [{
        text: 'Desde la Camara',
        icon: 'camera',
        handler: () => {
          this.options.sourceType =1
          this.takePicture()
        }
      }, {
        text: 'Desde Galeria',
        icon: 'images',
        handler: () => {
          this.options.sourceType =0
          this.takePicture()
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
  changeName(){
    console.log('enter press');
    this.nameInput.nativeElement
    this.nameInput['_native']['_elementRef']['nativeElement'].blur();
  }

}
