import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message/message.component';
import { TabMenuComponent } from './tab-menu/tab-menu.component';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    MessageComponent,
    TabMenuComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: [
    MessageComponent,
    TabMenuComponent
  ],
})
export class UiComponentsModule { }
