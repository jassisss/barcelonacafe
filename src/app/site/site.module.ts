import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './components/main/main.component';
import { ContactComponent } from './components/contact/contact.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MainComponent,
    ContactComponent
  ]
})
export class SiteModule { }
