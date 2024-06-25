import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { SidebarModule } from 'primeng/sidebar';
import { ChatTemplateComponent } from './chat-template/chat-template.component';
import { MainTemplateComponent } from './main-template/main-template.component';

@NgModule({
  declarations: [
    ChatTemplateComponent,
    MainTemplateComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedComponentsModule,
    SidebarModule
  ]
})
export class TemplatesModule { }
