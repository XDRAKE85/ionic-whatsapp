import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { RouterModule } from '@angular/router';

import { CommonService } from 'src/app/services/common.service';
import { TabsService } from 'src/app/services/tabs.service';
import { Contacts } from '@ionic-native/contacts';
import { Camera } from '@ionic-native/camera/ngx';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    RouterModule, 
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule],
  providers: [
    StatusBar,
    SplashScreen,
    NativeStorage,
    Contacts,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    CommonService,
    TabsService,
    Camera, 
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule {}
