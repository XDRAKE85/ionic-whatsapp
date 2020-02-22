import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { CommonService } from 'src/app/services/common.service';
import { TabsService } from 'src/app/services/tabs.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private common: CommonService,
    private tabs: TabsService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      console.log('device ready')
      //this.common.nativeStorage.clear();
      this.common.getItem('phone-number').then(
        (value) =>{
          if(!value){
            this.common.navRoot('/register');
          }
          this.statusBar.styleDefault();
          this.splashScreen.hide();
        }
      )
      
    });
  }
}
