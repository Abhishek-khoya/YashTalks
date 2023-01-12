import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { ChatComponent } from './chat/chat.component';
import { ChatingComponent } from './chating/chating.component';
import { AddContactComponent } from './contact/add-contact/add-contact.component';
import { ListContactComponent } from './contact/list-contact/list-contact.component';
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  {
    path:'',
    redirectTo:'/login',
    pathMatch:'full'
  },
  {
    path:'login',
    component:LoginComponent,
    //...canActivate(redirectLoggedInToHome)
  },
  {
    path:'register',
    component:RegisterComponent,
    ...canActivate(redirectLoggedInToHome)
  },
  {
    path:'home',
    component:HomeComponent,
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path:'chat',
    component:ChatComponent
  },
  {
    path:'chating',
    component:ChatingComponent
  },
  {
    path:'addContact',
    component:AddContactComponent
  },
  {
    path:'contacts',
    component:ListContactComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
