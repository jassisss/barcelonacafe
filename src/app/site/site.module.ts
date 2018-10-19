import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './components/main/main.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { SearchComponent } from './components/search/search.component';
import { ProductComponent } from './components/product/product.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MainComponent,
    ContactComponent,
    AboutComponent,
    SearchComponent,
    ProductComponent
  ]
})
export class SiteModule { }
