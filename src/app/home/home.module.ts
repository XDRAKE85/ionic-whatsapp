import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SubmenuComponent } from './submenu/submenu.component';

import { HomePage } from './home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage,
        children: [
          {
            path: '', redirectTo: 'chats', pathMatch:'full'
          },
          {
            path: 'chats',
            loadChildren: () => import('./chats/chats.module').then( m => m.ChatsPageModule)
          },
          {
            path: 'estados',
            loadChildren: () => import('./estados/estados.module').then( m => m.EstadosPageModule)
          },
          {
            path: 'llamadas',
            loadChildren: () => import('./llamadas/llamadas.module').then( m => m.LlamadasPageModule)
          },
        ]
      }
    ])
  ],
  declarations: [HomePage, SubmenuComponent],
  entryComponents : [SubmenuComponent]
})
export class HomePageModule {}
