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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
