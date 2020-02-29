import { Component, OnInit, NgModule } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-submenu',
  templateUrl: './submenu.component.html',
  styleUrls: ['./submenu.component.scss'],
})
export class SubmenuComponent implements OnInit {
  constructor(
    private popoverController: PopoverController
  ) { }

  ngOnInit() {}
  closePopover() {
    this.popoverController.dismiss();
    
  }
}
