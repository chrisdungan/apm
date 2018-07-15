import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { LoginComponent } from './login.component';

// ngrx
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/user.reducer';


const userRoutes: Routes = [
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(userRoutes),
    StoreModule.forFeature('user', reducer)    // Checklist: Store -> name each feature slice with the feature name
  ],
  declarations: [
    LoginComponent
  ]
})
export class UserModule { }
