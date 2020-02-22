import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { LoadingController, NavController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  loading:any;
  constructor(
    public nativeStorage: NativeStorage, 
    public navController: NavController,
    public toastController: ToastController,
    public loadingCtrl: LoadingController,
  ) { 
    console.log('Inicializado servicio common.')
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
