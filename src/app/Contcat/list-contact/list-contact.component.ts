import { Component } from '@angular/core';
import { ContactClass } from 'src/app/models/contactclass';
import { SeriveService } from 'src/app/service/serive.service';

@Component({
  selector: 'app-list-contact',
  templateUrl: './list-contact.component.html',
  styleUrls: ['./list-contact.component.css']
})
export class ListContactComponent {

  allContacts: ContactClass[] = [];
constructor(private cs:SeriveService){}
ngOnInit(): void {
  this.get();
}

get() {
  this.cs.get().subscribe((data) => {
    this.allContacts = data;
  });
}
}
