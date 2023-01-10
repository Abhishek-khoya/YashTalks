import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactlistsComponent } from './Contcat/contactlists/contactlists.component';
import { CreateContactComponent } from './Contcat/create-contact/create-contact.component';
import { EditContactComponent } from './Contcat/edit-contact/edit-contact.component';
import { ListContactComponent } from './Contcat/list-contact/list-contact.component';

const routes: Routes = [
  {
    path: 'contacts/contacts-list',
    component: ListContactComponent,
  },
  {
    path:'contacts/create',
   component: CreateContactComponent
  },
  {
    path:'contacts/edit/:id',
   component: EditContactComponent
  }, {
    path: 'contacts/contactslist',
    component: ContactlistsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
