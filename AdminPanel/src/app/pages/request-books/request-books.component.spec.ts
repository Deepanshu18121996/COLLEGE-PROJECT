import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestBooksComponent } from './request-books.component';

describe('RequestBooksComponent', () => {
  let component: RequestBooksComponent;
  let fixture: ComponentFixture<RequestBooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestBooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
