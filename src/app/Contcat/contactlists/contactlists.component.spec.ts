import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactlistsComponent } from './contactlists.component';

describe('ContactlistsComponent', () => {
  let component: ContactlistsComponent;
  let fixture: ComponentFixture<ContactlistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactlistsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactlistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
