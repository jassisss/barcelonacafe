import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core'
  ;
import {MainComponent} from './site/components/main/main.component';
import {ContactComponent} from './site/components/contact/contact.component';

const APP_ROUTES: Routes = [
  {path: 'contact', component: ContactComponent},
  {path: '', component: MainComponent}
];


export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
