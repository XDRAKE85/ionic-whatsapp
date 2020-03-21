import { Injectable } from '@angular/core';
import { filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { Platform } from '@ionic/angular';
 
@Injectable({
  providedIn: 'root'
})
export class TabsService {
 
  hideTabBarPages = [
    'contacts', '_details',
  ];
 
  constructor(private router: Router, private platform: Platform) {
    this.platform.ready().then(() => {
      this.navEvents();
    });
  }
 
  public hideTabs() {
    const tabBar = document.getElementById('mainTabs');
    if (tabBar && tabBar.style.display !== 'none') tabBar.style.display = 'none';
    const headBar = document.getElementById('mainHeader');
    if (headBar && headBar.style.display !== 'none') headBar.style.display = 'none';
  }
 
  public showTabs() {
    const tabBar = document.getElementById('mainTabs');
    if (tabBar && tabBar.style.display !== 'flex') tabBar.style.display = 'flex';
    const headBar = document.getElementById('mainHeader');
    if (headBar && headBar.style.display !== 'block') headBar.style.display = 'block';
  }
 
  // A simple subscription that tells us what page we're currently navigating to.
  private navEvents() {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((e: any) => {
      this.showHideTabs(e);
    });
  }
 
  private showHideTabs(e: any) {
    // Result:  e.url: "/tabs/groups/dashboard?type=group"
   
    // Split the URL up into an array.
    const urlArray = e.url.split('/');
    // Result: urlArray: ["", "tabs", "groups", "dashboard?type=group"]
 
    // Grab the last page url.
    const pageUrl = urlArray[urlArray.length - 1];
    // Result: dashboard?type=group
 
    const page = pageUrl.split('?')[0];
    // Result: dashboard
 
    // Fix if parent page has an ID
    const subpage = (urlArray.length >= 2) ? urlArray[urlArray.length - 2] : '';
    // Result: dashboard
   
    // Check if we should hide or show tabs.
    const shouldHide = (this.hideTabBarPages.indexOf(page) > -1) || (this.hideTabBarPages.indexOf('_'+subpage) > -1) ;
    // Result: true
 
    // Not ideal to set the timeout, but I haven't figured out a better method to wait until the page is in transition...
    try {
      setTimeout(() => shouldHide ? this.hideTabs() : this.showTabs(), 300);
    } catch (err) {
    }
  }
}