import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { SubmenuComponent } from './submenu/submenu.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    public popoverController: PopoverController
  ) {}
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: SubmenuComponent,
      event: ev,
      translucent: true,
      //backdropDismiss:false
    });
    return await popover.present();
  }
}
