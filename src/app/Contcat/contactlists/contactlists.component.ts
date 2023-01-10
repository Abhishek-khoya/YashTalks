import { Component } from '@angular/core';
import { ContactClass } from 'src/app/models/contactclass';
import { SeriveService } from 'src/app/service/serive.service';

@Component({
  selector: 'app-contactlists',
  templateUrl: './contactlists.component.html',
  styleUrls: ['./contactlists.component.css']
})
export class ContactlistsComponent {
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
