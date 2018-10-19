import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import {MainComponent} from './site/components/main/main.component';
import {ContactComponent} from './site/components/contact/contact.component';
import {AboutComponent} from './site/components/about/about.component';
import {SearchComponent} from './site/components/search/search.component';
import {ProductComponent} from './site/components/product/product.component';

const APP_ROUTES: Routes = [
  {path: 'about', component: AboutComponent},
  {path: 'product', component: ProductComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'search', component: SearchComponent},
  {path: '', component: MainComponent}
];


export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
