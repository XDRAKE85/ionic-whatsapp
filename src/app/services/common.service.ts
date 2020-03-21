import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'src/app/models/user.model'

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  loading:any;
  user:User;
  
  constructor(
    public nativeStorage: NativeStorage, 
    public navController: NavController,
    public toastController: ToastController,
    public loadingCtrl: LoadingController,
    private AFauth: AngularFireAuth,
  ) { 
    console.log('Inicializado servicio common.')
    this.AFauth.user.subscribe( userUpdate => {
      this.user= new User({
        uid: userUpdate.uid,
        displayName: userUpdate.displayName,
        phoneNumber: userUpdate.phoneNumber,
        photoURL: userUpdate.photoURL,
      })
      console.log('user updated',this.user);
    });

  }
  getCurrentUser(){
   return this.AFauth.user; 
  }
  setItem(key:string, value:any){
    return new Promise((resolve) => {
      this.nativeStorage.setItem(key,value).then(
        (data)=> {resolve(data);},
        ()=> { resolve();}
      )
    });
    
  }
  getItem(key:string){
    return new Promise( (resolve) => {
      this.nativeStorage.getItem(key).then(
        (data)=> {resolve(data);},
        ()=> { resolve();}
        //(error)=> { this.msg(error)}
      )
    })
    
  }
  clear(){
    this.nativeStorage.clear()
  }
  navRoot(page:string){
    this.navController.navigateRoot(page);
  }
  navForward(page:string){
    this.navController.navigateForward(page);
  }
  async msg(text:string, opt?: any) {
    const toast = await this.toastController.create({
      message: text,
      duration: (opt && opt.duration) ? opt.duration : 2000,
      position: (opt && opt.position) ? opt.position : 'bottom'
    });
    toast.present();
  }
  async presentLoading(message?:string){
    this.loading = await this.loadingCtrl.create({
      message:message
    });
    return await this.loading.present();
  }
  dismissLoading(){
    if( this.loading){
      this.loading.dismiss();
    }
  }
}
