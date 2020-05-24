import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksreqComponent } from './booksreq.component';

describe('BooksreqComponent', () => {
  let component: BooksreqComponent;
  let fixture: ComponentFixture<BooksreqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooksreqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksreqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
